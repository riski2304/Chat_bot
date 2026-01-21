import React from 'react';
import mascot from '@/assets/mascot.png';

interface ChatHeaderProps {
  botName: string;
  status: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ botName, status }) => {
  return (
    <header className="bg-chat-header px-4 py-3 flex items-center gap-3 shadow-md">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-card overflow-hidden border-2 border-primary-foreground/20">
          <img 
            src={mascot} 
            alt="Bot Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-chat-header"></div>
      </div>
      <div className="flex-1">
        <h1 className="text-primary-foreground font-bold text-lg">{botName}</h1>
        <p className="text-primary-foreground/80 text-sm">{status}</p>
      </div>
      <div className="flex gap-4 text-primary-foreground">
        <button className="hover:bg-primary-foreground/10 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="hover:bg-primary-foreground/10 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
