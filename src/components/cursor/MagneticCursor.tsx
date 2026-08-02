import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const hoverable = target.closest('[data-cursor]');
      
      if (hoverable) {
        setIsHovered(true);
        const label = hoverable.getAttribute('data-cursor') || 'EXPLORE';
        setCursorText(label);
      } else if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Magnetic Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-[#ffffff]/70 rounded-full flex items-center justify-center pointer-events-none backdrop-blur-[2px]"
        animate={{
          x: pos.x - (isHovered ? 45 : 12),
          y: pos.y - (isHovered ? 45 : 12),
          width: isHovered ? 90 : 24,
          height: isHovered ? 90 : 24,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.4 }}
      >
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black tracking-[0.25em] text-[#ffffff] uppercase font-mono"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ffffff] rounded-full pointer-events-none"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </div>
  );
};
