import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Settings } from 'lucide-react';

export const MinimalFooter: React.FC = () => {
  const { theme } = useTheme();
  const { getText, setAdminOpen } = useSiteContent();

  return (
    <footer
      className={`py-16 border-t font-mono text-left transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Brand & Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/2.png"
            alt="Next Gen Devs Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="space-y-1">
            <h4 className="text-base font-black tracking-[0.2em] uppercase font-sans">
              {getText('brand.name', 'NEXT GEN DEVS')}
            </h4>
            <p
              className={`text-[11px] tracking-widest uppercase ${
                theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
              }`}
            >
              {getText('footer.sub', 'WE BUILD WHAT’S NEXT.')}
            </p>
          </div>
        </div>

        {/* Center Social Links & CMS Admin Trigger */}
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

          <button
            onClick={() => setAdminOpen(true)}
            className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>EDIT FIREBASE CMS</span>
          </button>
        </div>

        {/* Right Copyright */}
        <div
          className={`text-[11px] uppercase tracking-widest ${
            theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
          }`}
        >
          {getText('footer.rights', '© 2026 NEXT GEN DEVS. ALL RIGHTS RESERVED.')}
        </div>

      </div>
    </footer>
  );
};
