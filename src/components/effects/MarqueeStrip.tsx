import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeStrip: React.FC<{ text?: string }> = ({
  text = 'NEXT GEN DEVS // DIGITAL EXPERIENCES // CREATIVE TECHNOLOGY STUDIO // WE BUILD WHAT’S NEXT //'
}) => {
  return (
    <div className="py-8 bg-[#0d0d0d] border-y border-[#181818] overflow-hidden whitespace-nowrap flex select-none">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="flex items-center gap-8 text-sm sm:text-lg font-mono font-black text-[#a3a3a3] uppercase tracking-[0.3em]"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};
