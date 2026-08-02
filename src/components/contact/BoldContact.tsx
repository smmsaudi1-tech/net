import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const BoldContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const waMsg = `Hi Next Gen Devs!%0AFrom: ${name}%0AContact: ${email}%0AIdea: ${idea}`;
    const waUrl = `https://wa.me/201099887766?text=${waMsg}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="py-32 bg-[#000000] border-b border-[#181818] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Huge Bold Headline */}
        <div className="space-y-6 max-w-5xl">
          <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase">
            // START A PROJECT
          </p>

          <h2 className="text-5xl sm:text-8xl lg:text-9xl font-black text-[#ffffff] tracking-tighter uppercase font-sans leading-none">
            LET’S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#a3a3a3] to-[#525252]">
              WHAT’S NEXT.
            </span>
          </h2>

          <p className="text-base sm:text-2xl text-[#a3a3a3] font-sans font-medium max-w-2xl">
            Have an idea? Let’s turn it into something people remember.
          </p>
        </div>

        {/* Contact Form & Direct Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-mono text-[#525252] tracking-widest uppercase block mb-2">
                  YOUR NAME //
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-[#0d0d0d] border border-[#262626] rounded-2xl text-xs text-[#ffffff] font-mono focus:border-[#ffffff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#525252] tracking-widest uppercase block mb-2">
                  YOUR EMAIL OR PHONE //
                </label>
                <input
                  type="text"
                  placeholder="john@example.com / +2010..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-[#0d0d0d] border border-[#262626] rounded-2xl text-xs text-[#ffffff] font-mono focus:border-[#ffffff] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#525252] tracking-widest uppercase block mb-2">
                YOUR IDEA / PROJECT SCOPE //
              </label>
              <textarea
                placeholder="Tell us about your brand, website, or custom web application..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                required
                className="w-full px-5 py-4 bg-[#0d0d0d] border border-[#262626] rounded-2xl text-xs text-[#ffffff] font-mono focus:border-[#ffffff] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-10 py-5 rounded-full bg-[#ffffff] text-[#000000] font-mono text-xs font-black tracking-[0.25em] uppercase flex items-center gap-3 hover:bg-[#e5e5e5] transition-all hover:scale-105 cursor-pointer shadow-2xl"
              data-cursor="SUBMIT"
            >
              <span>START A PROJECT →</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>

            {submitted && (
              <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-[#262626] text-xs font-mono text-[#ffffff] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffffff]" />
                <span>Redirecting to WhatsApp to initiate project briefing...</span>
              </div>
            )}
          </form>

          {/* Direct Details */}
          <div className="lg:col-span-4 space-y-8 text-left font-mono">
            <div>
              <p className="text-[10px] text-[#525252] tracking-widest uppercase mb-1">DIRECT INQUIRIES</p>
              <p className="text-sm font-bold text-[#ffffff]">contact@nextgendevs.studio</p>
            </div>

            <div>
              <p className="text-[10px] text-[#525252] tracking-widest uppercase mb-1">WHATSAPP / PHONE</p>
              <p className="text-sm font-bold text-[#ffffff]">+20 109 988 7766</p>
            </div>

            <div>
              <p className="text-[10px] text-[#525252] tracking-widest uppercase mb-1">STUDIO LOCATION</p>
              <p className="text-xs text-[#a3a3a3]">Global Remote / Digital Studio 2026</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
