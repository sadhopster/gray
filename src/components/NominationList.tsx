import React, { useState } from "react";
import "./NominationList.css";
import type { Nomination } from '../types';
import NomineesModal from "./NomineesModal";

type Props = {
  nominations: Nomination[];
  deadline: number;
};

// Секретный пароль для приватных номинаций
const PRIVATE_NOMINATIONS_PASSWORD = "DRAYraziebayofthe2025";

export default function NominationList({ nominations, deadline }: Props) {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);
  const [showNomineesModal, setShowNomineesModal] = useState(false);

  // Фильтруем номинации по активной вкладке
  const filteredNominations = nominations.filter(
    (nomination) => nomination.type === activeTab
  );

  // Если выбраны приватные номинации и пользователь не авторизован,
  // показываем форму для ввода пароля
  const showPrivateNominations = activeTab === 'private' && isAuthenticated;
  const showPasswordForm = activeTab === 'private' && !isAuthenticated;

  const handleTabChange = (tab: 'public' | 'private') => {
    setActiveTab(tab);
    setError('');
    if (tab === 'public') {
      setIsAuthenticated(false);
      setPassword('');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PRIVATE_NOMINATIONS_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный пароль. Не пытайтесь.');
      setPassword('');
    }
  };

  const handleNominationClick = (nomination: Nomination) => {
    setSelectedNomination(nomination);
    setShowNomineesModal(true);
  };

  const handleCloseNomineesModal = () => {
    setShowNomineesModal(false);
    setSelectedNomination(null);
  };

  return (
    <>
      <section className="nominations">
        {/* Переключатель Публичные/Приватные */}
        <div className="nominations-tabs">
          <button
            className={`tab-button ${activeTab === "public" ? "active" : ""}`}
            onClick={() => handleTabChange("public")}
          >
            Публичные
          </button>
          <button
            className={`tab-button ${activeTab === "private" ? "active" : ""}`}
            onClick={() => handleTabChange("private")}
          >
            Приватные
          </button>
        </div>

        {/* Сообщение о приватных номинациях */}
        {activeTab === 'private' && (
          <div className="private-nominations-info">
            <h3>Приватные номинации</h3>
            <p>Эти номинации не доступны простым смертным.</p>
          </div>
        )}

        {/* Форма для ввода пароля */}
        {showPasswordForm && (
          <div className="password-form-container">
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="password-input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите секретный пароль"
                  className="password-input"
                  autoFocus
                />
                <button type="submit" className="password-submit">
                  Войти
                </button>
              </div>
              {error && <div className="password-error">{error}</div>}
            </form>
          </div>
        )}

        {/* Сетка номинаций */}
        {(activeTab === 'public' || showPrivateNominations) && (
          <div className="nominations-grid">
            {(activeTab === 'public' ? filteredNominations : showPrivateNominations ? filteredNominations : []).map((n, i) => (
              <div 
                key={i} 
                className="nomination-card"
                onClick={() => handleNominationClick(n)}
              >
                <img 
                  src={n.image} 
                  alt={n.title} 
                  className="nomination-image"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/280x380?text=Nomination';
                  }}
                />
                <div className="nomination-title">{n.title}</div>
                <div className="nomination-underline"></div>
              </div>
            ))}
          </div>
        )}

        {/* Сообщение, если нет номинаций */}
        {showPrivateNominations && filteredNominations.length === 0 && (
          <div className="no-nominations-message">
            Нет доступных приватных номинаций
          </div>
        )}
      </section>

      {/* Модальное окно с номинантами */}
      {showNomineesModal && selectedNomination && (
        <NomineesModal
          nomination={selectedNomination}
          deadline={deadline}
          onClose={handleCloseNomineesModal}
        />
      )}
    </>
  );
}