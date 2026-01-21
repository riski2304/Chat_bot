import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-3 flex items-center gap-2">
      <button 
        type="button" 
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Smile size={24} />
      </button>
      <button 
        type="button" 
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Paperclip size={24} />
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ketik pesan..."
        disabled={disabled}
        className="flex-1 bg-card rounded-full px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
