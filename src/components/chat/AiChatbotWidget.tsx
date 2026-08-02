import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { subscribeProjects } from '../../services/projectService';
import { RealProject } from '../../types';
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
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { content } = useSiteContent();

  const [projects, setProjects] = useState<RealProject[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'أهلاً بك! أنا مساعد الذكاء الاصطناعي لشركة Next Gen Devs 🤖. كيف يمكنني مساعدتك في مشروعك الرقمي اليوم؟',
      time: 'Just now'
    }
  ]);

  // Live Val.town Server Endpoint URL
  const valTownUrl =
    (import.meta as any).env?.VITE_VAL_TOWN_URL ||
    'https://jomo--3a45db048e9711f18da61607ee4eb77e.web.val.run';

  useEffect(() => {
    const unsub = subscribeProjects((fetched) => {
      setProjects(fetched || []);
    });
    return () => unsub();
  }, []);

  // Intelligent Firebase Context Response Generator (Bilingual Arabic & English)
  const generateDynamicFirebaseReply = (userQuery: string): string => {
    const query = userQuery.toLowerCase();
    const isArabic = /[\u0600-\u06FF]/.test(userQuery);

    // 1. Check for Services
    if (query.includes('خدمة') || query.includes('خدمات') || query.includes('تعملوا ايه') || query.includes('بتعملوا') || query.includes('service') || query.includes('offer')) {
      const srv1 = content['srv1.title'] || 'WEB DEVELOPMENT';
      const srv2 = content['srv2.title'] || 'E-COMMERCE STORES';
      const srv3 = content['srv3.title'] || 'CUSTOM AI & SaaS PLATFORMS';
      if (isArabic) {
        return `نحن في Next Gen Devs نقدم الخدمات الرقمية التالية:\n• ${srv1}\n• ${srv2}\n• ${srv3}\n• تصميم أنظمة الواجهات UI/UX والتطبيقات الذكية.`;
      }
      return `At Next Gen Devs we offer:\n• ${srv1}\n• ${srv2}\n• ${srv3}\n• Custom UI/UX Design Systems & AI Automations.`;
    }

    // 2. Check for Projects / Portfolio
    if (query.includes('مشروع') || query.includes('مشاريع') || query.includes('اعمال') || query.includes('سابق') || query.includes('project') || query.includes('work') || query.includes('portfolio')) {
      if (projects.length > 0) {
        const titles = projects.map(p => `• ${p.title} (${p.category})`).join('\n');
        if (isArabic) {
          return `إليك المشاريع الحالية المتاحة في معارضنا:\n${titles}\nيمكنك تصفحها بالكامل في قسم SELECTED WORK.`;
        }
        return `Here are our live projects:\n${titles}\nYou can explore them in our Selected Work section.`;
      }
      if (isArabic) {
        return 'جميع مشاريعنا يتم تحديثها ومزامنتها حياً من الفيربيز في قسم SELECTED WORK!';
      }
      return 'Our live portfolio projects are continuously updated in our Selected Work section!';
    }

    // 3. Check for Contact / Starting a Project / Phone
    if (query.includes('تواصل') || query.includes('رقم') || query.includes('واتس') || query.includes('سعر') || query.includes('تكلفة') || query.includes('شغل') || query.includes('contact') || query.includes('start') || query.includes('phone')) {
      const phone = content['contact.phone'] || '01020451206';
      if (isArabic) {
        return `يمكنك التواصل معنا فوراً لبدء مشروعك:\n📞 الاتصال أو الواتساب: ${phone}\nأو اضغط على زر "START A PROJECT" لتعبئة نموذج طلب المشروع.`;
      }
      return `You can reach out to us directly:\n📞 Call / WhatsApp: ${phone}\nOr click "START A PROJECT" to submit your project brief!`;
    }

    // 4. Greetings
    if (query.includes('ازيك') || query.includes('السلام') || query.includes('مرحبا') || query.includes('أهلا') || query.includes('اهلين') || query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      if (isArabic) {
        return 'أهلاً وسهلاً بك! الحمد لله بكل خير. كيف يمكنني مساعدتك في تطوير موقعك أو متجرك الإلكتروني مع Next Gen Devs اليوم؟';
      }
      return 'Hello! How can I assist you with building your web project with Next Gen Devs today?';
    }

    // Default polite response
    if (isArabic) {
      return `أنا مساعد الذكاء الاصطناعي الخاص بـ Next Gen Devs 🤖. يسعدني مساعدتك في الاستفسار عن خدماتنا، مشاريعنا، أو الاتصال بنا مباشرة على رقم الواتساب: 01020451206.`;
    }
    return `I am the AI Assistant for Next Gen Devs Studio 🤖. I can assist you with our services, portfolio projects, or connecting with us directly via WhatsApp: 01020451206.`;
  };

  const handleSend = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Send request to Val.town Gemini server
      const res = await fetch(valTownUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          siteContent: content,
          projects: projects
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply || generateDynamicFirebaseReply(userText),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Val.town offline');
      }
    } catch (err) {
      // Dynamic Intelligent Firebase Response if Val.town server is updating
      setTimeout(() => {
        const botReply = generateDynamicFirebaseReply(userText);
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 400);
    } finally {
      setIsLoading(false);
    }
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
                  <p className="text-[9px] text-[#a1a1aa] uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    FIREBASE TRAINED AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#262626] transition-colors cursor-pointer"
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
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? theme === 'dark'
                          ? 'bg-[#ffffff] text-[#000000] rounded-tr-none font-bold'
                          : 'bg-[#000000] text-[#ffffff] rounded-tr-none font-bold'
                        : theme === 'dark'
                        ? 'bg-[#181818] text-[#d4d4d8] border border-[#262626] rounded-tl-none'
                        : 'bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed font-sans whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className="text-[8px] text-[#71717a] mt-1 font-mono">{msg.time}</span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Next Gen AI is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Bar (No fixed question chips) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 flex items-center gap-2 bg-[#000000]"
            >
              <input
                type="text"
                placeholder="تحدث معي أو اسأل عن خدماتنا ومشاريعنا..."
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
                disabled={isLoading}
                className="p-2.5 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#e5e5e5] transition-all cursor-pointer shadow-lg disabled:opacity-50"
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
