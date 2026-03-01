import React, { useState, useEffect } from 'react';
import '../styles/navigation.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="nav-logo">
          <img 
            src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
            alt="PrintX Logo" 
            className="logo-image"
          />
          <span className="logo-text">PrintX</span>
        </div>
        
        <div className="nav-links">
          <a href="#problem" className="nav-link">Problem</a>
          <a href="#solution" className="nav-link">Solution</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
        </div>

        <a href="/shopkeeper-login" className="login-btn">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
