// app/components/Hero.tsx
"use client";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  return (
    <main className='flex flex-col items-center justify-center pt-24 pb-20 px-6 relative z-10 text-center'>
      {/* Sleek Announcement Badge */}
      <div
        className={`mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-pointer ${darkMode ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10" : "bg-black/5 border-black/10 text-zinc-700 hover:bg-black/10"}`}
      >
        <span className='flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse'></span>
        RefMe Core v2.0
        <ChevronRight size={14} className='opacity-50' />
      </div>

      <h1
        className={`text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 ${darkMode ? "text-white" : "text-zinc-900"}`}
      >
        Engineered{" "}
        <span className='text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-cyan-500'>
          References.
        </span>
      </h1>

      <p
        className={`max-w-2xl text-lg sm:text-xl font-medium leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
      >
        Zero-latency, high-fidelity documentation and architectural patterns
        designed specifically for modern full-stack workflows.
      </p>
    </main>
  );
}
