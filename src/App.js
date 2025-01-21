import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Creator from './Creator';
import baseBuddy from './basebuddy.png';
import baseBuddyFace from './basebuddyface.png';

function App() {
  const [showHowToBuy, setShowHowToBuy] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const canvasRef = useRef(null);

  const handleDappClick = () => {
    window.location.href = 'https://app.buddybattles.xyz/simple-battles';
  };

  const handleMintClick = () => {
    window.location.href = 'https://etn.buddybattles.xyz';
  };

  const handleHowToBuyClick = () => {
    hideAllSections();
    setShowHowToBuy(true);
    scrollToContent();
  };

  const handleMemeCreatorClick = () => {
    hideAllSections();
    setShowCanvas(true);
    scrollToContent();
  };

  const handleRoadmapClick = () => {
    hideAllSections();
    setShowRoadmap(true);
    scrollToContent();
  };

  const handleWhitepaperClick = () => {
    hideAllSections();
    setShowWhitepaper(true);
    scrollToContent();
  };

  const handleCharacterClick = () => {
    hideAllSections();
    setShowCharacter(true);
    scrollToContent();
  };

  const hideAllSections = () => {
    setShowCanvas(false);
    setShowRoadmap(false);
    setShowWhitepaper(false);
    setShowCharacter(false);
    setShowHowToBuy(false);
  };

  const scrollToContent = () => {
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <div className="content-fullscreen">
        <div className="image-column">
          <img src={baseBuddy} alt="ETN Buddy" className="centered-image" />

          <div className="location">
            <button className="copy-button" onClick={() => copyToClipboard('0x38B54f147303887BD2E932373432FfCBD11Ff6a5')}>
              Copy CA
            </button>

            <div className="location">
            {/* Logo de CoinGecko */}
            <a
              href="https://www.geckoterminal.com/electroneum/pools/0x4d94a657f0267c1702a141af603a8d21df6ac671"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://s.geckoterminal.com/_next/static/media/logo_dark.6b1547fe.png"
                alt="CoinGecko"
                className="coingecko-logo"
                style={{ backgroundColor: '#222', borderRadius: '8px', padding: '5px' }}
              />
            </a>

            {/* Redes sociales */}
            <div className="social-icons">
              <a
                href="https://x.com/ETN_Buddy"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/twitter.svg"
                  alt="X"
                  className="social-icon"
                />
              </a>
              <a
                href="https://t.me/etnbuddy"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/telegram.svg"
                  alt="Telegram"
                  className="social-icon"
                />
              </a>
            </div>
          </div>
          </div>
        </div>
        <div className="buttons-column">
          <button className="big-button full-width-button" onClick={handleDappClick}>
            ⚔️ DAPP ⚔️ <br /> Buddy Battles
          </button>
          <button className="big-button full-width-button" onClick={handleMintClick}>
            🪙 Mint Buddy Pass
          </button>
          <button className="big-button full-width-button" onClick={handleMemeCreatorClick}>
            🎨 Meme Builder
          </button>
          <button className="big-button full-width-button" onClick={handleRoadmapClick}>
            🗺️ Roadmap
          </button>
          <button className="big-button full-width-button" onClick={handleWhitepaperClick}>
            📄 Whitepaper
          </button>
          <button className="big-button full-width-button" onClick={handleCharacterClick}>
            👤 Story
          </button>
          <button className="big-button full-width-button" onClick={handleHowToBuyClick}>
            💸 How To Buy
          </button>
        </div>
      </div>
      <div ref={canvasRef} className="canvas-container">
        {showCanvas && <Creator />}
        {showRoadmap && (
          <div className="roadmap-screen">
            <h2>Roadmap</h2>
            <div className="roadmap">
              <img src={baseBuddyFace} alt="ETN Buddy Logo" className="centered-image" />
              <div className="roadmap-step">
                <div className="roadmap-point">
                  <span className="roadmap-number">1</span>
                  <p>SIMPLE BATTLES - Join or create rooms from 2 to 10 players (can be unlimited for special events). Winner will be random. <br /> This mode is already LIVE! <a href="https://dapp.buddybattles.xyz/simple-battles">Click HERE</a></p>
                </div>
                <div className="roadmap-point">
                  <span className="roadmap-number">2</span>
                  <p>PLATFORM BATTLES - A Buddy (and maybe others) platforms game with a ranking and rewards based on it <br /> Coming soon...</p>
                </div>
                <div className="roadmap-point">
                  <span className="roadmap-number">3</span>
                  <p>We will keep making updates: MORE GAMIFIED MODES, more FUN! Relying much more in skills and decision making</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {showWhitepaper && (
          <div className="whitepaper-screen">
            <h2 className="section-title">Whitepaper</h2>
            <div className="whitepaper-content">
              <div className="whitepaper-text">
                <p>Understand the vision and goals behind Buddy and the Battles</p>
                <a href="https://docsend.com/v/wgg38/etn-whitepaper" target="_blank" rel="noopener noreferrer" className="docsend-link">
                  See in DOCSEND
                </a>
              </div>
              <iframe title="whitepaper" className="whitepaper-iframe" src="https://docsend.com/v/wgg38/etn-whitepaper" allow="fullscreen"></iframe>
            </div>
          </div>
        )}

        {showCharacter && (
          <div className="character-screen">
            <h2 className="section-title">Buddy's Story</h2>
            <div className="character-content">
              <img src={baseBuddyFace} alt="ETN Buddy Logo" className="centered-image" />
              <div className="character-text">
                <p>Buddy was a good kid, innocent at heart. But one day, everything changed. His family got rugged on shitcoins, their life savings vanished overnight. The shock left them homeless, forced to live on the streets. With no one to turn to, Buddy had to learn to survive, fighting for food and shelter in the cold, unforgiving city.</p>
                <p>As he grew stronger, Buddy immersed himself in martial arts. He became a master of Brazilian Jiu-Jitsu, learning to dominate his opponents on the ground with submission holds. But that wasn't enough for him. He also trained in Muay Thai, mastering powerful strikes, and Krav Maga, perfecting brutal self-defense techniques designed for real-life street fights.</p>
                <p>Now a professional MMA fighter, Buddy fights his way through the ranks, not just for fame or glory, but for justice. He knows that one day, he’ll face the very people who ruined his life, and when that day comes, he’ll be ready. They took everything from him, and he’s prepared to take it all back, one brutal fight at a time.</p>
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
