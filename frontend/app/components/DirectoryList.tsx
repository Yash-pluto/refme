// app/components/DirectoryList.tsx
"use client";

import Link from "next/link";
import { REFERENCE_DATA } from "../page"; // Assuming you export your data from page.tsx or a data file
import { ArrowRight } from "lucide-react";

interface DirectoryListProps {
  darkMode: boolean;
  searchQuery: string;
}

export default function DirectoryList({
  darkMode,
  searchQuery,
}: DirectoryListProps) {
  const borderTheme = darkMode ? "border-[#333333]" : "border-[#111111]";
  const hoverTheme = darkMode ? "hover:bg-[#1A1A1A]" : "hover:bg-[#EAEAEA]";

  // Filter logic
  const filteredData = REFERENCE_DATA.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((section) => section.items.length > 0);

  if (filteredData.length === 0) {
    return (
      <div className='p-10 font-mono uppercase text-sm opacity-50'>
        [ 0 Results Found ]
      </div>
    );
  }

  return (
    <div className='w-full pb-20'>
      {filteredData.map((section, index) => (
        <div key={section.category} className='w-full'>
          {/* Section Header */}
          <div
            className={`px-6 md:px-10 py-8 border-b-2 ${borderTheme} bg-transparent sticky top-0 md:static backdrop-blur-sm md:backdrop-blur-none z-10`}
          >
            <div className='flex items-center gap-4'>
              <span className='font-mono text-sm opacity-50'>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight uppercase'>
                {section.category}
              </h2>
            </div>
          </div>

          {/* Ledger Rows (No Cards) */}
          <div className='flex flex-col'>
            {section.items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex flex-col md:flex-row md:items-center justify-between p-6 md:px-10 md:py-6 border-b ${borderTheme} ${hoverTheme} transition-none`}
              >
                {/* Left Side: Title & Desc */}
                <div className='flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4 md:mb-0'>
                  <h3 className='text-xl md:text-2xl font-semibold tracking-tight group-hover:text-orange-500 transition-colors'>
                    {item.name}
                  </h3>
                  <p className='font-mono text-sm opacity-60 max-w-md line-clamp-1'>
                    {item.desc}
                  </p>
                </div>

                {/* Right Side: Action */}
                <div className='flex items-center justify-between md:justify-end gap-6'>
                  <div
                    className={`px-3 py-1 text-xs font-mono uppercase border rounded-full opacity-50 group-hover:opacity-100 ${darkMode ? "border-white/20" : "border-black/20"}`}
                  >
                    View Docs
                  </div>
                  <ArrowRight
                    size={24}
                    className='-rotate-45 group-hover:rotate-0 transition-transform duration-200'
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
