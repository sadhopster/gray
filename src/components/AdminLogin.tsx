// components/AdminLogin.tsx
import { useState } from 'react';
import './AdminLogin.css';

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AdminLogin({ onSuccess, onClose }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Пароли можно менять здесь
  const ADMIN_PASSWORDS = [
    'awards2024',
    'bershka2024',
    'admin123',
    'secret'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Имитация задержки для безопасности
    setTimeout(() => {
      if (ADMIN_PASSWORDS.includes(password.trim())) {
        // Сохраняем в сессии на 8 часов
        const expiry = Date.now() + 8 * 60 * 60 * 1000;
        sessionStorage.setItem('adminAuth', JSON.stringify({
          authenticated: true,
          expiry
        }));
        
        onSuccess();
      } else {
        setError('Неверный пароль');
        setPassword('');
      }
      setIsSubmitting(false);
    }, 500);
  };

  const handleQuickAccess = () => {
    // Быстрый доступ для разработчиков
    if (process.env.NODE_ENV === 'development') {
      onSuccess();
    }
  };

  return (
    <div className="admin-login-overlay" onClick={onClose}>
      <div className="admin-login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-close-btn" onClick={onClose}>×</button>
        
        <div className="login-header">
          <div className="login-icon">🔒</div>
          <h2>Доступ к админ-панели</h2>
          <p className="login-subtitle">Только для организаторов</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="adminPassword" className="form-label">
              Пароль администратора
            </label>
            <input
              type="password"
              id="adminPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Введите пароль..."
              autoFocus
              disabled={isSubmitting}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Проверка...
                </>
              ) : 'Войти'}
            </button>
          </div>
          
          <div className="login-hints">
            <p className="hint">
              💡 <strong>Совет:</strong> На главной странице нажмите клавишу <kbd>A</kbd> три раза быстро
            </p>
            <p className="hint">
              🔑 <strong>Или:</strong> Используйте комбинацию <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>
            </p>
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                className="dev-access-btn"
                onClick={handleQuickAccess}
              >
                🚀 Быстрый доступ (только для разработки)
              </button>
            )}
          </div>
        </form>
        
        <div className="login-footer">
          <p className="security-note">
            ⚠️ Все действия в админ-панели логируются
          </p>
        </div>
      </div>
    </div>
  );
}