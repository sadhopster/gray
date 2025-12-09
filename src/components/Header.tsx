import './Header.css';

export default function Header() {
  return (
    <header className="slay-header">
      <a
        href="https://vk.com/alivka_xax"
        className="winline-logo"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/gray/svinline.png" alt="Winline" />
      </a>
      {/* Фоновое видео */}
      <video className="header-bg-video" src="/gray/flags.webm" autoPlay loop muted />

      {/* Контент сверху */}
      <div className="header-content">
        <img src="/gray/SLAY.png" className="slay-logo" />

        <img src="/gray/cup.png" className="slay-cup" />

        {/* Надпись "ГЛАВНАЯ ПРЕМИЯ РУ-СТРИМИНГА" */}
        <div className="header-title">
          <div className="header-title-line">ГЛАВНАЯ ПРЕМИЯ</div>
          <div className="header-title-line">РОГАЧИКА</div>
        </div>
      </div>

      {/* Плавный переход к основному контенту */}
      <div className="header-transition"></div>
    </header>
  );
}
