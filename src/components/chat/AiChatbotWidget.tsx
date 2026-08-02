import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2, MessageCircle, ExternalLink } from 'lucide-react';
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
  showWaBtn?: boolean;
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
      text: 'أهلاً بك! أنا مساعد الذكاء الاصطناعي لشركة Next Gen Devs 🤖. كيف يمكنني مساعدتك في تطوير مشروعك الرقمي اليوم؟\n\n📱 رقم الواتساب: 01020451206\n🔗 رابط التواصل المباشر: https://wa.me/201020451206',
      time: 'Just now',
      showWaBtn: true
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
  const generateDynamicFirebaseReply = (userQuery: string): { reply: string; showWaBtn: boolean } => {
    const query = userQuery.toLowerCase();
    const isArabic = /[\u0600-\u06FF]/.test(userQuery);
    const phone = content['contact.phone'] || '01020451206';

    // 1. Check for Services
    if (query.includes('خدمة') || query.includes('خدمات') || query.includes('تعملوا ايه') || query.includes('بتعملوا') || query.includes('service') || query.includes('offer')) {
      const srv1 = content['srv1.title'] || 'WEB DEVELOPMENT';
      const srv2 = content['srv2.title'] || 'E-COMMERCE STORES';
      const srv3 = content['srv3.title'] || 'CUSTOM AI & SaaS PLATFORMS';
      if (isArabic) {
        return {
          reply: `نحن في Next Gen Devs نقدم الخدمات الرقمية التالية:\n• ${srv1}\n• ${srv2}\n• ${srv3}\n• تصميم أنظمة الواجهات UI/UX والتطبيقات الذكية.\n\n📱 رقم الواتساب: ${phone}\n🔗 رابط التواصل المباشر: https://wa.me/201020451206`,
          showWaBtn: true
        };
      }
      return {
        reply: `At Next Gen Devs we offer:\n• ${srv1}\n• ${srv2}\n• ${srv3}\n• Custom UI/UX Design Systems & AI Automations.\n\n📱 WhatsApp: ${phone}\n🔗 Direct Chat: https://wa.me/201020451206`,
        showWaBtn: true
      };
    }

    // 2. Check for Projects / Portfolio
    if (query.includes('مشروع') || query.includes('مشاريع') || query.includes('اعمال') || query.includes('سابق') || query.includes('project') || query.includes('work') || query.includes('portfolio')) {
      if (projects.length > 0) {
        const titles = projects.map(p => `• ${p.title} (${p.category})`).join('\n');
        if (isArabic) {
          return {
            reply: `إليك المشاريع الحالية المتاحة في معارضنا:\n${titles}\nيمكنك تصفحها بالكامل في قسم SELECTED WORK.\n\n📱 رقم الواتساب: ${phone}\n🔗 رابط التواصل المباشر: https://wa.me/201020451206`,
            showWaBtn: true
          };
        }
        return {
          reply: `Here are our live projects:\n${titles}\nYou can explore them in our Selected Work section.\n\n📱 WhatsApp: ${phone}\n🔗 Direct Chat: https://wa.me/201020451206`,
          showWaBtn: true
        };
      }
      if (isArabic) {
        return {
          reply: `جميع مشاريعنا يتم تحديثها ومزامنتها حياً من الفيربيز في قسم SELECTED WORK!\n\n📱 رقم الواتساب: ${phone}\n🔗 رابط التواصل المباشر: https://wa.me/201020451206`,
          showWaBtn: true
        };
      }
      return {
        reply: `Our live portfolio projects are continuously updated in our Selected Work section!\n\n📱 WhatsApp: ${phone}\n🔗 Direct Chat: https://wa.me/201020451206`,
        showWaBtn: true
      };
    }

    // 3. Check for Contact / Starting a Project / Phone
    if (query.includes('تواصل') || query.includes('رقم') || query.includes('واتس') || query.includes('سعر') || query.includes('تكلفة') || query.includes('شغل') || query.includes('contact') || query.includes('start') || query.includes('phone')) {
      if (isArabic) {
        return {
          reply: `يمكنك التواصل معنا فوراً لبدء مشروعك:\n📱 رقم الواتساب: 01020451206\n🔗 رابط التواصل المباشر: https://wa.me/201020451206`,
          showWaBtn: true
        };
      }
      return {
        reply: `You can reach out to us directly:\n📱 WhatsApp: 01020451206\n🔗 Direct Chat: https://wa.me/201020451206`,
        showWaBtn: true
      };
    }

    // 4. Greetings
    if (query.includes('ازيك') || query.includes('السلام') || query.includes('مرحبا') || query.includes('أهلا') || query.includes('اهلين') || query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      if (isArabic) {
        return {
          reply: `أهلاً وسهلاً بك يا فنان! الحمد لله بكل خير. كيف يمكنني مساعدتك في تطوير موقعك أو متجرك الإلكتروني مع Next Gen Devs اليوم؟\n\n📱 رقم الواتساب: 01020451206\n🔗 رابط التواصل المباشر: https://wa.me/201020451206`,
          showWaBtn: true
        };
      }
      return {
        reply: `Hello! How can I assist you with building your web project with Next Gen Devs today?\n\n📱 WhatsApp: 01020451206\n🔗 Direct Chat: https://wa.me/201020451206`,
        showWaBtn: true
      };
    }

    // Default polite response
    if (isArabic) {
      return {
        reply: `أنا مساعد الذكاء الاصطناعي الخاص بـ Next Gen Devs 🤖. يسعدني مساعدتك في الاستفسار عن خدماتنا ومشاريعنا:\n\n📱 رقم الواتساب: 01020451206\n🔗 رابط التواصل المباشر: https://wa.me/201020451206`,
        showWaBtn: true
      };
    }
    return {
      reply: `I am the AI Assistant for Next Gen Devs Studio 🤖. How can I assist you today?\n\n📱 WhatsApp: 01020451206\n🔗 Direct Chat: https://wa.me/201020451206`,
      showWaBtn: true
    };
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
        const replyText = data.reply || data.text || generateDynamicFirebaseReply(userText).reply;
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showWaBtn: replyText.includes('wa.me') || replyText.includes('01020451206') || true
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Val.town offline');
      }
    } catch (err) {
      setTimeout(() => {
        const generated = generateDynamicFirebaseReply(userText);
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: generated.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showWaBtn: generated.showWaBtn
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
            className={`absolute bottom-16 right-0 w-[340px] sm:w-[400px] h-[500px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl ${
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
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-none text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl space-y-3 ${
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

                    {/* Interactive WhatsApp CTA Button */}
                    {msg.sender === 'bot' && msg.showWaBtn && (
                      <a
                        href="https://wa.me/201020451206"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer font-mono"
                      >
                        <MessageCircle className="w-4 h-4 fill-black" />
                        <span>محادثة مباشرة على WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
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
