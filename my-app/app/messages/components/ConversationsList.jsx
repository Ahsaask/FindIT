import React from 'react';

export default function ConversationsList({ conversations, selectedId, userType, onSelectConversation }) {
  if (!conversations.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => {
        const isSelected = selectedId === (userType === 'finder' ? conversation.Owner_ID_number : conversation.Finder_ID_number);
        const hasUnread = conversation.Seen_Status === 'Unread';
        
        return (
          <div
            key={userType === 'finder' ? conversation.Owner_ID_number : conversation.Finder_ID_number}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  {conversation.First_name?.[0] || '?'}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${hasUnread ? 'text-blue-600 font-bold' : 'text-gray-900'}`}>
                  {conversation.First_name} {conversation.Last_name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {new Date(conversation.LastMessageDate).toLocaleString()}
                </p>
              </div>
              {hasUnread && (
                <div className="flex-shrink-0">
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded-full"></span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}