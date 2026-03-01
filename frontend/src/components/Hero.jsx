import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">AI-Powered Printing</span>
          </div>
          
          <h1 className="hero-title">
            Stop waiting at print shops.
            <span className="hero-title-gradient"> Let AI prepare and print </span>
            your documents.
          </h1>
          
          <p className="hero-subtitle">
            PrintX introduces autonomous AI operators that receive your documents, 
            understand instructions, edit files programmatically, and execute 
            privacy-first printing with automatic deletion.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary hero-cta" onClick={() => navigate('/workspace')}>
              Get Started
              <ArrowRight className="btn-icon" size={20} />
            </button>
            
            <button className="btn-demo" onClick={() => {}}>
              <Play size={18} />
              <span>View Demo</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Privacy Secured</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">3 min</div>
              <div className="stat-label">Avg. Processing</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">AI Available</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="spline-container">
            <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
