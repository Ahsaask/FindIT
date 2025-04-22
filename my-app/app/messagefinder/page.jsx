"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

// Mock data for conversations (from finder's perspective)
const mockConversations = [
  {
    id: 1,
    name: "Michael Brown",
    lastMessage: "Is this your laptop? I found it in the library",
    time: "10:30 AM",
    unread: 2,
    avatar: null
  },
  {
    id: 2,
    name: "Jennifer Lee",
    lastMessage: "I found a blue water bottle with your name on it",
    time: "Yesterday",
    unread: 0,
    avatar: null
  },
  {
    id: 3,
    name: "David Wilson",
    lastMessage: "I found a pink cat keychain with a white hat",
    time: "1 week ago",
    unread: 0,
    avatar: null
  }
];

// Mock data for messages (from finder's perspective)
const mockMessages = {
  1: [
    { id: 1, sender: "You", content: "I found your laptop in the library", time: "10:30 AM", isMe: true },
    { id: 2, sender: "Michael Brown", content: "Really? That's great news! Can you describe it?", time: "10:32 AM", isMe: false },
    { id: 3, sender: "You", content: "It's a silver MacBook Pro with a sticker on the back", time: "10:33 AM", isMe: true },
    { id: 4, sender: "Michael Brown", content: "That's definitely mine! Where can I pick it up?", time: "10:35 AM", isMe: false },
    { id: 5, sender: "You", content: "I'll be at the student center until 2 PM today", time: "10:36 AM", isMe: true }
  ],
  2: [
    { id: 1, sender: "You", content: "I found a blue Hydro Flask with your name written on it", time: "Yesterday", isMe: true },
    { id: 2, sender: "Jennifer Lee", content: "That's mine! Where did you find it?", time: "Yesterday", isMe: false },
    { id: 3, sender: "You", content: "I found it in the Science Center, room 205", time: "Yesterday", isMe: true },
    { id: 4, sender: "Jennifer Lee", content: "Can we meet tomorrow at 11 AM in the student lounge?", time: "Yesterday", isMe: false },
    { id: 5, sender: "You", content: "Sure, I'll be there!", time: "Yesterday", isMe: true }
  ],
  3: [
    { id: 1, sender: "You", content: "I found a pink cat keychain with a white hat", time: "1 week ago", isMe: true },
    { id: 2, sender: "David Wilson", content: "That's mine! Where did you find it?", time: "1 week ago", isMe: false },
    { id: 3, sender: "You", content: "I found it near the cafeteria", time: "1 week ago", isMe: true },
    { id: 4, sender: "David Wilson", content: "Can we meet in front of ST 148 tomorrow at 3 PM?", time: "1 week ago", isMe: false },
    { id: 5, sender: "You", content: "Yes, I'll be there!", time: "1 week ago", isMe: true }
  ]
};

export default function FinderMessages() {
  const router = useRouter();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');

    if (!isLoggedIn) {
      router.push('/Login');
      return;
    }

    if (role !== 'finderUser') {
      router.push('/homepage');
      return;
    }

    setUserRole(role);
  }, [router]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read
    setConversations(conversations.map(conv => 
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    ));
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send to the backend
    // For now, we'll just update the UI
    const updatedMessages = {
      ...mockMessages,
      [selectedConversation.id]: [
        ...mockMessages[selectedConversation.id],
        {
          id: mockMessages[selectedConversation.id].length + 1,
          sender: "You",
          content: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true
        }
      ]
    };
    
    // Update the last message in the conversation list
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage, time: "Just now" } 
        : conv
    ));
    
    setNewMessage("");
  };

  const handleBackToHome = () => {
    router.push('/homepage');
  };

  if (!userRole) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          {selectedConversation ? (
            <button 
              onClick={() => setSelectedConversation(null)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <IoMdArrowBack size={24} />
            </button>
          ) : (
            <>
              <button 
                onClick={handleBackToHome}
                className="mr-4 text-gray-600 hover:text-gray-800"
              >
                <IoMdArrowBack size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            </>
          )}
          {selectedConversation && (
            <div className="flex items-center">
              {selectedConversation.avatar ? (
                <img 
                  src={selectedConversation.avatar} 
                  alt={selectedConversation.name} 
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-400 mr-2" />
              )}
              <h2 className="text-lg font-medium text-gray-800">{selectedConversation.name}</h2>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        {!selectedConversation ? (
          <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-center">
                    {conversation.avatar ? (
                      <img 
                        src={conversation.avatar} 
                        alt={conversation.name} 
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-gray-400 mr-3" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Area */
          <div className="w-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {mockMessages[selectedConversation.id].map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.isMe ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} rounded-lg p-3 shadow-sm`}>
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 