// App.tsx (оставляем вашу логику, просто немного улучшаем)
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Countdown from './components/Countdown';
import Partners from './components/Partners';
import NominationList from './components/NominationList';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import AboutSlider from './components/AboutSlider';
import { NOMINATIONS } from './data/nominees';
import { firebaseAvailable } from './firebase';

export default function App() {
  const deadline = new Date('2025-12-31T22:00:00Z').getTime();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  // Ваша идеальная логика, только с индикатором
  useEffect(() => {
    let timer: any = null;
    
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        setPressCount(prev => {
          const newCount = prev + 1;
          
          // Показываем индикатор
          if (newCount === 1) {
            console.log('✅ Нажмите A еще 2 раза для админки');
          }
          
          if (newCount >= 3) {
            setIsAdminMode(true);
            setPressCount(0);
            return 0;
          }
          
          // Сбрасываем через 1 секунду
          clearTimeout(timer);
          timer = setTimeout(() => {
            setPressCount(0);
            console.log('⌛ Время вышло, начинайте сначала');
          }, 1000);
          
          return newCount;
        });
      }
      
      // Escape для выхода из админки
      if (e.key === 'Escape' && isAdminMode) {
        setIsAdminMode(false);
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timer);
    };
  }, [isAdminMode]);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Partners />
        <AboutSlider />
        
        <NominationList nominations={NOMINATIONS} deadline={deadline} />
        <Countdown deadline={deadline} />
        <Footer />
        
        {/* Простая админ-панель поверх всего */}
        {isAdminMode && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            overflow: 'auto',
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '1400px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <button
                onClick={() => setIsAdminMode(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ✕ Закрыть админку
              </button>
              
              <h2 style={{ marginTop: '0', color: '#333' }}>
                📊 Админ-панель (Нажмите ESC для выхода)
              </h2>
              
              <AdminDashboard 
                firebaseEnabled={firebaseAvailable} 
              />
            </div>
          </div>
        )}
        
        {/* Простой индикатор в углу экрана */}
        {pressCount > 0 && !isAdminMode && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#667eea',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 999
          }}>
            🔑 A: {pressCount}/3
          </div>
        )}
      </main>
    </div>
  );
}