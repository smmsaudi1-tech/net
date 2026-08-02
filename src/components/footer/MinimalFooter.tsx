import React from 'react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="py-16 bg-[#000000] border-t border-[#181818] font-mono text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Brand */}
        <div className="space-y-2">
          <h4 className="text-base font-black tracking-[0.25em] text-[#ffffff] uppercase font-sans">
            NEXT GEN DEVS
          </h4>
          <p className="text-[11px] text-[#525252] tracking-widest uppercase">
            WE BUILD WHAT’S NEXT.
          </p>
        </div>

        {/* Center Social Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-[#a3a3a3] uppercase font-bold tracking-widest">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffffff] transition-colors"
            data-cursor="INSTAGRAM"
          >
            Instagram
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffffff] transition-colors"
            data-cursor="GITHUB"
          >
            GitHub
          </a>
          <a
            href="https://wa.me/201099887766"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffffff] transition-colors"
            data-cursor="WHATSAPP"
          >
            WhatsApp
          </a>
          <a
            href="mailto:contact@nextgendevs.studio"
            className="hover:text-[#ffffff] transition-colors"
            data-cursor="EMAIL"
          >
            Email
          </a>
        </div>

        {/* Right Copyright */}
        <div className="text-[11px] text-[#525252] uppercase tracking-widest">
          © 2026 NEXT GEN DEVS
        </div>

      </div>
    </footer>
  );
};
