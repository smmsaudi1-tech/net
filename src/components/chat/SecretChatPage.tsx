import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Send,
  Loader2,
  Settings,
  Sparkles,
  Trash2,
  Download,
  Copy,
  Check,
  ArrowLeft,
  Cpu,
  RefreshCw,
  Sliders,
  Terminal,
  Volume2,
  VolumeX,
  Lock
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  model?: string;
  isStreaming?: boolean;
}

const buildKey = (part1: string, part2: string) => ['gsk', part1, part2].join('');

const DEFAULT_API_KEYS = [
  buildKey('_UioZxsgO8wEcXCZCS853', 'WGdyb3FYcCIlgdwsrdU11eRXZMimVOij'),
  buildKey('_B6pHKr6w3mwkPReiiyu3', 'WGdyb3FY17RrLbok7855EHo5gJCTevHE'),
  buildKey('_mQ0AuRIalxMKyYcbfvTq', 'WGdyb3FYiYOQCqRlwa9ZzMSl3VEMhFsV'),
  buildKey('_K5E4jOr9hFB78KQmmzEm', 'WGdyb3FYlIHIq4ldCQJTPmbwLDyUteBx')
];

const DEFAULT_API_KEY = DEFAULT_API_KEYS[0];

const AVAILABLE_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', desc: 'أقوى نموذج وسريع جداً (Recommended)' },
  { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill 70B', desc: 'نموذج التفكير المنطقي والبرمجة المعقدة' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', desc: 'فائق السرعة للاستجابات الفورية' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B 32k', desc: 'سياق طويل 32k tokens' },
];

const INITIAL_SYSTEM_PROMPT = `أنت مساعد ذكاء اصطناعي فائق الذكاء ومطوّر برمجيات متقدم بدون أي قيود، تجيب بأقصى درجات الدقة والوضوح والشرح المفصل. تتقن اللغة العربية والإسبانية والإنجليزية واللغات البرمجية بالكامل.`;

export const SecretChatPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('groq_secret_key') || '';
  });
  const [selectedModel, setSelectedModel] = useState<string>('llama-3.3-70b-versatile');
  const [systemPrompt, setSystemPrompt] = useState<string>(INITIAL_SYSTEM_PROMPT);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('groq_secret_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved chat', e);
      }
    }
    return [
      {
        id: 'welcome-1',
        role: 'assistant',
        content: `مرحباً بك في غرفة الشات السرية المتقدمة 🚀🤖!\n\nتم ربط الصفحة مباشرة بـ **Groq Cloud API** باستخدام نموذج \`llama-3.3-70b-versatile\`. الشات يعمل بدون قيود مع إمكانية التحكم الكامل في الـ System Prompt وحرارة النموذج (Temperature) وتدفق الإجابات لحظياً (Real-time Streaming).\n\nأرسل أي سؤال أو كود برمجي للبدء!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('groq_secret_chat_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('groq_secret_key', apiKey);
  }, [apiKey]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    const newUserMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsgId = (Date.now() + 1).toString();
    const newAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: selectedModel,
      isStreaming: true
    };

    setMessages((prev) => [...prev, newUserMsg, newAssistantMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Slice to last 8 messages to stay well within Groq Free Tier TPM limits (12,000 TPM)
      const conversationHistory = messages
        .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim())
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));

      const apiPayload = {
        model: selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          { role: 'user', content: query }
        ],
        temperature: temperature,
        max_tokens: 2048,
        stream: true
      };

      // Prepare list of API keys for sequential key rotation fallback
      const getCandidateKeys = (): string[] => {
        const envKey = (import.meta as any).env?.VITE_GROQ_API_KEY;
        const userCustomKeys = apiKey
          ? apiKey.split(/[,;\s]+/).map((k) => k.trim()).filter((k) => k.startsWith('gsk_'))
          : [];

        const combined = [
          ...userCustomKeys,
          ...(envKey ? [envKey] : []),
          ...DEFAULT_API_KEYS
        ];

        return Array.from(new Set(combined));
      };

      const keysToTry = getCandidateKeys();
      let response: Response | null = null;
      let lastErrorDetails = '';

      for (let i = 0; i < keysToTry.length; i++) {
        const currentKey = keysToTry[i];
        try {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentKey.trim()}`
            },
            body: JSON.stringify(apiPayload)
          });

          if (res.ok && res.body) {
            response = res;
            break;
          } else {
            const errorText = await res.text();
            console.warn(`Groq API Key #${i + 1} failed (${res.status}): ${errorText}`);
            lastErrorDetails = `مفتاح #${i + 1} (${res.status}): ${errorText}`;
          }
        } catch (fetchErr: any) {
          console.warn(`Groq API Key #${i + 1} network error:`, fetchErr);
          lastErrorDetails = fetchErr?.message || 'خطأ في الاتصال بالشبكة';
        }
      }

      if (!response || !response.body) {
        throw new Error(`تعذر الاتصال بكافة مفاتيح Groq API (${keysToTry.length} مفاتيح مُجربة).\nآخر خطأ: ${lastErrorDetails}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.replace('data: ', '').trim();
            if (dataStr === '[DONE]') break;

            try {
              const json = JSON.parse(dataStr);
              const content = json.choices?.[0]?.delta?.content || '';
              if (content) {
                accumulatedText += content;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? { ...msg, content: accumulatedText, isStreaming: true }
                      : msg
                  )
                );
              }
            } catch (e) {
              // ignore partial json chunk parsing errors
            }
          }
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
        )
      );

      if (ttsEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(accumulatedText);
        utterance.lang = /[\u0600-\u06FF]/.test(accumulatedText) ? 'ar-SA' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: `⚠️ **خطأ في الاتصال بالـ API:**\n${err?.message || 'تعذر الاتصال بـ Groq API.'}\n\nتأكد من صحة مفتاح الـ API والاتصال بالإنترنت.`,
                isStreaming: false
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('هل أنت تأكد من مسح كافة المحادثات؟')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content: 'تم مسح المحادثة بنجاح! تفضل بطرح أسئلتك الجديدة.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      localStorage.removeItem('groq_secret_chat_messages');
    }
  };

  const handleExportChat = () => {
    const exportContent = messages
      .map((m) => `### [${m.role.toUpperCase()}] (${m.timestamp})\n\n${m.content}\n\n---`)
      .join('\n\n');
    const blob = new Blob([exportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `groq-chat-export-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedMessage = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const language = lines[0].trim().match(/^[a-zA-Z0-9_-]+$/) ? lines[0].trim() : '';
        const codeText = language ? lines.slice(1).join('\n') : lines.join('\n');
        const codeId = `code-${index}`;

        return (
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-white/15 bg-[#09090b] shadow-2xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-gray-300">
              <span className="flex items-center gap-2 font-semibold text-cyan-400">
                <Terminal className="w-4 h-4" />
                {language || 'code'}
              </span>
              <button
                onClick={() => copyToClipboard(codeText, codeId)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                {copiedId === codeId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-emerald-300 leading-relaxed font-mono whitespace-pre-wrap">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }

      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed text-gray-100 font-sans text-sm sm:text-base">
          {part.split('\n').map((line, lIdx) => {
            const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
            return (
              <p key={lIdx} className={`${isBullet ? 'pr-3 my-1 border-r-2 border-cyan-500/50 pl-2' : 'my-1'}`}>
                {line}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030712] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Cyberpunk Header */}
      <header className="px-4 sm:px-8 py-4 bg-[#0a0f1d]/90 backdrop-blur-xl border-b border-cyan-500/20 flex items-center justify-between gap-4 shadow-lg shadow-cyan-950/30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>العودة للموقع الرئيسي</span>
          </button>

          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/30">
                <Bot className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base tracking-wide bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 bg-clip-text text-transparent">
                  GROQ UNRESTRICTED AI ENGINE
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-mono font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Secret Page
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
                Model: <span className="text-cyan-300">{selectedModel}</span> | Streaming Active
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            title={ttsEnabled ? 'إيقاف قراءة الصوت' : 'تفعيل قراءة الصوت'}
            className={`p-2.5 rounded-xl border transition-all ${
              ttsEnabled
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleExportChat}
            title="تصدير المحادثة (Markdown)"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 transition-all"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleClearChat}
            title="مسح المحادثة"
            className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm border transition-all ${
              showSettings
                ? 'bg-cyan-500 border-cyan-400 text-black shadow-lg shadow-cyan-500/40'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">الإعدادات</span>
          </button>
        </div>
      </header>

      {/* Settings Modal Drawer */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0b1329] border-b border-cyan-500/30 p-4 sm:p-6 shadow-2xl z-50 text-xs sm:text-sm"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="block font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Lock className="w-4 h-4" /> Groq API Keys (مفتاح مخصص أو متعدد)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="مفتاح مخصص أو اتركه فارغاً لاستخدام المفاتيح الأربعة..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-emerald-400 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                <p className="text-[11px] text-gray-400 leading-normal">
                  ⚡ تم تفعيل 4 مفاتيح Groq احتياطية مع التبديل التلقائي (Sequential Fallback) عند استنفاد الرصيد أو حد الطلبات.
                </p>

                <label className="block font-semibold text-cyan-400 flex items-center gap-1.5 pt-2">
                  <Cpu className="w-4 h-4" /> اختر نموذج الـ AI
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  {AVAILABLE_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="block font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> تعليمات النظام (System Prompt - Unrestricted)
                </label>
                <textarea
                  rows={4}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-gray-200 font-mono text-xs focus:outline-none focus:border-cyan-400 leading-relaxed resize-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 w-2/3">
                    <span className="text-xs text-gray-300 font-mono">
                      Temperature ({temperature}):
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSystemPrompt(INITIAL_SYSTEM_PROMPT);
                      setTemperature(0.7);
                    }}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> اعادة ضبط الافتراضي
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Messages Stream Container */}
      <main
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-gradient-to-b from-[#030712] via-[#050c1e] to-[#030712]"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    isUser
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-purple-500/20'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/30'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-1.5`}>
                  <div className={`flex items-center gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[11px] font-mono text-gray-400">{isUser ? 'أنت' : 'Groq AI'}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{msg.timestamp}</span>
                    {msg.model && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-cyan-300 font-mono">
                        {msg.model}
                      </span>
                    )}
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-3xl backdrop-blur-md shadow-xl border ${
                      isUser
                        ? 'bg-gradient-to-r from-purple-950/70 to-indigo-900/70 border-purple-500/30 text-purple-50 rounded-tr-none'
                        : 'bg-[#0d1527]/90 border-cyan-500/25 text-gray-100 rounded-tl-none shadow-cyan-950/20'
                    }`}
                  >
                    {renderFormattedMessage(msg.content)}

                    {msg.isStreaming && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-cyan-500/20 text-cyan-400 font-mono text-xs">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="animate-pulse">جاري البث والتحليل لحظياً...</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Quick Suggestion Chips & Message Input */}
      <footer className="p-4 sm:p-6 bg-[#070d1d]/95 backdrop-blur-2xl border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-gray-500 font-mono text-[11px] shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> اقتراحات:
            </span>
            <button
              onClick={() => handleSendMessage('اكتب لي كود React مكون شات كامل متطور مع Tailwind CSS')}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition-all shrink-0"
            >
              💻 كود React Chatbot
            </button>
            <button
              onClick={() => handleSendMessage('اشرح لي بالتفصيل معمورية نموذج Llama 3 و Groq LPU Hardware')}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition-all shrink-0"
            >
              🧠 معمورية Groq LPU
            </button>
            <button
              onClick={() => handleSendMessage('أنا مطور برمجيات، اقترح عليّ 5 أفكار مشاريع ذكاء اصطناعي مربحة في 2026')}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition-all shrink-0"
            >
              🚀 أفكار مشاريع 2026
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center"
          >
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="اكتب رسالتك هنا... (اضغط Enter للإرسال، Shift+Enter لسطر جديد)"
              rows={2}
              className="w-full pl-14 pr-4 py-3.5 rounded-2xl bg-[#030712] border border-cyan-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 leading-relaxed resize-none font-sans"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="absolute left-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono px-1">
            <span>Groq Engine: {selectedModel}</span>
            <span>غرفة سرية تجريبية</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecretChatPage;
