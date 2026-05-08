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
    <nav className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 relative z-20 max-w-7xl mx-auto w-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='text-xl sm:text-2xl font-black tracking-tighter'
      >
        RefMe<span className='text-zinc-500'>_</span>
      </motion.div>

      <div className='flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end flex-wrap'>
        <div
          className={`flex items-center gap-2 sm:gap-3 ${panelClass} px-3 py-2 rounded-lg border backdrop-blur-md transition-colors flex-1 sm:flex-initial min-w-0 max-w-sm`}
        >
          <Search size={16} className='opacity-40 flex-shrink-0' />
          <input
            type='text'
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            placeholder='Search...'
            className='bg-transparent border-none outline-none text-xs sm:text-sm w-full placeholder:text-zinc-500'
            aria-label='Search references'
          />
          <kbd
            className={`text-[8px] sm:text-[10px] opacity-30 border px-1.5 py-0.5 rounded-md font-mono hidden sm:inline-block ${darkMode ? "border-white" : "border-black"}`}
          >
            /
          </kbd>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 sm:p-2.5 rounded-xl border transition-all flex-shrink-0 ${buttonBorder}`}
          aria-label='Toggle dark mode'
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onShare}
          className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border transition-all font-medium text-xs sm:text-sm flex-shrink-0 ${buttonBorder}`}
          aria-label='Share this page'
        >
          <Share2 size={16} />
          <span className='hidden sm:inline'>Share</span>
        </button>
      </div>
    </nav>
  );
}
