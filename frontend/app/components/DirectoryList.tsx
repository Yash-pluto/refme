// app/components/DirectoryList.tsx
"use client";

import Link from "next/link";
import { cloneElement } from "react";
import { REFERENCE_DATA } from "../page";
import { ArrowRight } from "lucide-react";

interface DirectoryListProps {
  darkMode: boolean;
  searchQuery: string;
}

export default function DirectoryList({
  darkMode,
  searchQuery,
}: DirectoryListProps) {
  const filteredData = REFERENCE_DATA.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((section) => section.items.length > 0);

  if (filteredData.length === 0) {
    return (
      <div className={`rounded-3xl border p-10 text-sm ${darkMode ? "border-[#1f1f1f] bg-[#0d0d0d] text-[#b9b9b9]" : "border-[#e1dfd8] bg-[#f7f5f1] text-[#4f5863]"}`}>
        No matching entries found.
      </div>
    );
  }

  return (
    <div className='space-y-6 pb-8'>
      {filteredData.map((section) => (
        <section key={section.category} className='space-y-4'>
          <div className='flex items-center gap-3 px-1'>
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${darkMode ? "border-[#1f1f1f] bg-[#101010] text-zinc-200" : "border-[#e3e0d9] bg-[#f1efe9] text-[#111111]"}`}>
              {cloneElement(section.icon, {
                className: "block",
                style: { color: darkMode ? "#f4f4f5" : "#111111" },
              })}
            </div>
            <h2 className='text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500'>
              {section.category}
            </h2>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {section.items.map((item) => {
              const iconNode = cloneElement(item.icon, {
                className: "block",
                style: {
                  color: darkMode ? "#f4f4f5" : "#111111",
                  opacity: 1,
                },
              });

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-3xl border p-5 transition-colors ${darkMode ? "border-[#1f1f1f] bg-[#0d0d0d] hover:bg-[#121212]" : "border-[#e1dfd8] bg-[#f9f7f4] hover:bg-[#f3f0ea]"}`}
                >
                  <div className='mb-5 flex items-center justify-between'>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${darkMode ? "border-white/10 bg-white/5" : "border-[#d9d4cd] bg-[#f0eee8]"}`}>
                      {iconNode}
                    </div>

                    <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500'>
                      Open
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold tracking-[-0.05em]'>{item.name}</h3>
                    <p className={`text-sm leading-6 ${darkMode ? "text-[#a9afb7]" : "text-[#4f5863]"}`}>
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
