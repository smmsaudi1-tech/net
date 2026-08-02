import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Phone, MessageSquare, Video } from 'lucide-react';
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

  return (
    <section
      id="contact"
      className={`py-32 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Headline */}
        <div className="space-y-6 max-w-5xl">
          <p
            className={`text-[10px] font-mono tracking-[0.4em] uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            {getText('contact.tag', '// START A PROJECT')}
          </p>

          <h2 className="text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans leading-none">
            {getText('contact.h1_1', 'LET’S BUILD')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500">
              {getText('contact.h1_2', 'WHAT’S NEXT.')}
            </span>
          </h2>

          <p
            className={`text-base sm:text-2xl font-sans font-medium max-w-2xl ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            {getText('contact.desc', 'Have an idea? Let’s turn it into something people remember.')}
          </p>
        </div>

        {/* Contact Form & Direct Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  className={`text-[10px] font-mono tracking-widest uppercase block mb-2 ${
                    theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                  }`}
                >
                  YOUR NAME //
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none transition-colors ${
                    theme === 'dark'
                      ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff] focus:border-[#ffffff]'
                      : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-[#000000]'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`text-[10px] font-mono tracking-widest uppercase block mb-2 ${
                    theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                  }`}
                >
                  YOUR EMAIL OR PHONE //
                </label>
                <input
                  type="text"
                  placeholder="01020451206 / john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none transition-colors ${
                    theme === 'dark'
                      ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff] focus:border-[#ffffff]'
                      : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-[#000000]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                className={`text-[10px] font-mono tracking-widest uppercase block mb-2 ${
                  theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
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
                className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff] focus:border-[#ffffff]'
                    : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-[#000000]'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-5 rounded-2xl font-mono text-xs font-black tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.01] cursor-pointer shadow-2xl ${
                submitted
                  ? 'bg-emerald-500 text-black'
                  : theme === 'dark'
                  ? 'bg-[#ffffff] text-[#000000] hover:bg-[#e5e5e5]'
                  : 'bg-[#000000] text-[#ffffff] hover:bg-[#18181b]'
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>REDIRECTING TO WHATSAPP...</span>
                </>
              ) : (
                <>
                  <span>{getText('contact.submit', 'START A PROJECT →')}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Direct Details */}
          <div className="lg:col-span-4 space-y-8 font-mono text-xs">
            <div className="p-8 rounded-3xl border border-[#262626] bg-[#0d0d0d] space-y-6">
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase">DIRECT CONTACT</span>
              <h4 className="text-xl font-bold text-white font-sans">Next Gen Devs Studio</h4>
              <p className="text-zinc-400 leading-relaxed">
                Reach out directly via Call, WhatsApp, or TikTok to start your project.
              </p>
              
              <div className="pt-2 text-zinc-200 space-y-4 font-mono">
                <a
                  href={`tel:${phoneNum}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">CALL NUMBER</div>
                    <div className="font-bold">{phoneNum}</div>
                  </div>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">WHATSAPP</div>
                    <div className="font-bold">{phoneNum}</div>
                  </div>
                </a>

                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  <Video className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">TIKTOK OFFICIAL</div>
                    <div className="font-bold">@nextgendevs</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
