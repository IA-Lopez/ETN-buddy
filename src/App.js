import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import buttonImage from './basebuddy.png';
import Creator from './Creator';
import baseBuddy from './basebuddyface.png';

function App() {
  const [showCanvas, setShowCanvas] = useState(true);
  const [showBattles, setShowBattles] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showHowToBuy, setShowHowToBuy] = useState(false); // Nuevo estado
  const canvasRef = useRef(null);

  const handleMemeCreatorClick = () => {
    setShowBattles(false);
    setShowRoadmap(false);
    setShowHowToBuy(false); 
    setShowCanvas(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleBattlesClick = () => {
    setShowCanvas(false);
    setShowRoadmap(false);
    setShowHowToBuy(false);
    setShowBattles(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleRoadmapClick = () => {
    setShowCanvas(false);
    setShowBattles(false);
    setShowHowToBuy(false);
    setShowRoadmap(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleHowToBuyClick = () => {
    setShowCanvas(false);
    setShowBattles(false);
    setShowRoadmap(false);
    setShowHowToBuy(true);
    setTimeout(() => {
      canvasRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy!', err);
    });
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
          <div className="location-container">
            <button className="copy-button" onClick={() => copyToClipboard('0x3C4C68236774B3cDA9647D5bc534Ab3841B3BfbF')}>
              Copy CA
            </button>
            <button className="big-button button-margin" onClick={handleHowToBuyClick}>How to get BUDDY <img src={buttonImage} alt="ETN Buddy" className="button-image" /></button>
          </div>
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
        {showHowToBuy && (
          <div className="how-to-buy-screen">
            <h2>How to get BUDDY</h2>
            <div className="how-to-buy-steps">
              <div className="how-to-buy-step">
                <span className="how-to-buy-number">1</span>
                <p>Download Metamask Wallet from App Store or Play Store. For desktop or laptop users, you can download Metamask Chrome Extension by going to Metamask.io.</p>
              </div>
              <div className="how-to-buy-step">
                <span className="how-to-buy-number">2</span>
                <p>Head over to Ankr.com on your Metamask App browser or at Chrome, then find “ETN Network” and click “Connect Wallet.”</p>
              </div>
              <div className="how-to-buy-step">
                <span className="how-to-buy-number">3</span>
                <p>Purchase ETN and send to your ETN Address in your Metamask Wallet.</p>
              </div>
              <div className="how-to-buy-step">
                <span className="how-to-buy-number">4</span>
                <p>On your Metamask browser or Chrome, search for app.electroswap.io/#/swap, launch the app and connect your wallet.</p>
              </div>
              <div className="how-to-buy-step">
                <span className="how-to-buy-number">5</span>
                <p>Now, copy and paste in the CA for $BUDDY. Set amount, click “Swap” and confirm in MetaMask.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
