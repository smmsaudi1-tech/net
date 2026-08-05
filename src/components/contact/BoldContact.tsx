import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Phone, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { soundEngine } from '../../utils/audioEngine';

// Authentic WhatsApp SVG Brand Logo
const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
);

// Authentic TikTok Chromatic Offset SVG Brand Logo
const TikTokLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.12V9.4a6.27 6.27 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.82 4.48 6.23 6.23 0 001.82-4.48V9.28a8.26 8.26 0 004.95 1.62v-3.45a4.85 4.85 0 01-1-.76z" />
  </svg>
);

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
      className={`py-20 sm:py-32 border-b transition-colors duration-500 relative text-left overflow-hidden select-none ${
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
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-10 space-y-10 sm:space-y-16 relative z-10"
      >
        
        {/* Headline Header */}
        <div className="space-y-4 sm:space-y-6 max-w-5xl">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <p
              className={`text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase ${
                theme === 'dark' ? 'text-[#71717a]' : 'text-[#71717a]'
              }`}
            >
              {getText('contact.tag', '// START A PROJECT')}
            </p>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-3xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans leading-none">
            {getText('contact.h1_1', 'LET’S BUILD')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500">
              {getText('contact.h1_2', 'WHAT’S NEXT.')}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-xs sm:text-2xl font-sans font-medium max-w-2xl ${
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

          {/* ULTRA AUTHENTIC DIRECT CONTACT HUB CARD */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 font-mono text-xs">
            <div
              className={`p-8 rounded-[2.5rem] border transition-all duration-500 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-2xl group/card ${
                theme === 'dark'
                  ? 'bg-[#0a0a10] border-[#222238] shadow-[0_25px_60px_rgba(0,0,0,0.9)]'
                  : 'bg-white border-[#e2e8f0] shadow-2xl'
              }`}
            >
              {/* Top Dynamic Brand Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#25D366] via-[#06b6d4] to-[#ff0050]" />
              
              {/* Ambient Glows */}
              <div className="absolute -top-24 -right-24 w-52 h-52 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none group-hover/card:bg-[#25D366]/25 transition-all duration-700" />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full bg-[#ff0050]/15 blur-3xl pointer-events-none group-hover/card:bg-[#ff0050]/25 transition-all duration-700" />

              {/* AUTHENTIC BRAND ACTION BUTTONS */}
              <div className="space-y-4 pt-1">
                
                {/* 01 — AUTHENTIC WHATSAPP BRAND BUTTON */}
                <motion.a
                  whileHover={{ y: -4, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => soundEngine.playClick()}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="WHATSAPP"
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-[#0d1f16]/90 border-[#25D366]/40 hover:border-[#25D366] shadow-[0_0_25px_rgba(37,211,102,0.15)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] group/btn"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Authentic WhatsApp Green Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover/btn:scale-110 transition-transform">
                      <WhatsAppLogo className="w-7 h-7 fill-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#25D366] uppercase">
                          WHATSAPP OFFICIAL
                        </span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 font-bold">
                          ONLINE
                        </span>
                      </div>
                      <div className="font-bold text-base text-white group-hover/btn:text-[#25D366] transition-colors">
                        {phoneNum}
                      </div>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-[#25D366] text-black font-bold text-[11px] flex items-center gap-1 shadow-md shadow-[#25D366]/20 group-hover/btn:scale-105 transition-all">
                    <span>CHAT NOW</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </motion.a>

                {/* 02 — AUTHENTIC PHONE CALL BRAND BUTTON */}
                <motion.a
                  whileHover={{ y: -4, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => soundEngine.playClick()}
                  href={`tel:${phoneNum}`}
                  data-cursor="CALL"
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-[#0b1c24]/90 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] group/btn"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Authentic Cyan Phone Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover/btn:scale-110 transition-transform">
                      <Phone className="w-6 h-6 fill-white stroke-none" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                          24/7 DIRECT CALL
                        </span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                          VOICE
                        </span>
                      </div>
                      <div className="font-bold text-base text-white group-hover/btn:text-cyan-300 transition-colors">
                        {phoneNum}
                      </div>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-cyan-400 text-black font-bold text-[11px] flex items-center gap-1 shadow-md shadow-cyan-500/20 group-hover/btn:scale-105 transition-all">
                    <span>CALL NOW</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </motion.a>

                {/* 03 — AUTHENTIC TIKTOK BRAND BUTTON */}
                <motion.a
                  whileHover={{ y: -4, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => soundEngine.playClick()}
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="TIKTOK"
                  className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-[#1e0a14]/90 border-pink-500/40 hover:border-pink-400 shadow-[0_0_25px_rgba(255,0,80,0.15)] hover:shadow-[0_0_40px_rgba(255,0,80,0.4)] group/btn"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Authentic Black/Pink/Cyan TikTok Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-black border border-zinc-800 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover/btn:scale-110 transition-transform relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0050]/20 to-[#00f2fe]/20" />
                      <TikTokLogo className="w-6 h-6 fill-white relative z-10 filter drop-shadow-[2px_0_0_#ff0050] drop-shadow-[-2px_0_0_#00f2fe]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-pink-400 uppercase">
                          TIKTOK OFFICIAL
                        </span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                          DEMOS
                        </span>
                      </div>
                      <div className="font-bold text-base text-white group-hover/btn:text-pink-300 transition-colors">
                        @nextgendevs
                      </div>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff0050] to-[#00f2fe] text-white font-bold text-[11px] flex items-center gap-1 shadow-md shadow-pink-500/20 group-hover/btn:scale-105 transition-all">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </motion.a>

              </div>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};
