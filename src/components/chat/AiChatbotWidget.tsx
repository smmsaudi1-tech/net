import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundEngine } from '../../utils/audioEngine';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const AiChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { theme } = useTheme();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am the Next Gen Devs AI Assistant 🤖. How can I help you build your digital project today?',
      time: 'Just now'
    }
  ]);

  const quickQuestions = [
    'What services do you offer?',
    'Show me your portfolio projects',
    'How do I start a project?',
    'What is your tech stack?'
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // AI Bot Reply Logic
    setTimeout(() => {
      let botReply = "That's awesome! Let's connect directly on WhatsApp or schedule a project briefing with our team.";
      const lower = userText.toLowerCase();

      if (lower.includes('service') || lower.includes('what we build')) {
        botReply = 'We build Websites, E-Commerce Stores, Custom Web Applications, UI/UX Design Systems, and AI Chatbots & Automations!';
      } else if (lower.includes('project') || lower.includes('portfolio') || lower.includes('work')) {
        botReply = 'Check out our Selected Work section featuring NXT Brand, Eldeeb Shop, iCloth Fashion, Yaqeen Al-Quran, and El Toufan!';
      } else if (lower.includes('start') || lower.includes('contact') || lower.includes('price') || lower.includes('cost')) {
        botReply = "Great! You can fill out our 'START A PROJECT' form below or click the WhatsApp button to start immediately.";
      } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('react')) {
        botReply = 'Our stack includes React 19, Next.js, Three.js 3D WebGL, GSAP ScrollTrigger, Tailwind CSS, Node.js, and Firebase.';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] font-mono text-left">
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        className={`p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-110 cursor-pointer ${
          theme === 'dark'
            ? 'bg-[#ffffff] text-[#000000] border border-[#ffffff]'
            : 'bg-[#000000] text-[#ffffff] border border-[#000000]'
        }`}
        data-cursor="AI BOT"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Bot className="w-6 h-6 stroke-[2.5]" />}
        {!isOpen && (
          <span className="hidden sm:inline text-xs font-black tracking-widest uppercase">
            AI ASSISTANT
          </span>
        )}
      </button>

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute bottom-16 right-0 w-[340px] sm:w-[400px] h-[480px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl ${
              theme === 'dark'
                ? 'bg-[#0d0d0d]/95 border-[#262626] text-[#ffffff]'
                : 'bg-[#ffffff]/95 border-[#e4e4e7] text-[#000000]'
            }`}
          >
            {/* Chat Header */}
            <div
              className={`p-4 border-b flex items-center justify-between ${
                theme === 'dark' ? 'bg-[#000000] border-[#181818]' : 'bg-[#f4f4f5] border-[#e4e4e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#181818] text-[#ffffff]">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-widest uppercase font-sans">
                    NEXT GEN AI AGENT
                  </h4>
                  <p className="text-[9px] text-[#a1a1aa] uppercase">ONLINE // READY TO HELP</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#262626] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? theme === 'dark'
                          ? 'bg-[#ffffff] text-[#000000] rounded-tr-none font-bold'
                          : 'bg-[#000000] text-[#ffffff] rounded-tr-none font-bold'
                        : theme === 'dark'
                        ? 'bg-[#181818] text-[#d4d4d8] border border-[#262626] rounded-tl-none'
                        : 'bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed font-sans">{msg.text}</p>
                  </div>
                  <span className="text-[8px] text-[#71717a] mt-1 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Quick Question Chips */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-b border-[#181818] bg-[#000000]/50">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className={`text-[9px] px-2.5 py-1 rounded-full border transition-all ${
                    theme === 'dark'
                      ? 'border-[#262626] bg-[#181818] text-[#a1a1aa] hover:border-[#ffffff] hover:text-[#ffffff]'
                      : 'border-[#e4e4e7] bg-[#f4f4f5] text-[#525252] hover:border-[#000000] hover:text-[#000000]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 flex items-center gap-2 bg-[#000000]"
            >
              <input
                type="text"
                placeholder="Ask about our services, projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-full text-xs font-mono border focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-[#181818] border-[#262626] text-[#ffffff] focus:border-[#ffffff]'
                    : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-[#000000]'
                }`}
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#e5e5e5] transition-all cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
