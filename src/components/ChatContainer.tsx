import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import DocumentForm from '@/components/DocumentForm';
import TypingIndicator from '@/components/TypingIndicator';
import { Message, DocumentOption, FormData, documentTypes } from '@/types/chat';
import { generatePDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import mascot from '@/assets/mascot.png';
import { askGemini } from '@/lib/gemini';

const ChatContainer: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentOption | null>(null);
  const [showForm, setShowForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showForm]);

  useEffect(() => {
    // Initial greeting
    const greetingTimeout = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: '1',
            content: 'Halo! 👋 Selamat datang di Huma-AI!\n\nSaya akan membantu Anda membuat surat akademik dengan cepat dan mudah.',
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          }
        ]);
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: '2',
              content: 'Silakan pilih jenis surat yang Anda butuhkan:',
              sender: 'bot',
              timestamp: new Date(),
              type: 'menu',
              options: documentTypes
            }]);
          }, 1000);
        }, 500);
      }, 1500);
    }, 500);

    return () => clearTimeout(greetingTimeout);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);

    // Bot response

setIsTyping(true);

const lowerContent = content.toLowerCase();

// 1. Logika untuk Menu (Tetap kaku agar sistem surat berjalan)
if (lowerContent.includes('surat') || lowerContent.includes('dokumen') || lowerContent.includes('menu')) {
  setIsTyping(false);
  setMessages(prev => [...prev, {
    id: Date.now().toString(),
    content: 'Tentu! Silakan pilih jenis surat yang Anda butuhkan:',
    sender: 'bot',
    timestamp: new Date(),
    type: 'menu',
    options: documentTypes
  }]);
} 
// 2. Logika untuk AI Gemini (Untuk semua pertanyaan lain)
else {
  try {
    // Memanggil API Gemini dan menunggu hasilnya
    const aiResponse = await askGemini(content); 
    
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: aiResponse, 
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }]);
  } catch (error) {
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: 'Maaf, saya sedang mengalami gangguan koneksi. Bisa ulangi pertanyaannya?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }]);
  }
}
  };

  const handleSelectDocument = (doc: DocumentOption) => {
    setSelectedDocument(doc);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: doc.title,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: `Baik, Anda memilih ${doc.title}. Silakan lengkapi data berikut:`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }]);
      setShowForm(true);
    }, 800);
  };

  const handleFormSubmit = (formData: FormData) => {
    setShowForm(false);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `NIM: ${formData.nim}\nNama: ${formData.nama}`,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      try {
        generatePDF(formData);
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: `✅ ${selectedDocument?.title} berhasil dibuat!\n\nPDF telah di-download ke perangkat Anda.\n\nApakah ada surat lain yang dibutuhkan? Ketik "menu" untuk melihat pilihan lainnya.`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }]);

        toast({
          title: "PDF Berhasil Dibuat!",
          description: `${selectedDocument?.title} telah di-download.`,
        });
      } catch (error) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: '❌ Maaf, terjadi kesalahan saat membuat PDF. Silakan coba lagi.',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }]);
      }
      
      setSelectedDocument(null);
    }, 1500);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedDocument(null);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: 'Baik, pembuatan surat dibatalkan.\n\nKetik "menu" jika Anda ingin membuat surat lain.',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background shadow-2xl">
      <ChatHeader botName="Huma-AI" status="Online" />
      
      <div className="flex-1 overflow-y-auto chat-pattern p-4 space-y-4">
        {/* Welcome banner */}
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
            <img 
              src={mascot} 
              alt="Mascot" 
              className="w-32 h-32 animate-bounce-subtle"
            />
            <p className="text-muted-foreground text-center">
              Memulai percakapan...
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            onSelectDocument={handleSelectDocument}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        {showForm && selectedDocument && (
          <div className="py-2">
            <DocumentForm
              documentType={selectedDocument.id}
              documentTitle={selectedDocument.title}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSend={handleSendMessage} disabled={showForm} />
    </div>
  );
};

export default ChatContainer;
