import React, { useState, useEffect } from 'react';
import VerticalSidebar from '../components/workspace/VerticalSidebar';
import WorkspaceHeader from '../components/workspace/WorkspaceHeader';
import ShopSidebar from '../components/workspace/ShopSidebar';
import ChatInterface from '../components/workspace/ChatInterface';
import PreviewDrawer from '../components/workspace/PreviewDrawer';
import { getWelcomeMessage } from '../services/chatService';
import '../styles/workspace.css';

const Workspace = () => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [messages, setMessages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Show welcome message on load
    const welcomeMsg = getWelcomeMessage();
    setMessages([welcomeMsg]);
  }, []);

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
    
    // Add shop-specific welcome message
    const shopWelcome = {
      id: `shop-welcome-${shop.id}`,
      type: 'ai',
      text: `Hi! I'm the AI assistant for ${shop.name}. I'm here to help you with your printing needs. You can upload documents and I'll help prepare them for printing. What would you like to print today?`,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, shopWelcome]);
  };

  const handleFileUpload = (file) => {
    setUploadedFiles(prev => [...prev, file]);
    setDrawerOpen(true);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="workspace-page">
      <WorkspaceHeader />
      
      <div className="workspace-container">
        <VerticalSidebar />
        
        <ShopSidebar 
          selectedShop={selectedShop} 
          onSelectShop={handleSelectShop} 
        />
        
        <div className="workspace-main">
          <ChatInterface
            selectedShop={selectedShop}
            messages={messages}
            setMessages={setMessages}
            onFileUpload={handleFileUpload}
          />
          
          <PreviewDrawer
            isOpen={drawerOpen}
            onClose={toggleDrawer}
            uploadedFiles={uploadedFiles}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
