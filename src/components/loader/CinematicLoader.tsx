import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    // Sequence Timings
    const t1 = setTimeout(() => setStep(2), 1200);
    const t2 = setTimeout(() => setStep(3), 2600);
    const t3 = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            opacity: 0
          }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[10000] bg-[#000000] text-[#ffffff] flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-none"
        >
          {/* Centered Brand Title & Circular Logo */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4 flex flex-col items-center justify-center"
          >
            {/* Circular Brand Logo Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/20 p-1 shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-black overflow-hidden flex items-center justify-center">
              <img
                src="/2.png"
                alt="Brand Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <img
                src="/2.png"
                alt="Title Icon"
                className="w-6 h-6 rounded-full object-cover border border-white/30"
              />
              <h1 className="text-xl sm:text-2xl font-black tracking-[0.35em] text-[#ffffff] uppercase font-mono">
                NEXT GEN DEVS
              </h1>
            </div>

            {/* Thin Horizontal Expanding Line */}
            <div className="w-64 sm:w-80 h-[1px] bg-[#262626] relative overflow-hidden mx-auto">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step >= 2 ? 1 : 0.3 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="w-full h-full bg-[#ffffff] origin-left shadow-[0_0_8px_#ffffff]"
              />
            </div>

            {/* Secondary Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.4em] text-[#a3a3a3] uppercase font-sans font-bold"
            >
              DIGITAL EXPERIENCES / 2026
            </motion.p>
          </motion.div>

          {/* Corner Branding Details */}
          <div className="absolute bottom-8 left-8 text-[10px] text-[#525252] tracking-widest uppercase flex items-center gap-2">
            <img src="/2.png" alt="Logo" className="w-3.5 h-3.5 rounded-full object-cover" />
            <span>CREATIVE TECHNOLOGY STUDIO</span>
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] text-[#525252] tracking-widest uppercase font-mono">
            SYS.INIT // OK
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
