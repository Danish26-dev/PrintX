import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader2 } from 'lucide-react';
import { sendMessage } from '../../services/chatService';
import { uploadFile } from '../../services/fileService';
import DocumentPreviewCard from './DocumentPreviewCard';
import EditedDocumentPreview from './EditedDocumentPreview';
import '../../styles/workspace.css';

const ChatInterface = ({ selectedShop, messages, setMessages, onFileUpload }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamingIntervalRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingMessage]);

  useEffect(() => {
    // Cleanup streaming on unmount
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const streamText = (fullText, messageData) => {
    // Clear any existing streaming
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }

    let currentIndex = 0;
    const words = fullText.split(' ');
    
    // Start with empty streaming message
    setStreamingMessage({
      ...messageData,
      text: '',
      isStreaming: true
    });

    streamingIntervalRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        const currentText = words.slice(0, currentIndex + 1).join(' ');
        setStreamingMessage({
          ...messageData,
          text: currentText + (currentIndex < words.length - 1 ? ' ' : ''),
          isStreaming: true
        });
        currentIndex++;
      } else {
        // Streaming complete
        clearInterval(streamingIntervalRef.current);
        setStreamingMessage(null);
        setMessages(prev => [...prev, {
          ...messageData,
          text: fullText
        }]);
      }
    }, 50); // Speed of streaming (50ms per word)
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedShop) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await sendMessage(inputMessage, selectedShop.id);
      setIsTyping(false);
      
      // Stream the response instead of showing all at once
      streamText(aiResponse.text, aiResponse);
    } catch (error) {
      setIsTyping(false);
      console.error('Error sending message:', error);
    }
  };

  const handlePrintClick = async (doc) => {
    // User clicked print button
    const printMessage = {
      id: Date.now(),
      type: 'user',
      text: '🖨️ Print this document',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, printMessage]);
    setIsTyping(true);

    try {
      // Trigger print flow
      const aiResponse = await sendMessage('print this document', selectedShop.id);
      setIsTyping(false);
      
      // Stream the response
      streamText(aiResponse.text, aiResponse);
    } catch (error) {
      setIsTyping(false);
      console.error('Error:', error);
    }
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        const uploadedFile = await uploadFile(file);
        onFileUpload(uploadedFile);

        const uploadMessage = {
          id: Date.now() + Math.random(),
          type: 'user',
          text: '',
          file: uploadedFile,
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, uploadMessage]);
        
        setIsTyping(true);
        const aiResponse = await sendMessage('Document uploaded', selectedShop.id, [uploadedFile]);
        setIsTyping(false);
        
        // Stream the response
        streamText(aiResponse.text, aiResponse);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedShop) {
    return (
      <div className="chat-empty-state">
        <div className="empty-state-content">
          <div className="empty-icon">💬</div>
          <h3>Select a Print Shop</h3>
          <p>Choose a shop from the left sidebar to start chatting with their AI assistant</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="chat-shop-info">
          <h3>{selectedShop.name}</h3>
          <p className="chat-shop-status">
            <span className="status-dot online"></span>
            AI Assistant Active
          </p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message message-${message.type}`}>
            <div className={`message-bubble ${message.file || message.editedDoc ? 'has-file' : ''}`}>
              {message.file ? (
                <DocumentPreviewCard file={message.file} />
              ) : message.editedDoc ? (
                <>
                  <p className="message-text">{message.text}</p>
                  <EditedDocumentPreview 
                    doc={message.editedDoc}
                    onPrintClick={() => handlePrintClick(message.editedDoc)}
                  />
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </>
              ) : (
                <>
                  <p className="message-text">{message.text}</p>
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Show streaming message */}
        {streamingMessage && (
          <div className="message message-ai">
            <div className="message-bubble">
              {streamingMessage.editedDoc ? (
                <>
                  <p className="message-text streaming-text">{streamingMessage.text}</p>
                  <EditedDocumentPreview 
                    doc={streamingMessage.editedDoc}
                    onPrintClick={() => handlePrintClick(streamingMessage.editedDoc)}
                  />
                </>
              ) : (
                <p className="message-text streaming-text">{streamingMessage.text}<span className="streaming-cursor">▋</span></p>
              )}
            </div>
          </div>
        )}

        {isTyping && !streamingMessage && (
          <div className="message message-ai">
            <div className="message-bubble typing-bubble">
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          multiple
        />
        
        <button
          className="attach-button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 size={20} className="spinner" />
          ) : (
            <Paperclip size={20} />
          )}
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message or upload a document..."
          className="chat-input"
        />

        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
