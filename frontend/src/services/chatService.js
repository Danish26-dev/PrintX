// Mock chat service - Backend will replace with real AI agent integration

// Store conversation state
let uploadedDocument = null;
let printJobInitiated = false;

export const sendMessage = async (message, shopId, files = []) => {
  // Store uploaded document
  if (files.length > 0) {
    uploadedDocument = files[0];
  }
  
  const lowerMessage = message.toLowerCase();
  
  // Determine response type first to apply appropriate delay
  let responseType = 'greeting';
  
  if (files.length > 0 || lowerMessage.includes('upload') || lowerMessage.includes('document uploaded')) {
    responseType = 'upload';
    // Simulate document analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));
  } else if (lowerMessage.includes('edit') || lowerMessage.includes('change') || lowerMessage.includes('resize') || 
             lowerMessage.includes('increase') || lowerMessage.includes('format') || lowerMessage.includes('margin') ||
             lowerMessage.includes('font')) {
    responseType = 'edit';
    // Simulate AI processing time for editing
    await new Promise(resolve => setTimeout(resolve, 4500));
  } else if (lowerMessage.includes('print') && !printJobInitiated) {
    responseType = 'printInitiate';
    // Simulate print queue processing time
    await new Promise(resolve => setTimeout(resolve, 3500));
  } else if (printJobInitiated && (lowerMessage.includes('yes') || lowerMessage.includes('received') || 
             lowerMessage.includes('got it') || lowerMessage.includes('have it'))) {
    responseType = 'received';
    // Simulate deletion process time
    await new Promise(resolve => setTimeout(resolve, 4000));
  } else if (printJobInitiated && (lowerMessage.includes('no') || lowerMessage.includes('not yet') || 
             lowerMessage.includes('waiting'))) {
    responseType = 'notReceived';
    await new Promise(resolve => setTimeout(resolve, 2500));
  } else {
    // Default greeting delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Mock AI responses based on message content
  const responses = {
    greeting: "Hello! I'm your AI print assistant. I can help you prepare your documents for printing. Please upload your files or tell me what you need.",
    
    upload: "I've received your document! 📄\n\nLet me analyze it... \n\n✓ Document scanned\n✓ Format detected\n✓ Ready for editing\n\nWhat changes would you like me to make? For example:\n• 'Increase font size'\n• 'Add margins'\n• 'Change formatting'",
    
    edit: "Perfect! I'm processing your editing instructions now:\n\n⚙️ Parsing document structure...\n✏️ Applying your edits...\n🎨 Optimizing layout...\n✓ Processing complete!\n\nHere's your edited document 👇",
    
    printInitiate: "🖨️ Print Job Initiated!\n\nProcessing your print request...\n\n✓ Document validated\n✓ Print queue confirmed\n✓ Sending to printer...\n\n📊 Job Details:\n━━━━━━━━━━━━━━━━\nJob ID: #PX-2024-8472\nPages: 3\nEstimated time: 5-7 minutes\nCost: ₹35\n\nYour document is being printed now. Have you received your printed documents?",
    
    received: "Perfect! ✅\n\nPrint job completed successfully!\n\n🔒 Security Notice:\nFor your privacy, I'm now permanently deleting all uploaded files from our servers...\n\n⏳ Deleting document...\n✓ File deleted\n✓ Print queue cleared\n✓ All traces removed\n\n🎉 Thank you for using PrintX! Your files are secure and have been completely removed from our system.\n\nIs there anything else you'd like to print?",
    
    notReceived: "No problem! Let me check the printer status...\n\n🔍 Checking printer...\n⏳ Please wait while I investigate...\n\nThe printer is active and your job is in the queue. It should be ready in 2-3 minutes. Please check the pickup counter.\n\nLet me know once you have it!",
    
    confirm: "Great! Your print job has been confirmed:\n\n📄 Job ID: #PX-2024-8472\n⏱️ Estimated time: 5 minutes\n💰 Total: ₹35\n\nYou'll receive a notification when ready!"
  };
  
  // Build response based on type
  let editedDoc = null;
  
  if (responseType === 'upload') {
    printJobInitiated = false;
  } else if (responseType === 'edit') {
    printJobInitiated = false;
    // Return edited document with the response
    editedDoc = {
      name: uploadedDocument?.name || 'edited-document.pdf',
      url: 'https://customer-assets.emergentagent.com/job_5ac4a577-22e7-4c91-9664-b0e52dfa2fe4/artifacts/sb64l8kj_edited%20pdf.pdf',
      type: 'application/pdf',
      isEdited: true
    };
  } else if (responseType === 'printInitiate') {
    printJobInitiated = true;
  } else if (responseType === 'received') {
    printJobInitiated = false;
    uploadedDocument = null; // Clear document
  }
  
  return {
    id: Date.now(),
    type: 'ai',
    text: responses[responseType],
    timestamp: new Date().toISOString(),
    shopId,
    editedDoc: editedDoc
  };
};

export const getWelcomeMessage = () => {
  return {
    id: 'welcome',
    type: 'system',
    text: "👋 Welcome to PrintX!\n\nSelect a print shop from the left sidebar to start a conversation with their AI assistant. Upload your documents and give instructions in natural language.\n\n🔒 All files are encrypted and automatically deleted after printing.",
    timestamp: new Date().toISOString()
  };
};
