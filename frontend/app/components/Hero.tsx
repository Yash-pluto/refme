"use client";

import { motion } from "framer-motion";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  return (
    <main className='flex flex-col items-center justify-center pt-16 pb-20 px-6 relative z-10 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className='text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6'>
          Engineered <br />
          <span className='text-zinc-500'>References.</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`max-w-2xl text-lg md:text-xl ${darkMode ? "text-zinc-400" : "text-zinc-600"} leading-relaxed font-medium`}
      >
        Zero-latency, high-fidelity documentation and architectural patterns
        designed specifically for modern full-stack workflows.
      </motion.p>
    </main>
  );
}
