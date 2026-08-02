import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const MinimalFooter: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-16 border-t font-mono text-left transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Brand */}
        <div className="space-y-2">
          <h4 className="text-base font-black tracking-[0.25em] uppercase font-sans">
            NEXT GEN DEVS
          </h4>
          <p
            className={`text-[11px] tracking-widest uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            WE BUILD WHAT’S NEXT.
          </p>
        </div>

        {/* Center Social Links */}
        <div
          className={`flex flex-wrap items-center gap-6 text-xs uppercase font-bold tracking-widest ${
            theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
          }`}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            data-cursor="INSTAGRAM"
          >
            Instagram
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            data-cursor="GITHUB"
          >
            GitHub
          </a>
          <a
            href="https://wa.me/201099887766"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            data-cursor="WHATSAPP"
          >
            WhatsApp
          </a>
          <a
            href="mailto:contact@nextgendevs.studio"
            className="hover:opacity-70 transition-opacity"
            data-cursor="EMAIL"
          >
            Email
          </a>
        </div>

        {/* Right Copyright */}
        <div
          className={`text-[11px] uppercase tracking-widest ${
            theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
          }`}
        >
          © 2026 NEXT GEN DEVS
        </div>

      </div>
    </footer>
  );
};
