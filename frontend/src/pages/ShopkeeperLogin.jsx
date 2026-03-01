import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import '../styles/shopkeeper.css';

const ShopkeeperLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    shopName: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock authentication - just store shopkeeper info
    const shopkeeperData = {
      shopName: credentials.shopName || 'PrintX Demo Lab',
      loggedIn: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('shopkeeper', JSON.stringify(shopkeeperData));
    
    // Navigate to shopkeeper dashboard
    navigate('/shopkeeper-dashboard');
  };

  return (
    <div className="shopkeeper-login-page">
      <div className="login-container">
        <div className="login-header">
          <img 
            src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
            alt="PrintX Logo" 
            className="login-logo"
          />
          <h1 className="login-title">PrintX</h1>
          <p className="login-subtitle">Shopkeeper Portal</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              <User size={18} />
              <span>Shop Name</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your shop name"
              value={credentials.shopName}
              onChange={(e) => setCredentials({ ...credentials, shopName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={18} />
              <span>Password</span>
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password (demo only)"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button type="submit" className="login-button">
            <LogIn size={20} />
            <span>Login to Dashboard</span>
          </button>

          <p className="login-note">
            💡 This is a demo. Any credentials will work.
          </p>
        </form>

        <button className="back-to-home" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>

      <div className="login-background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
      </div>
    </div>
  );
};

export default ShopkeeperLogin;
