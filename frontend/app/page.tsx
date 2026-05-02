"use client";

import React, { useState } from "react";
import { Search, Moon, Sun, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RefMeHero() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "RefMe",
          text: "Technical documentation and patterns for modern engineers.",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  const gridColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const dotColor = darkMode ? "#333" : "#ccc";

  return (
    <div
      className={`${darkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-black"} min-h-screen transition-colors duration-500 relative overflow-hidden font-sans selection:bg-zinc-500/30`}
    >
      <div className='absolute inset-0 z-0'>
        <div
          className='absolute inset-0 opacity-[0.4] transition-opacity duration-500'
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, ${dotColor} 1px, transparent 0),
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px",
          }}
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-zinc-500/10 via-transparent to-transparent'
        />
      </div>
      <nav className='flex items-center justify-between px-8 py-8 relative z-10 max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='text-2xl font-black tracking-tighter'
        >
          RefMe<span className='text-zinc-500'>_</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex items-center gap-4'
        >
          <div
            className={`flex items-center gap-3 ${darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"} px-4 py-2 rounded-lg border hidden md:flex backdrop-blur-md`}
          >
            <Search size={16} className='opacity-40' />
            <input
              type='text'
              placeholder='Search documentation...'
              className='bg-transparent border-none outline-none text-sm w-48 placeholder:text-zinc-500'
            />
            <kbd
              className={`text-[10px] opacity-30 border px-1.5 py-0.5 rounded-md font-mono ${darkMode ? "border-white" : "border-black"}`}
            >
              CMD K
            </kbd>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${darkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-medium text-sm ${darkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </motion.div>
      </nav>
      <main className='flex flex-col items-center justify-center pt-32 px-6 relative z-10 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <h1 className='text-6xl md:text-8xl font-black tracking-tight mb-8'>
            Engineered <br />
            <span className='text-zinc-500'>References.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`max-w-xl text-lg md:text-xl ${darkMode ? "text-zinc-400" : "text-zinc-600"} leading-relaxed font-medium`}
        >
          RefMe provides low-latency, high-fidelity documentation and
          architectural patterns designed specifically for modern full-stack
          development workflows.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-14'
        >
          <a
            href='https://github.com/Yash-pluto'
            target='_blank'
            rel='noopener noreferrer'
            className={`group flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-2xl ${
              darkMode
                ? "bg-white text-black hover:bg-zinc-200"
                : "bg-black text-white hover:bg-zinc-800"
            }`}
          >
            <svg height='24' width='24' viewBox='0 0 16 16' fill='currentColor'>
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
            </svg>
            Connect on GitHub
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </main>
    </div>
  );
}
