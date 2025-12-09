import React, { useState } from 'react';
import type { Nomination, Nominee } from '../types';
import { submitVoteToFirebase, hasUserVotedInNomination } from '../votes';
import './VoteConfirmModal.css';

interface Props {
    nominee: Nominee;
    nomination: Nomination;
    onClose: () => void;
    onSubmit: (voterName: string) => void;
}

export default function VoteConfirmModal({ nominee, nomination, onClose, onSubmit }: Props) {
    const [voterName, setVoterName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFirebaseError('');

        // Валидация имени
        if (!voterName.trim()) {
            setError('Пожалуйста, введите ваше имя');
            return;
        }

        if (voterName.trim().length < 2) {
            setError('Имя должно содержать минимум 2 символа');
            return;
        }

        // Проверяем, не голосовал ли пользователь уже в этой номинации
        const nominationId = nomination.id || nomination.title.replace(/\s+/g, '_').toLowerCase();
        if (hasUserVotedInNomination(nominationId)) {
            setError('Вы уже голосовали в этой номинации!');
            return;
        }

        setIsSubmitting(true);

        try {
            // Отправляем голос в Firebase
            const voteResult = await submitVoteToFirebase(
                nominationId,
                nominee.id,
                nominee.name,
                nomination.title,
                voterName.trim() // Передаем имя голосующего
            );

            if (voteResult.success) {
                // Помечаем номинацию как проголосованную
                const votedNominations = JSON.parse(localStorage.getItem('voted_nominations') || '{}');
                votedNominations[nominationId] = {
                    nomineeId: nominee.id,
                    nomineeName: nominee.name,
                    timestamp: Date.now(),
                    voterName: voterName.trim()
                };
                localStorage.setItem('voted_nominations', JSON.stringify(votedNominations));

                setSubmitSuccess(true);
                
                // Сохраняем имя голосовавшего в localStorage для будущих голосований
                localStorage.setItem('last_voter_name', voterName.trim());
                
                // Ждем 2 секунды и закрываем
                setTimeout(() => {
                    onSubmit(voterName.trim());
                    onClose();
                }, 2000);
            } else {
                setFirebaseError(voteResult.error || 'Ошибка при сохранении голоса. Попробуйте еще раз.');
            }
        } catch (err) {
            console.error('Ошибка при голосовании:', err);
            setFirebaseError('Произошла непредвиденная ошибка. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Загружаем сохраненное имя при первой загрузке
    React.useEffect(() => {
        const savedName = localStorage.getItem('last_voter_name');
        if (savedName) {
            setVoterName(savedName);
        }
    }, []);

    return (
        <div className="vote-confirm-modal-backdrop" onClick={onClose}>
            <div className="vote-confirm-modal-content-large" onClick={(e) => e.stopPropagation()}>
                <div className="vote-confirm-header-minimal">
                    <div className="vote-confirm-title-elegant">
                        {submitSuccess ? '✅ Голос принят!' : 'Подтверждение голоса'}
                    </div>
                    <button className="vote-confirm-close-minimal" onClick={onClose} disabled={isSubmitting}>
                        ×
                    </button>
                </div>
                
                <div className="vote-confirm-body-large">
                    {submitSuccess ? (
                        <div className="vote-success-message">
                            <div className="success-icon-large">✓</div>
                            <h3>Спасибо за ваш голос!</h3>
                            <p className="success-details">
                                Вы проголосовали за <strong>{nominee.name}</strong><br />
                                в номинации <strong>{nomination.title}</strong>
                            </p>
                            <p className="success-note">Модальное окно закроется автоматически...</p>
                            <div className="loading-indicator">
                                <div className="loading-bar"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="vote-info-minimal">
                                <div className="vote-info-item">
                                    <div className="vote-info-icon">🏆</div>
                                    <div className="vote-info-content">
                                        <div className="vote-info-label">Номинация</div>
                                        <div className="vote-info-value-large">{nomination.title}</div>
                                    </div>
                                </div>
                                
                                <div className="vote-info-item">
                                    <div className="vote-info-icon">👤</div>
                                    <div className="vote-info-content">
                                        <div className="vote-info-label">Номинант</div>
                                        <div className="vote-info-value-large">{nominee.name}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="vote-form-minimal">
                                <div className="form-group-minimal">
                                    <label htmlFor="voterName" className="form-label-minimal">
                                        Ваше имя
                                        <span className="required-star">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="voterName"
                                        value={voterName}
                                        onChange={(e) => {
                                            setVoterName(e.target.value);
                                            setError('');
                                            setFirebaseError('');
                                        }}
                                        className={`form-input-minimal ${error ? 'error' : ''}`}
                                        placeholder="Введите ваше полное имя"
                                        autoFocus
                                        disabled={isSubmitting}
                                    />
                                    {error && <div className="form-error-minimal">{error}</div>}
                                    {firebaseError && <div className="form-error-minimal firebase-error">{firebaseError}</div>}
                                </div>
                                
                                <div className="form-requirements">
                                    Поле обязательно для заполнения
                                </div>
                                
                                <div className="vote-confirm-actions-minimal">
                                    <button 
                                        type="button" 
                                        className="vote-cancel-button-orange"
                                        onClick={onClose}
                                        disabled={isSubmitting}
                                    >
                                        Отмена
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="vote-confirm-button-orange"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading-spinner"></span>
                                                Отправка...
                                            </>
                                        ) : 'Подтвердить голос'}
                                    </button>
                                </div>
                                
                                <div className="vote-note">
                                    <small>
                                        ⓘ Голос можно отдать только один раз в каждой номинации.<br />
                                        Имя будет сохранено для ваших следующих голосований.
                                    </small>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}