import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    // Sequence Timings
    const t1 = setTimeout(() => setStep(2), 1200); // Line expand & 2026 text
    const t2 = setTimeout(() => setStep(3), 2600); // Exit mask reveal
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
          {/* Centered Brand Title */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4"
          >
            <h1 className="text-xl sm:text-2xl font-black tracking-[0.35em] text-[#ffffff] uppercase">
              NEXT GEN DEVS
            </h1>

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
          <div className="absolute bottom-8 left-8 text-[10px] text-[#525252] tracking-widest uppercase">
            CREATIVE TECHNOLOGY STUDIO
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] text-[#525252] tracking-widest uppercase font-mono">
            SYS.INIT // OK
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
