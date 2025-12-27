import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ChatPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi! I saw your swap request.',
      sender: 'other',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      text: 'Hello! Yes, I need to exchange cash for online money.',
      sender: 'me',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      text: 'Great! I can help with that. What amount are you looking for?',
      sender: 'other',
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '4',
      text: `₹${user?.amount?.toLocaleString('en-IN') || '5,000'}. When can we meet?`,
      sender: 'me',
      timestamp: new Date(Date.now() - 120000),
    },
  ]);
  const messagesEndRef = useRef(null);

  const userName = location.state?.userName || 'User';

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'me',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate response after 1 second
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: 'Sure, I can meet you today at 5 PM near Central Mall. Does that work?',
          sender: 'other',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/nearby')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'me'
                      ? 'bg-[#2563eb] text-white'
                      : 'bg-white border border-border'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                    {msg.timestamp.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-border">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-input-background"
            />
            <Button 
              onClick={handleSend}
              className="bg-[#2563eb] hover:bg-[#1d4ed8]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
