import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import buttonImage from './basebuddy.png';
import Creator from './Creator';
import baseBuddy from './basebuddyface.png';

function App() {
  const [showCanvas, setShowCanvas] = useState(true);
  const [showBattles, setShowBattles] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const canvasRef = useRef(null);

  const handleMemeCreatorClick = () => {
    setShowBattles(false);
    setShowRoadmap(false);
    setShowCanvas(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleBattlesClick = () => {
    setShowCanvas(false);
    setShowRoadmap(false);
    setShowBattles(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleRoadmapClick = () => {
    setShowCanvas(false);
    setShowBattles(false);
    setShowRoadmap(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'I' || e.key === 'J')) {
        e.preventDefault();
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <div onClick={handleRoadmapClick} rel="noopener noreferrer" className="nav-link">
                Roadmap
              </div>
            </li>
            <li className="nav-item">
              <a href="https://x.com/ETN_Buddy" target="_blank" rel="noopener noreferrer" className="nav-link">
                Twitter
              </a>
            </li>
            <li className="nav-item">
              <a href="https://t.me/ETNBuddy" target="_blank" rel="noopener noreferrer" className="nav-link">
                Telegram
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="background">
        <div className="content">
          <h1 className="main-title">ETN BUDDY</h1>
          <h2 className="subtitle">LET'S BUILD THE MOST BASED COMMUNITY AROUND OUR FAVOURITE MASCOT</h2>
          <h3 className="location">Not live yet</h3>
          <div className="buttons">
            <button className="big-button" onClick={handleMemeCreatorClick}>
              <img src={buttonImage} alt="ETN Buddy" className="button-image" />
              Meme Creator
            </button>
            <button className="big-button" onClick={handleBattlesClick}>
              <img src={buttonImage} alt="ETN Buddy" className="button-image" />
              $BUDDY Battles
            </button>
          </div>
        </div>
      </div>
      <div ref={canvasRef} className="canvas-container">
        {showCanvas && <Creator />}
        {showBattles && (
          <div className="battles-screen">
            <h2>Buddy Battles - Coming Soon</h2>
            <p>Stay tuned for more information about our upcoming Buddy Battles where you can use your $BUDDY to earn more!!</p>
          </div>
        )}
        {showRoadmap && (
          <div className="roadmap-screen">
            <h2>Roadmap</h2>
            <div className="roadmap">
              <img src={baseBuddy} alt="Buddy battles" className="roadmap-image" />
              <div className="roadmap-step">
                <div className="roadmap-point">
                  <span className="roadmap-number">1</span>
                  <p>Buddy battles - SIMPLE MODE - bet $BUDDY, get paired with another player. Winner will be random.</p>
                </div>
                <div className="roadmap-point">
                  <span className="roadmap-number">2</span>
                  <p>Buddy battles - MEME BATTLES - battle other holders with your meme creation and bet $BUDDY for it. Winners will earn losers' bets. Winners will be chosen by a voting system, votes will be bets themselves allowing people to earn more if they choose the winner</p>
                </div>
                <div className="roadmap-point">
                  <span className="roadmap-number">3</span>
                  <p>Allow other teams to use the meme creator and battles system for their tokens, creating a sick ecosystem</p>
                </div>
                <div className="roadmap-point">
                  <span className="roadmap-number">4</span>
                  <p>What else do you want? We hear you!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
