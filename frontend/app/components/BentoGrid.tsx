"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

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
      <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-32'>
        <div className={`text-center py-12 sm:py-20 ${mutedText}`}>
          <Search size={48} className='mx-auto mb-4 opacity-30' />
          <p className='text-lg'>No references found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-32'>
      <div className='space-y-16'>
        {filteredData.map((section) => (
          <div key={section.category} className='w-full'>
            {/* Category Header */}
            <div className='flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8'>
              <div
                className={`p-2.5 sm:p-3 rounded-lg ${headerBg} flex-shrink-0`}
              >
                {section.icon}
              </div>
              <h2
                className={`text-base sm:text-xl font-bold uppercase tracking-wider ${headerText}`}
              >
                {section.category}
              </h2>
              <div
                className={`grow h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`}
              />
            </div>

            {/* Perfect Symmetrical Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative overflow-hidden flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-xl border transition-transform duration-200 hover:-translate-y-1 h-28 sm:h-32 ${cardTheme} ${item.border}`}
                >
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${item.color}' />

                  <div
                    className={`w-3 h-3 rounded-full bg-current flex-shrink-0 ${item.color.split(" ").pop()}`}
                  />

                  <span className='font-bold text-sm sm:text-lg relative z-10 tracking-wide text-center text-current'>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
