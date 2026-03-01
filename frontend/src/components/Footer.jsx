import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-group">
              <img 
                src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
                alt="PrintX Logo" 
                className="footer-logo-image"
              />
              <h3 className="footer-logo-text">PrintX</h3>
            </div>
            <p className="footer-tagline">Autonomous Printing with Privacy</p>
          </div>

          <div className="footer-links-group">
            <div className="footer-column">
              <h4 className="footer-column-title">Product</h4>
              <a href="#features" className="footer-link">Features</a>
              <a href="#" className="footer-link">Pricing</a>
              <a href="#" className="footer-link">API</a>
              <a href="#" className="footer-link">Documentation</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <a href="#" className="footer-link">About</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Contact</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Legal</h4>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Security</a>
              <a href="#" className="footer-link">Compliance</a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 PrintX. All rights reserved.
          </p>

          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
