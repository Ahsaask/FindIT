import React, { useState, useRef, useEffect } from 'react';

export default function MessageThread({ messages, userType, userId, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = 
              (userType === 'finder' && message.Finder_ID_number === userId) ||
              (userType === 'owner' && message.Owner_ID_number === userId);
            
            return (
              <div 
                key={message.Notify_ID}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                    isCurrentUser 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.Text}</p>
                  <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                    {new Date(message.Date).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}