import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatReply } from '../services/api';

export default function ChatbotFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! Main aapka Bazaar Saathi hoon. Aaj kya kharidna hai?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    try {
      const reply = await getChatReply(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Maaf kijiye, abhi network ki samasya hai.' }]);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-20 right-4 w-14 h-14 bg-yellow-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors z-20"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-20 right-4 left-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-30 flex flex-col"
            style={{ height: '400px', maxHeight: '60vh' }}
          >
            {/* Header */}
            <div className="bg-yellow-500 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Bazaar Saathi</h3>
                <p className="text-xs opacity-90">AI Market Assistant</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-yellow-600 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' ? 'bg-leaf-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Poochiye (e.g., Aata kahan sasta milega?)"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-leaf-500"
              />
              <button type="submit" className="w-10 h-10 bg-leaf-600 text-white rounded-full flex items-center justify-center hover:bg-leaf-700 shrink-0">
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
