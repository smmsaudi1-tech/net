import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Phone, MessageSquare, Video, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { soundEngine } from '../../utils/audioEngine';

export const BoldContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const phoneNum = getText('contact.phone', '01020451206');
  const waUrl = getText('contact.whatsapp_url', 'https://wa.me/201020451206');
  const tiktokUrl = getText('contact.tiktok_url', 'https://www.tiktok.com/@nextgen.devs?_r=1&_t=ZS-98YLToHbraS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    setSubmitted(true);

    const waMsg = `Hi Next Gen Devs!%0AFrom: ${name}%0AContact: ${email}%0AIdea: ${idea}`;
    const targetUrl = `https://wa.me/201020451206?text=${waMsg}`;

    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section
      id="contact"
      className={`py-32 border-b transition-colors duration-500 relative text-left overflow-hidden select-none ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f7] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      {/* Dynamic Animated Background Aura */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-600/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-cyan-500/15 to-emerald-500/10 blur-[120px]"
        />
        {/* Subtle Cyber Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16 relative z-10"
      >
        
        {/* Headline Header */}
        <div className="space-y-6 max-w-5xl">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <p
              className={`text-[10px] font-mono tracking-[0.4em] uppercase ${
                theme === 'dark' ? 'text-[#71717a]' : 'text-[#71717a]'
              }`}
            >
              {getText('contact.tag', '// START A PROJECT')}
            </p>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans leading-none">
            {getText('contact.h1_1', 'LET’S BUILD')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500">
              {getText('contact.h1_2', 'WHAT’S NEXT.')}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-base sm:text-2xl font-sans font-medium max-w-2xl ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            {getText('contact.desc', 'Have an idea? Let’s turn it into something people remember.')}
          </motion.p>
        </div>

        {/* Contact Form & Direct Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-start">
          
          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="group">
                <label
                  className={`text-[10px] font-mono tracking-widest uppercase block mb-2 transition-colors ${
                    theme === 'dark' ? 'text-[#71717a] group-focus-within:text-emerald-400' : 'text-[#71717a] group-focus-within:text-emerald-600'
                  }`}
                >
                  YOUR NAME //
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none transition-all duration-300 shadow-sm ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0f]/90 border-[#22222a] text-[#ffffff] focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-emerald-600 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    }`}
                  />
                </div>
              </div>

              <div className="group">
                <label
                  className={`text-[10px] font-mono tracking-widest uppercase block mb-2 transition-colors ${
                    theme === 'dark' ? 'text-[#71717a] group-focus-within:text-cyan-400' : 'text-[#71717a] group-focus-within:text-cyan-600'
                  }`}
                >
                  YOUR EMAIL OR PHONE //
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="01020451206 / john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none transition-all duration-300 shadow-sm ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0f]/90 border-[#22222a] text-[#ffffff] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-cyan-600 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    }`}
                  />
                </div>
              </div>

            </div>

            <div className="group">
              <label
                className={`text-[10px] font-mono tracking-widest uppercase block mb-2 transition-colors ${
                  theme === 'dark' ? 'text-[#71717a] group-focus-within:text-indigo-400' : 'text-[#71717a] group-focus-within:text-indigo-600'
                }`}
              >
                YOUR IDEA / PROJECT SCOPE //
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your brand, website, or custom web application..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                required
                className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none transition-all duration-300 shadow-sm ${
                  theme === 'dark'
                    ? 'bg-[#0a0a0f]/90 border-[#22222a] text-[#ffffff] focus:border-indigo-400 focus:shadow-[0_0_25px_rgba(99,102,241,0.2)]'
                    : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-indigo-600 focus:shadow-[0_0_25px_rgba(99,102,241,0.15)]'
                }`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className={`w-full py-5 rounded-2xl font-mono text-xs font-black tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xl relative overflow-hidden group ${
                submitted
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                  : theme === 'dark'
                  ? 'bg-[#ffffff] text-[#000000] hover:bg-gradient-to-r hover:from-emerald-400 hover:via-cyan-400 hover:to-indigo-500 hover:text-white shadow-white/10'
                  : 'bg-[#000000] text-[#ffffff] hover:bg-gradient-to-r hover:from-emerald-600 hover:via-cyan-600 hover:to-indigo-600 shadow-black/20'
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 animate-bounce" />
                  <span>REDIRECTING TO WHATSAPP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>{getText('contact.submit', 'START A PROJECT →')}</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* ULTRA MAGNETIC DIRECT CONTACT CARD */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 font-mono text-xs">
            <div
              className={`p-8 rounded-[2.5rem] border transition-all duration-500 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-2xl group/card ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-[#0e0e14] via-[#09090e] to-[#040406] border-[#222232] shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  : 'bg-gradient-to-b from-white via-slate-50 to-slate-100 border-[#e2e8f0] shadow-xl'
              }`}
            >
              {/* Animated Top Gradient Glow Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 animate-gradient-x" />
              
              {/* Subtle Corner Glow Accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none group-hover/card:bg-emerald-500/20 transition-all duration-700" />

              {/* Card Header & Live Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DIRECT FOUNDER LINE</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>RESPONSE &lt; 5 MINS</span>
                </div>
              </div>

              {/* Card Main Title */}
              <div className="space-y-2">
                <h4 className="text-2xl font-black font-sans tracking-tight">Next Gen Devs Studio</h4>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Connect directly with our lead creative tech engineer. We reply instantly via WhatsApp & Call.
                </p>
              </div>

              {/* MAGNETIC CONTACT ACTION BUTTONS */}
              <div className="space-y-4 pt-2">
                
                {/* 01 — WHATSAPP BUTTON (HIGH CONVERSION) */}
                <motion.a
                  whileHover={{ y: -4, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => soundEngine.playClick()}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="WHATSAPP"
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-gradient-to-r from-emerald-950/40 via-emerald-900/30 to-emerald-950/40 border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] group/btn"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover/btn:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5 fill-emerald-400/20" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                          WHATSAPP CHAT
                        </span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          INSTANT
                        </span>
                      </div>
                      <div className="font-bold text-sm text-white group-hover/btn:text-emerald-300 transition-colors">
                        {phoneNum}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 group-hover/btn:translate-x-1 transition-transform">
                    <span>CHAT NOW</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>

                {/* 02 — DIRECT PHONE CALL BUTTON */}
                <motion.a
                  whileHover={{ y: -4, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => soundEngine.playClick()}
                  href={`tel:${phoneNum}`}
                  data-cursor="CALL"
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-gradient-to-r from-cyan-950/40 via-cyan-900/30 to-cyan-950/40 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] group/btn"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover/btn:scale-110 transition-transform">
                      <Phone className="w-5 h-5 fill-cyan-400/20" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                          24/7 CALL LINE
                        </span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                          VOICE
                        </span>
                      </div>
                      <div className="font-bold text-sm text-white group-hover/btn:text-cyan-300 transition-colors">
                        {phoneNum}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 group-hover/btn:translate-x-1 transition-transform">
                    <span>CALL NOW</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>

                {/* 03 — TIKTOK OFFICIAL SHOWCASE BUTTON */}
                <motion.a
                  whileHover={{ y: -4, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => soundEngine.playClick()}
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="TIKTOK"
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-gradient-to-r from-purple-950/40 via-pink-900/30 to-purple-950/40 border-pink-500/30 hover:border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.35)] group/btn"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400 group-hover/btn:scale-110 transition-transform">
                      <Video className="w-5 h-5 fill-pink-400/20" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-pink-400 uppercase">
                          TIKTOK OFFICIAL
                        </span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                          DEMOS
                        </span>
                      </div>
                      <div className="font-bold text-sm text-white group-hover/btn:text-pink-300 transition-colors">
                        @nextgendevs
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-pink-400 group-hover/btn:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>

              </div>

              {/* Bottom Guarantee Note */}
              <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Zap className="w-3.5 h-3.5 animate-pulse" />
                  FREE CONSULTATION & QUOTE
                </span>
                <span>NO COMMITMENT</span>
              </div>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};
