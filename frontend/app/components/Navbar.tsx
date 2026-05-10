"use client";

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
    <nav className='flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 relative z-20 max-w-7xl mx-auto w-full'>
      {/* Logo */}
      <div className='text-xl sm:text-2xl font-black tracking-tighter shrink-0'>
        RefMe<span className='text-zinc-500'>_</span>
      </div>

      {/* Search Bar - Hidden on mobile, visible on sm+ */}
      <div className='hidden sm:flex items-center gap-2 flex-1 max-w-xs'>
        <div
          className={`flex items-center gap-2 ${panelClass} px-3 py-2 rounded-lg border backdrop-blur-md transition-colors w-full`}
        >
          <Search size={16} className='opacity-40 shrink-0' />
          <input
            type='text'
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            placeholder='Search...'
            className='bg-transparent border-none outline-none text-xs sm:text-sm w-full placeholder:text-zinc-500'
            aria-label='Search references'
          />
          <kbd
            className={`text-[8px] opacity-30 border px-1.5 py-0.5 rounded-md font-mono hidden sm:inline-block ${darkMode ? "border-white" : "border-black"}`}
          >
            /
          </kbd>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center gap-2'>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl border transition-all ${buttonBorder}`}
          aria-label='Toggle dark mode'
          type='button'
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onShare}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl border transition-all font-medium text-xs ${buttonBorder}`}
          aria-label='Share this page'
          type='button'
        >
          <Share2 size={16} />
          <span className='hidden sm:inline'>Share</span>
        </button>
      </div>
    </nav>
  );
}
