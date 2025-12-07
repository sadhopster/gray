import React, { useState } from 'react';
import type { Nomination, Nominee } from '../types';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!voterName.trim()) {
            setError('Пожалуйста, введите ваше имя');
            return;
        }

        onSubmit(voterName.trim());
    };

    return (
        <div className="vote-confirm-modal-backdrop" onClick={onClose}>
          <div className="vote-confirm-modal-content-large" onClick={(e) => e.stopPropagation()}>
            <div className="vote-confirm-header-minimal">
              <div className="vote-confirm-title-elegant">Подтверждение голоса</div>
              <button className="vote-confirm-close-minimal" onClick={onClose}>
                ×
              </button>
            </div>
            
            <div className="vote-confirm-body-large">
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
                    }}
                    className={`form-input-minimal ${error ? 'error' : ''}`}
                    placeholder="Введите ваше полное имя"
                    autoFocus
                  />
                  {error && <div className="form-error-minimal">{error}</div>}
                </div>
                
                <div className="form-requirements">
                  Поле обязательно для заполнения
                </div>
                
                <div className="vote-confirm-actions-minimal">
                  <button 
                    type="button" 
                    className="vote-cancel-button-orange"
                    onClick={onClose}
                  >
                    Отмена
                  </button>
                  <button 
                    type="submit" 
                    className="vote-confirm-button-orange"
                  >
                    Подтвердить голос
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }