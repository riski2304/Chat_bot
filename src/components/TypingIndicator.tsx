import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-2 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-card overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-primary/20"></div>
      </div>
      <div className="bg-chat-bubble-received px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '200ms' }}></span>
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '400ms' }}></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
