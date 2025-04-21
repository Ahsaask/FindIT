import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NewConversationModal({ isOpen, onClose, userType, userId, onConversationCreated }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      fetchPotentialRecipients();
    }
  }, [isOpen, userType, userId]);
  
  const fetchPotentialRecipients = async () => {
    setLoading(true);
    try {
      // Fetch users of the opposite type
      const endpoint = userType === 'finder' ? '/owner_accounts' : '/finder_accounts';
      const response = await axios.get(`http://localhost:8800${endpoint}`);
      console.log("Fetched users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching potential recipients:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !message.trim()) return;
    
    try {
      const messageData = {
        FinderId: userType === 'finder' ? userId : selectedUser.Finder_ID_number,
        OwnerId: userType === 'owner' ? userId : selectedUser.Owner_ID_number,
        Text: message
      };
      
      await axios.post('http://localhost:8800/send-message', messageData);
      onConversationCreated();
      onClose();
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">New Message</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select recipient:
            </label>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedUser ? selectedUser.Email : ''}
                onChange={(e) => {
                  const selected = users.find(user => user.Email === e.target.value);
                  setSelectedUser(selected);
                }}
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option 
                    key={user.Email}
                    value={user.Email}
                  >
                    {user.Email}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={!selectedUser || !message.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}