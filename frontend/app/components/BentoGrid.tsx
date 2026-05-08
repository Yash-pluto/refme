"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

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
      <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-32 min-h-100'>
        <div className={`text-center py-12 sm:py-20 ${mutedText}`}>
          <Search size={48} className='mx-auto mb-4 opacity-30' />
          <p className='text-lg sm:text-xl'>No references found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-32'>
      <div className='space-y-20'>
        {filteredData.map((section) => (
          <div key={section.category} className='w-full'>
            {/* Category Header - VERY VISIBLE */}
            <div className='flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12'>
              <div className={`p-3 rounded-lg ${headerBg} flex-shrink-0`}>
                {section.icon}
              </div>
              <h2
                className={`text-lg sm:text-2xl font-bold uppercase tracking-wider ${headerText}`}
              >
                {section.category}
              </h2>
              <div
                className={`grow h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
              />
            </div>

            {/* Bento Grid - Masonry Layout with Dynamic Sizing */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 auto-rows-max'>
              {section.items.map((item, index) => {
                // Create masonry effect with random-looking but deterministic sizing
                const sizePattern = index % 13;
                let colSpan = "col-span-1";
                let rowSpan = "row-span-1";

                // Create varied sizes: some large, some medium, most small
                if (sizePattern === 0 || sizePattern === 5) {
                  colSpan = "sm:col-span-2 md:col-span-2";
                  rowSpan = "sm:row-span-2 md:row-span-2";
                } else if (sizePattern === 2 || sizePattern === 7) {
                  colSpan = "sm:col-span-2";
                  rowSpan = "sm:row-span-1";
                } else if (sizePattern === 3 || sizePattern === 9) {
                  rowSpan = "sm:row-span-2 md:row-span-2";
                }

                // Determine height based on size
                let heightClass = "min-h-24 sm:min-h-28 md:min-h-32";
                if (sizePattern === 0 || sizePattern === 5) {
                  heightClass = "min-h-32 sm:min-h-48 md:min-h-56";
                } else if (sizePattern === 3 || sizePattern === 9) {
                  heightClass = "min-h-32 sm:min-h-48 md:min-h-56";
                }

                return (
                  <MotionLink
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative overflow-hidden flex flex-col items-center justify-center gap-3 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 ${colSpan} ${rowSpan} ${heightClass} ${cardTheme} ${item.border}`}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {/* Background overlay */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${item.color}' />

                    {/* Colored dot */}
                    <div
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-current flex-shrink-0 ${item.color.split(" ").pop()}`}
                    />

                    {/* Item name - LARGE AND BOLD */}
                    <span className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl relative z-10 tracking-wide text-center leading-snug text-current'>
                      {item.name}
                    </span>
                  </MotionLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
