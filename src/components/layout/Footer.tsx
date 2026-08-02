import React from 'react';
import { useAgency } from '../../store/agencyContext';
import { Code2, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsAdminOpen } = useAgency();

  return (
    <footer className="bg-[#05070c] border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-extrabold text-slate-100 text-sm font-mono">
              NextGen <span className="text-cyan-400">Devs</span> Studio
            </p>
            <p className="text-[11px] text-slate-400">
              استوديو تصميم وتطوير المواقع والمتاجر الإلكترونية للبراندات والمطاعم
            </p>
          </div>
        </div>

        {/* Social Links: TikTok, WhatsApp, Call 01020451206 */}
        <div className="flex items-center gap-4 font-bold text-slate-300">
          <a href="https://www.tiktok.com/@nextgen.devs?_r=1&_t=ZS-98YLToHbraS" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            TikTok
          </a>
          <span>•</span>
          <a href="https://wa.me/201020451206" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
            WhatsApp (01020451206)
          </a>
          <span>•</span>
          <a href="tel:01020451206" className="hover:text-emerald-400 transition-colors">
            اتصال: 01020451206
          </a>
        </div>

        {/* Admin Link & Copyright */}
        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>لوحة تحكم الأدمن (CMS)</span>
          </button>
          <span>© 2026 NextGen Devs. جميع الحقوق محفوظة.</span>
        </div>

      </div>
    </footer>
  );
};
