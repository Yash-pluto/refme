"use client";

import { motion } from "framer-motion";
import { Search, Moon, Sun, Share2 } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearch: (value: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
  onShare: () => void;
}

export default function Navbar({
  searchQuery,
  onSearch,
  darkMode,
  toggleTheme,
  onShare,
}: NavbarProps) {
  const panelClass = darkMode
    ? "bg-white/5 border-white/10 focus-within:border-white/30"
    : "bg-black/5 border-black/10 focus-within:border-black/30";

  const buttonBorder = darkMode
    ? "border-white/10 hover:bg-white/5"
    : "border-black/10 hover:bg-black/5";

  return (
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
          className={`flex items-center gap-3 ${panelClass} px-4 py-2 rounded-lg border hidden md:flex backdrop-blur-md transition-colors`}
        >
          <Search size={16} className='opacity-40' />
          <input
            type='text'
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            placeholder='Search references...'
            className='bg-transparent border-none outline-none text-sm w-48 placeholder:text-zinc-500'
            aria-label='Search references'
          />
          <kbd
            className={`text-[10px] opacity-30 border px-1.5 py-0.5 rounded-md font-mono ${darkMode ? "border-white" : "border-black"}`}
          >
            /
          </kbd>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl border transition-all ${buttonBorder}`}
          aria-label='Toggle dark mode'
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onShare}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-medium text-sm ${buttonBorder}`}
          aria-label='Share this page'
        >
          <Share2 size={16} />
          <span className='hidden sm:inline'>Share</span>
        </button>
      </motion.div>
    </nav>
  );
}
