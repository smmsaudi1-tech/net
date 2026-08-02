import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';

export const MinimalFooter: React.FC = () => {
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const phoneNum = getText('contact.phone', '01020451206');
  const waUrl = getText('contact.whatsapp_url', 'https://wa.me/201020451206');
  const tiktokUrl = getText('contact.tiktok_url', 'https://www.tiktok.com/@nextgen.devs?_r=1&_t=ZS-98YLToHbraS');

  return (
    <footer
      className={`py-16 border-t font-mono text-left transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Brand & Circular Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/2.png"
            alt="Next Gen Devs Logo"
            className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
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

        {/* Center TikTok & Phone & WhatsApp Links */}
        <div
          className={`flex flex-wrap items-center gap-6 text-xs uppercase font-bold tracking-widest ${
            theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
          }`}
        >
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            data-cursor="TIKTOK"
          >
            TikTok
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
            data-cursor="WHATSAPP"
          >
            WhatsApp ({phoneNum})
          </a>
          <a
            href={`tel:${phoneNum}`}
            className="hover:text-emerald-400 transition-colors"
            data-cursor="CALL"
          >
            Call: {phoneNum}
          </a>
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
