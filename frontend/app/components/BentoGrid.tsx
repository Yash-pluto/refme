// app/components/BentoGrid.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

interface ReferenceItem {
  name: string;
  href: string;
  theme: string;
  icon: ReactNode;
  desc: string;
  size: "normal" | "large";
}

interface ReferenceSection {
  category: string;
  icon: ReactNode;
  items: ReferenceItem[];
}

interface BentoGridProps {
  darkMode: boolean;
  filteredData: ReferenceSection[];
}

export default function BentoGrid({ darkMode, filteredData }: BentoGridProps) {
  // Theme variants for deep, premium aesthetics
  const sectionBg = darkMode ? "bg-[#0a0a0a]" : "bg-white";
  const mutedText = darkMode ? "text-zinc-500" : "text-zinc-400";
  const headerText = darkMode ? "text-zinc-100" : "text-zinc-900";

  // Advanced Glassmorphism & Hover states for the cards
  const cardBase = darkMode
    ? "bg-white/[0.02] border-white/5 backdrop-blur-md"
    : "bg-black/[0.02] border-black/5 backdrop-blur-md";

  const cardHover = darkMode
    ? "hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]"
    : "hover:bg-black/[0.04] hover:border-black/10 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.05)]";

  if (filteredData.length === 0) {
    return (
      <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-32 min-h-100'>
        <div className={`text-center py-20 ${mutedText}`}>
          <Search size={48} className='mx-auto mb-6 opacity-20' />
          <p className='text-xl tracking-tight'>No modules located.</p>
        </div>
      </section>
    );
  }

  // Animation variants for staggered rendering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32'>
      <div className='space-y-24'>
        {filteredData.map((section) => (
          <motion.div
            key={section.category}
            className='w-full'
            variants={containerVariants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Ultra-Clean Section Header */}
            <div className='flex items-center gap-4 mb-10'>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl ${darkMode ? "bg-white/5 text-zinc-300" : "bg-black/5 text-zinc-700"}`}
              >
                {section.icon}
              </div>
              <h2
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${headerText}`}
              >
                {section.category}
              </h2>
              <div
                className={`grow h-px ml-4 ${darkMode ? "bg-gradient-to-r from-white/10 to-transparent" : "bg-gradient-to-r from-black/10 to-transparent"}`}
              />
            </div>

            {/* Asymmetrical Bento Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {section.items.map((item) => {
                // Large items span 2 columns on desktop
                const colSpan =
                  item.size === "large"
                    ? "md:col-span-2 lg:col-span-2"
                    : "col-span-1";

                // Color mapping for dynamic hover glows
                const themeGlows: Record<string, string> = {
                  emerald: "group-hover:shadow-emerald-500/10",
                  blue: "group-hover:shadow-blue-500/10",
                  sky: "group-hover:shadow-sky-500/10",
                  yellow: "group-hover:shadow-yellow-500/10",
                  orange: "group-hover:shadow-orange-500/10",
                  cyan: "group-hover:shadow-cyan-500/10",
                  indigo: "group-hover:shadow-indigo-500/10",
                  zinc: "group-hover:shadow-zinc-500/10",
                };

                return (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className={colSpan}
                  >
                    <MotionLink
                      href={item.href}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex flex-col h-full min-h-[180px] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 overflow-hidden ${cardBase} ${cardHover} ${themeGlows[item.theme]}`}
                    >
                      {/* Subtle Background Radial Gradient on Hover */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-${item.theme}-500/40 via-transparent to-transparent`}
                      />

                      {/* Header row: Icon & Action Arrow */}
                      <div className='flex justify-between items-start mb-auto relative z-10'>
                        <div
                          className={`p-3 rounded-xl border ${darkMode ? "bg-black/50 border-white/10" : "bg-white border-black/10 shadow-sm"}`}
                        >
                          {item.icon}
                        </div>
                        <ArrowUpRight
                          size={20}
                          className={`opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                        />
                      </div>

                      {/* Footer row: Title & Description */}
                      <div className='relative z-10 mt-6'>
                        <h3
                          className={`text-xl font-bold tracking-tight mb-2 ${darkMode ? "text-zinc-100" : "text-zinc-900"}`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </MotionLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
