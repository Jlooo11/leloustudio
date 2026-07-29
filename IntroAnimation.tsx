import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence the animation
    const timer1 = setTimeout(() => setStage(1), 500); // Wait a bit, then start zoom
    const timer2 = setTimeout(() => {
      setStage(2);
      onComplete();
    }, 2500); // Complete animation

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: stage === 1 ? 150 : 1 }}
            transition={{ duration: 2, ease: [0.87, 0, 0.13, 1] }} // smooth massive zoom
            className="relative flex items-center justify-center w-64 h-64"
          >
            {/* Simple Camera SVG with large transparent hole in the middle (the lens) */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M20 30 C 20 25, 25 20, 30 20 L 40 20 L 45 10 L 55 10 L 60 20 L 70 20 C 75 20, 80 25, 80 30 L 80 70 C 80 75, 75 80, 70 80 L 30 80 C 25 80, 20 75, 20 70 L 20 30 Z M 50 70 C 61.0457 70 70 61.0457 70 50 C 70 38.9543 61.0457 30 50 30 C 38.9543 30 30 38.9543 30 50 C 30 61.0457 38.9543 70 50 70 Z M 50 65 C 41.7157 65 35 58.2843 35 50 C 35 41.7157 41.7157 35 50 35 C 58.2843 35 65 41.7157 65 50 C 65 58.2843 58.2843 65 50 65 Z" />
            </svg>
            
            {/* The actual hole we zoom through */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-transparent" style={{ boxShadow: '0 0 0 1000px black' }} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-12 text-white/50 text-[10px] tracking-[0.3em] font-bold uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Initialisation de l'objectif...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
