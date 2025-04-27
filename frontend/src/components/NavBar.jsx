import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/NavBar.css';
import letter from './Letters'; 
import playlist from './Music';
import why from './Whyyou';
import Game from './Game.jsx'; // Correct path to your Game.jsx

import surprise from './Surprise';

function NavBar({ onLinkClick })  {
  const [vistaActiva, setVistaActiva] = useState('');
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    let interval;
    let timeout;
  
    if (showHearts) {
      interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerText = '👩🏻‍❤️‍💋‍👩🏼';
        heart.style.left = Math.random() * 100 + 'vw';
        document.body.appendChild(heart);
  
        setTimeout(() => heart.remove(), 3000);
      }, 300);
  
      
      timeout = setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    }
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showHearts]);
  

  return (
    <>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#590F1A' }} sticky="top">
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src="/images/tulips.png"
              alt="Love Logo"
              width="50"
              height="50"
              className="d-inline-block align-top"
              style={{ marginRight: '10px' }}
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-1">
            <Nav.Link onClick={() => { setVistaActiva('letter'); onLinkClick(); }} className="special-love-notes">Letter</Nav.Link>
              <Nav.Link onClick={() => { setVistaActiva('music'); onLinkClick(); }} className="special-love-notes">Music</Nav.Link>
              <Nav.Link onClick={() => { setVistaActiva('why'); onLinkClick(); }} className="special-love-notes">Why you?</Nav.Link>
              <Nav.Link onClick={() => { setVistaActiva('game'); onLinkClick(); }} className="special-love-notes">A lil game</Nav.Link>
              <Nav.Link onClick={() => { setVistaActiva('surprise'); onLinkClick(); }} className="special-love-notes">Surprise</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4 px-3 px-sm-4 px-md-5">
        {vistaActiva === 'letter' && <LoveMessage title="A Letter to You" message={letter} />}
        {vistaActiva === 'music' && <LoveMessage title="A Playlist for my special girl" message={playlist} />}
        {vistaActiva === 'why' && <LoveMessage title="You are my person" message={why} />}
        {vistaActiva === 'game' && <Game />}

        {vistaActiva === 'surprise' && (
          <LoveMessage title="A question to be asked" message={surprise}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setShowHearts(true);
                  setTimeout(() => setShowHearts(false), 5000); // Reset after animation
                }}                
                style={{
                  backgroundColor: '#cc3366',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  marginTop: '20px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
              >
                OF COURSE I DO 
              </button>
            </div>
          </LoveMessage>
        )}

      </Container>
    </>
  );
}

function LoveMessage({ title, message, children }) {
  const formattedMessage = message.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #cc3366; text-decoration: underline;">$1</a>'
  );

  return (
    <div style={{
      background: '#fff0f4',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      padding: '30px',
      textAlign: 'left'
    }}>
      <h3 style={{ color: '#cc3366', fontSize: '2rem', marginBottom: '20px' }}>{title}</h3>
      <p
        style={{ fontSize: '1.3rem', lineHeight: '1.4', color: '#000', whiteSpace: 'pre-line' }}
        dangerouslySetInnerHTML={{ __html: formattedMessage }}
      ></p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default NavBar;

