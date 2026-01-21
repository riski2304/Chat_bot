import React from 'react';
import { Message, DocumentOption } from '@/types/chat';
import mascot from '@/assets/mascot.png';

interface ChatBubbleProps {
  message: Message;
  onSelectDocument?: (doc: DocumentOption) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onSelectDocument }) => {
  const isBot = message.sender === 'bot';
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-2 animate-fade-in ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-card overflow-hidden flex-shrink-0 shadow-sm">
          <img src={mascot} alt="Bot" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isBot ? '' : ''}`}>
        <div
          className={`relative px-4 py-2 rounded-2xl shadow-sm ${
            isBot
              ? 'bg-chat-bubble-received text-foreground rounded-tl-sm'
              : 'bg-chat-bubble-sent text-primary-foreground rounded-tr-sm'
          }`}
        >
          {message.type === 'menu' && message.options ? (
            <div className="space-y-2">
              <p className="mb-3 font-medium">{message.content}</p>
              <div className="grid gap-2">
                {message.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSelectDocument?.(option)}
                    className="flex items-center gap-3 p-3 bg-secondary hover:bg-secondary/80 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="font-semibold text-secondary-foreground text-sm">{option.title}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
          
          <span className={`text-[10px] mt-1 block text-right ${
            isBot ? 'text-muted-foreground' : 'text-primary-foreground/70'
          }`}>
            {formatTime(message.timestamp)}
            {!isBot && (
              <span className="ml-1">✓✓</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
