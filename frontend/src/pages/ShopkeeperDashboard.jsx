import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Power, LogOut, MessageSquare, Settings, Activity } from 'lucide-react';
import '../styles/shopkeeper.css';

const ShopkeeperDashboard = () => {
  const navigate = useNavigate();
  const [shopkeeper, setShopkeeper] = useState(null);
  const [agentActive, setAgentActive] = useState(false);
  const [channelStats, setChannelStats] = useState({
    activeChats: 0,
    pendingOrders: 3,
    todayRevenue: 450
  });

  useEffect(() => {
    // Check if shopkeeper is logged in
    const storedShopkeeper = localStorage.getItem('shopkeeper');
    if (!storedShopkeeper) {
      navigate('/shopkeeper-login');
      return;
    }
    
    setShopkeeper(JSON.parse(storedShopkeeper));
    
    // Load agent status from localStorage
    const storedAgentStatus = localStorage.getItem('agentActive');
    if (storedAgentStatus !== null) {
      setAgentActive(JSON.parse(storedAgentStatus));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('shopkeeper');
    navigate('/');
  };

  const toggleAgent = () => {
    const newStatus = !agentActive;
    setAgentActive(newStatus);
    // Save agent status to localStorage so workspace can read it
    localStorage.setItem('agentActive', JSON.stringify(newStatus));
  };

  if (!shopkeeper) return null;

  return (
    <div className="shopkeeper-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <img 
            src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
            alt="PrintX Logo" 
            className="dashboard-logo"
          />
          <div>
            <h1 className="dashboard-title">{shopkeeper.shopName}</h1>
            <p className="dashboard-subtitle">Shopkeeper Dashboard</p>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Agent Control Panel */}
        <div className="control-panel">
          <h2 className="panel-title">AI Agent Control</h2>
          
          <div className="agent-status-card">
            <div className="agent-status-header">
              <div className="agent-info">
                <Activity size={24} />
                <div>
                  <h3>PrintX AI Assistant</h3>
                  <p className={`status-text ${agentActive ? 'active' : 'inactive'}`}>
                    {agentActive ? 'Agent Active & Ready' : 'Agent Sleeping'}
                  </p>
                </div>
              </div>
              
              <button 
                className={`agent-toggle ${agentActive ? 'active' : ''}`}
                onClick={toggleAgent}
              >
                <Power size={24} />
              </button>
            </div>

            {agentActive && (
              <div className="agent-activity">
                <div className="activity-pulse"></div>
                <p>AI Agent is monitoring customer requests...</p>
              </div>
            )}

            <div className="agent-description">
              <p>
                {agentActive 
                  ? '✓ Your AI assistant is now active and will automatically respond to customer queries in real-time.'
                  : '⏸️ Wake up the AI agent to start accepting and processing customer print requests.'
                }
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <MessageSquare size={20} />
              <div>
                <p className="stat-value">{channelStats.activeChats}</p>
                <p className="stat-label">Active Chats</p>
              </div>
            </div>

            <div className="stat-card">
              <Settings size={20} />
              <div>
                <p className="stat-value">{channelStats.pendingOrders}</p>
                <p className="stat-label">Pending Orders</p>
              </div>
            </div>

            <div className="stat-card">
              <Activity size={20} />
              <div>
                <p className="stat-value">₹{channelStats.todayRevenue}</p>
                <p className="stat-label">Today's Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Channel Preview */}
        <div className="channel-preview">
          <h2 className="panel-title">Your Print Shop Channel</h2>
          
          <div className="preview-card">
            <div className="preview-header">
              <img 
                src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
                alt="Shop Logo" 
                className="preview-logo"
              />
              <div>
                <h3>{shopkeeper.shopName}</h3>
                <p>AI-Powered Print Shop</p>
              </div>
            </div>

            <div className="preview-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Real-time AI Chat Support</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Automated Order Processing</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Privacy-First Document Handling</span>
              </div>
            </div>

            <button 
              className="preview-button"
              onClick={() => navigate('/workspace')}
            >
              View Customer Experience →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
