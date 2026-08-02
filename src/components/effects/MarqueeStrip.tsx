import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Utensils, Zap, Sparkles, ShoppingBag, CreditCard } from 'lucide-react';

export const MarqueeStrip: React.FC = () => {
  const marqueeItems = [
    { text: '👗 براندات الملابس والفاشون الراقية', icon: Shirt },
    { text: '☕ كافيهات ومطاعم المنيو الرقمي QR', icon: Utensils },
    { text: '⚡ سرعة تصفح فائقة 99/100 على Google', icon: Zap },
    { text: '🛒 معارض منتجات 3D تفاعلية', icon: Sparkles },
    { text: '💳 ربط الدفع الإلكتروني وفوري', icon: CreditCard },
    { text: '🚀 زيادة مبيعات متوسطة +350%', icon: ShoppingBag }
  ];

  return (
    <div className="py-6 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border-y border-cyan-500/20 overflow-hidden relative backdrop-blur-xl">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-12 text-xs font-black tracking-wider font-mono text-cyan-300 uppercase"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: 'linear'
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-100">{item.text}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
