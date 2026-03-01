import React, { useState, useEffect } from 'react';
import { Search, Shield, Sparkles, Star, Clock } from 'lucide-react';
import { getShops } from '../../services/shopService';
import '../../styles/workspace.css';

const ShopSidebar = ({ selectedShop, onSelectShop }) => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [agentStatus, setAgentStatus] = useState(false);

  useEffect(() => {
    loadShops();
    checkAgentStatus();
    
    const interval = setInterval(() => {
      checkAgentStatus();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const checkAgentStatus = () => {
    const storedStatus = localStorage.getItem('agentActive');
    if (storedStatus !== null) {
      setAgentStatus(JSON.parse(storedStatus));
    }
  };

  const loadShops = async () => {
    setLoading(true);
    const data = await getShops(searchQuery);
    setShops(data);
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    const data = await getShops(query);
    setShops(data);
  };

  return (
    <div className="shop-sidebar">
      <div className="sidebar-header">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search nearby print shops..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="shops-list">
        {loading ? (
          <div className="loading-state">Loading shops...</div>
        ) : shops.length === 0 ? (
          <div className="empty-state">No shops found</div>
        ) : (
          shops.map((shop) => (
            <div
              key={shop.id}
              className={`shop-card ${selectedShop?.id === shop.id ? 'active' : ''} ${shop.isPrintX ? 'printx-shop' : ''}`}
              onClick={() => onSelectShop(shop)}
            >
              <div className="shop-header">
                {shop.isPrintX ? (
                  <div className="shop-name-with-logo">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
                      alt="PrintX Logo" 
                      className="shop-logo-small"
                    />
                    <h3 className="shop-name">{shop.name}</h3>
                  </div>
                ) : (
                  <h3 className="shop-name">{shop.name}</h3>
                )}
                <div className="shop-rating">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span>{shop.rating}</span>
                </div>
              </div>

              <div className="shop-badges">
                {shop.verified && (
                  <div className="badge badge-verified">
                    <Shield size={12} />
                    <span>Privacy Verified</span>
                  </div>
                )}
                {shop.aiEnabled && (
                  <div className="badge badge-ai">
                    <Sparkles size={12} />
                    <span>AI Enabled</span>
                  </div>
                )}
              </div>

              <div className="shop-meta">
                {shop.location ? (
                  <span className="shop-location">{shop.location}</span>
                ) : (
                  <span className="shop-location official">Official Demo Lab</span>
                )}
                <div className={`shop-status ${shop.status}`}>
                  <Clock size={12} />
                  <span>{shop.status === 'online' ? 'Open now' : 'Busy'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopSidebar;
