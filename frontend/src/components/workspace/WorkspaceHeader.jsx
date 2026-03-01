import React from 'react';
import '../../styles/workspace.css';

const WorkspaceHeader = () => {
  return (
    <div className="workspace-header">
      <div className="workspace-header-left">
        <img 
          src="https://customer-assets.emergentagent.com/job_smart-printer/artifacts/9gr7s35m_Printx%20logo.png" 
          alt="PrintX Logo" 
          className="workspace-logo"
        />
        <span className="workspace-brand">PrintX</span>
      </div>

      <div className="workspace-header-right">
        <div className="workspace-status">
          <span className="status-indicator"></span>
          <span className="status-text">Online</span>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;