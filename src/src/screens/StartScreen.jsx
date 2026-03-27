import './StartScreen.css';

function StartScreen({ onStart }) {
  return (
    <div className="start-container">
      <div className="start-content">
        <h1 className="logo">AgeSA</h1>
        <div className="subtitle">CODENIGHT</div>
        <h2 className="main-title">Finansal Özgürlük<br />Yolculuğuna Hoş Geldin!</h2>
        <button className="start-btn" onClick={onStart}>
          HADİ BAŞLAYALIM!
        </button>
      </div>
      <div className="start-footer">#CodeNight2026</div>
    </div>
  );
}

export default StartScreen;
