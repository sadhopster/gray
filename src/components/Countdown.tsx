import { useEffect, useState } from 'react';
import './Countdown.css';

export default function Countdown({ deadline }: { deadline: number }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const int = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(int);
  }, []);

  const diff = Math.max(deadline - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  // Форматирование с ведущими нулями
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="countdown">
      <p className="countdown-label">До окончания голосования:</p>
      <div className="timer-container">
        <div className="time-block">
          <div className="time-value">{formatNumber(days)}</div>
          <div className="time-label">Дней</div>
        </div>
        
        <div className="separator">×</div>
        
        <div className="time-block">
          <div className="time-value">{formatNumber(hours)}</div>
          <div className="time-label">Часов</div>
        </div>
        
        <div className="separator">×</div>
        
        <div className="time-block">
          <div className="time-value">{formatNumber(minutes)}</div>
          <div className="time-label">Минут</div>
        </div>
      </div>
    </div>
  );
}