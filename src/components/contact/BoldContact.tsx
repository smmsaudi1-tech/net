import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { soundEngine } from '../../utils/audioEngine';

export const BoldContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    setSubmitted(true);

    const waMsg = `Hi Next Gen Devs!%0AFrom: ${name}%0AContact: ${email}%0AIdea: ${idea}`;
    const waUrl = `https://wa.me/201099887766?text=${waMsg}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
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
        
        {/* Huge Bold Headline */}
        <div className="space-y-6 max-w-5xl">
          <p
            className={`text-[10px] font-mono tracking-[0.4em] uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            // START A PROJECT
          </p>

          <h2 className="text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans leading-none">
            LET’S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500">
              WHAT’S NEXT.
            </span>
          </h2>

          <p
            className={`text-base sm:text-2xl font-sans font-medium max-w-2xl ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            Have an idea? Let’s turn it into something people remember.
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
                  placeholder="john@example.com / +2010..."
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
                placeholder="Tell us about your brand, website, or custom web application..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                required
                className={`w-full px-5 py-4 rounded-2xl text-xs font-mono border focus:outline-none resize-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff] focus:border-[#ffffff]'
                    : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000] focus:border-[#000000]'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`px-10 py-5 rounded-full font-mono text-xs font-black tracking-[0.25em] uppercase flex items-center gap-3 transition-all hover:scale-105 cursor-pointer shadow-2xl ${
                theme === 'dark'
                  ? 'bg-[#ffffff] text-[#000000] hover:bg-[#e5e5e5]'
                  : 'bg-[#000000] text-[#ffffff] hover:bg-[#18181b]'
              }`}
              data-cursor="SUBMIT"
            >
              <span>START A PROJECT →</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>

            {submitted && (
              <div
                className={`p-4 rounded-2xl border text-xs font-mono flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff]'
                    : 'bg-[#ffffff] border-[#e4e4e7] text-[#000000]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Redirecting to WhatsApp to initiate project briefing...</span>
              </div>
            )}
          </form>

          {/* Direct Details */}
          <div className="lg:col-span-4 space-y-8 text-left font-mono">
            <div>
              <p
                className={`text-[10px] tracking-widest uppercase mb-1 ${
                  theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                }`}
              >
                DIRECT INQUIRIES
              </p>
              <p className="text-sm font-bold">contact@nextgendevs.studio</p>
            </div>

            <div>
              <p
                className={`text-[10px] tracking-widest uppercase mb-1 ${
                  theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                }`}
              >
                WHATSAPP / PHONE
              </p>
              <p className="text-sm font-bold">+20 109 988 7766</p>
            </div>

            <div>
              <p
                className={`text-[10px] tracking-widest uppercase mb-1 ${
                  theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                }`}
              >
                STUDIO LOCATION
              </p>
              <p
                className={`text-xs ${
                  theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
                }`}
              >
                Global Remote / Digital Studio 2026
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
