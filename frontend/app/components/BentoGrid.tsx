"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

const MotionLink = motion(Link);

interface ReferenceItem {
  name: string;
  href: string;
  color: string;
  border: string;
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springTransition,
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function BentoGrid({ darkMode, filteredData }: BentoGridProps) {
  const cardTheme = darkMode
    ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
    : "bg-black/[0.02] border-black/5 hover:bg-black/[0.04]";

  const mutedText = darkMode ? "text-zinc-500" : "text-zinc-400";
  const headerText = darkMode ? "text-zinc-300" : "text-zinc-700";
  const headerBg = darkMode
    ? "bg-white/5 text-zinc-400"
    : "bg-black/5 text-zinc-600";

  if (filteredData.length === 0) {
    return (
      <section className='relative z-10 max-w-7xl mx-auto px-6 pb-32 min-h-100'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-20 ${mutedText}`}
        >
          <Search size={48} className='mx-auto mb-4 opacity-20' />
          <p>No references found.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className='relative z-10 max-w-7xl mx-auto px-6 pb-32 min-h-100'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='show'
        className='space-y-16'
      >
        {filteredData.map((section) => (
          <div key={section.category} className='w-full'>
            <div className='flex items-center gap-4 mb-8'>
              <div className={`p-2 rounded-lg ${headerBg}`}>{section.icon}</div>
              <h2
                className={`text-sm font-bold uppercase tracking-widest ${headerText}`}
              >
                {section.category}
              </h2>
              <div
                className={`grow h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
              />
            </div>

            <motion.div
              layout
              className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            >
              <AnimatePresence mode='popLayout'>
                {section.items.map((item) => (
                  <MotionLink
                    key={item.name}
                    href={item.href}
                    layout
                    variants={itemVariants}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative overflow-hidden flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${cardTheme} ${item.border}`}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-linear-to-r ${item.color}' />
                    <div
                      className={`w-2 h-2 rounded-full bg-current ${item.color.split(" ").pop()}`}
                    />
                    <span className='font-semibold text-sm relative z-10 tracking-wide'>
                      {item.name}
                    </span>
                  </MotionLink>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
