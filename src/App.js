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
    window.location.href = 'https://dapp.buddybattles.xyz/simple-battles';
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
    navigator.clipboard.writeText(text);/*.then(() => {
      //alert('Copied to clipboard');
    }).catch(err => {
      //console.error('Failed to copy!', err);
    });*/
  };

  return (
    <div className="App">
      <div className="content-fullscreen">
        <div className="image-column">
          <img src={baseBuddy} alt="Base Buddy" className="centered-image" />

          {/* Botones debajo de la imagen */}
          <div className="location">
            <button className="copy-button" onClick={() => copyToClipboard('0x38B54f147303887BD2E932373432FfCBD11Ff6a5')}>
              Copy CA
            </button>

            <a href="https://dexscreener.com/base/0xb30c152f39d8fc34a23229cc34791ca7433b30e0" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" viewBox="0 0 252 300" focusable="false">
                <path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886l12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 003.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 003.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197"></path>
                <path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 015.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 015.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z"></path>
              </svg>
            </a>

            {/* Enlaces a X y Telegram */}
            <a href="https://x.com/Base_Buddy" target="_blank" rel="noopener noreferrer" className="nav-link">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/twitter.svg" alt="X" className="social-icon" />
            </a>
            <a href="https://t.me/basebuddy" target="_blank" rel="noopener noreferrer" className="nav-link">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/telegram.svg" alt="Telegram" className="social-icon" />
            </a>
          </div>
        </div>
        <div className="buttons-column">
          <button className="big-button full-width-button" onClick={handleDappClick}>
            ⚔️ DAPP ⚔️ <br /> Buddy Battles
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
              <img src={baseBuddyFace} alt="Base Buddy Logo" className="centered-image" />
              <div className="roadmap-step">
                <div className="roadmap-point">
                  <span className="roadmap-number">1</span>
                  <p>SIMPLE BATTLES - Join or create rooms from 2 to 10 players (can be unlimited for special events). Winner will be random. <br /> This mode is already LIVE! <a href="https://dapp.buddybattles.xyz/simple-battles">Click HERE</a></p>
                </div>
                <div className="roadmap-point">
                  <span className="roadmap-number">2</span>
                  <p>MEME BATTLES - Battle other holders in the same size rooms with your meme creation and earn tokens winning!!. Winner will be selected by a votation system that will prevent bad actors <br /> Coming soon...</p>
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
              <img src={baseBuddyFace} alt="Base Buddy Logo" className="centered-image" />
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
