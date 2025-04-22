"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ConversationsList from './components/ConversationsList';
import MessageThread from './components/MessageThread';
import NewConversationModal from './components/NewConversationModal';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);
  const router = useRouter();

useEffect(() => {
    // Check if user is logged in using localStorage (consistent with the rest of the app)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userType = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    
    if (!loggedIn) {
      router.push('/Login');
      return;
    }
    
    // Set user type based on the stored role
    if (userType === 'finderUser') {
      setUserType('finder');
      setUserId(userId);
    } else if (userType === 'ownerUser') {
      setUserType('owner');
      setUserId(userId);
    } else {
      // Handle admin case or redirect to login
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    // Fetch conversations when userType and userId are available
    if (userType && userId) {
      fetchConversations();
    }
  }, [userType, userId]);

  useEffect(() => {
    // Fetch messages when a conversation is selected
    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/conversations/${userType}/${userId}`);
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedConversation) return;
    
    const finderId = userType === 'finder' ? userId : selectedConversation.Finder_ID_number;
    const ownerId = userType === 'owner' ? userId : selectedConversation.Owner_ID_number;
    
    try {
      const response = await axios.get(`http://localhost:8800/messages/${finderId}/${ownerId}`);
      setMessages(response.data);
      
      // Mark unread messages as read
      const unreadNotifyIds = response.data
        .filter(msg => msg.Seen_Status === 'Unread')
        .map(msg => msg.Notify_ID);
      
      if (unreadNotifyIds.length > 0) {
        await axios.put('http://localhost:8800/mark-as-read', { notifyIds: unreadNotifyIds });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !selectedConversation) return;
    
    const messageData = {
      FinderId: userType === 'finder' ? userId : selectedConversation.Finder_ID_number,
      OwnerId: userType === 'owner' ? userId : selectedConversation.Owner_ID_number,
      Text: messageText
    };
    
    try {
      await axios.post('http://localhost:8800/send-message', messageData);
      // Refresh messages
      fetchMessages();
      // Refresh conversations list to update last message
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <button 
          onClick={() => setIsNewConversationModalOpen(true)}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          New Message
        </button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations list */}
        <div className="w-1/3 border-r border-gray-300 bg-white overflow-y-auto">
          <ConversationsList 
            conversations={conversations}
            selectedId={selectedConversation?.Finder_ID_number || selectedConversation?.Owner_ID_number}
            userType={userType}
            onSelectConversation={setSelectedConversation}
          />
        </div>
        
        {/* Message thread */}
        <div className="w-2/3 flex flex-col bg-white">
          {selectedConversation ? (
            <MessageThread 
              messages={messages}
              userType={userType}
              userId={userId}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
      
      <NewConversationModal
        isOpen={isNewConversationModalOpen}
        onClose={() => setIsNewConversationModalOpen(false)}
        userType={userType}
        userId={userId}
        onConversationCreated={() => {
          fetchConversations();
        }}
      />
    </div>
  );
}
