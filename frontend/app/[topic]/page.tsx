"use client";
import { useTheme } from "../../src/context/ThemeContext";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Copy,
  Check,
  Terminal,
  Hash,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// Data Import
import { cheatsheetLibrary } from "../../src/data/cheatsheets";

export default function ReferenceDetail() {
  const { darkMode, toggleTheme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("");

  const topicKey = params.topic as string;
  const data = cheatsheetLibrary[topicKey];
  const pageTheme = {
    background: darkMode
      ? "bg-[#050505] text-zinc-100"
      : "bg-zinc-50 text-zinc-950",
    container: darkMode
      ? "bg-slate-950/95 border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.65)]"
      : "bg-white/95 border border-zinc-200 shadow-[0_40px_120px_-30px_rgba(15,23,42,0.08)]",
    sidebar: darkMode
      ? "bg-[#050505] border border-white/10 text-zinc-300"
      : "bg-white border border-zinc-200 text-zinc-950",
    panel: darkMode
      ? "bg-slate-950/90 border border-white/10"
      : "bg-zinc-100 border border-zinc-200",
    button: darkMode
      ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
      : "border-black/10 bg-black/5 hover:bg-black/10 text-black",
    muted: darkMode ? "text-zinc-400" : "text-zinc-600",
    heading: darkMode ? "text-white" : "text-zinc-950",
    sectionTitle: darkMode ? "text-white" : "text-zinc-950",
    sectionLabel: darkMode ? "text-zinc-600" : "text-zinc-900",
    codeCard: darkMode
      ? "bg-[#111827] border border-white/10"
      : "bg-zinc-100 border border-zinc-200",
    codeHeader: darkMode
      ? "border-white/10 bg-white/[0.03]"
      : "border-zinc-200 bg-white",
    codeText: darkMode ? "#e2e8f0" : "#111827",
    syntaxStyle: darkMode ? vscDarkPlus : oneLight,
    navActive: darkMode
      ? "text-indigo-400 font-medium"
      : "text-indigo-600 font-semibold",
    navInactive: darkMode
      ? "text-zinc-400 hover:text-white"
      : "text-zinc-700 hover:text-zinc-950",
    navButton: darkMode
      ? "text-zinc-400 hover:text-white"
      : "text-zinc-700 hover:text-zinc-950",
    badge: darkMode
      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
      : "bg-indigo-500/10 border-indigo-500/20 text-indigo-600",
    externalDocsText: darkMode ? "text-indigo-300" : "text-indigo-700",
    externalDocsButton: darkMode
      ? "text-white hover:text-indigo-400"
      : "text-zinc-900 hover:text-indigo-600",
  };

  // Handle intersection observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    data?.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  if (!data) {
    return (
      <div className='min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 font-mono text-sm'>
        <Terminal className='mr-2 opacity-50' size={16} />
        Reference "{topicKey}" not found.
      </div>
    );
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className={`min-h-screen ${pageTheme.background} font-sans selection:bg-indigo-500/30`}
    >
      <div className='max-w-[1400px] mx-auto flex flex-col xl:flex-row'>
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside
          className={`hidden lg:block w-72 h-screen sticky top-0 p-8 pt-24 overflow-y-auto ${pageTheme.sidebar}`}
        >
          <button
            onClick={() => router.push("/")}
            className={`flex items-center gap-2 transition-all mb-12 text-[10px] font-bold uppercase tracking-widest group ${pageTheme.navButton}`}
          >
            <ChevronLeft
              size={14}
              className='group-hover:-translate-x-1 transition-transform'
            />
            Library
          </button>

          <div className='space-y-8'>
            <div>
              <h4
                className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${pageTheme.sectionLabel}`}
              >
                On this page
              </h4>
              <nav className='flex flex-col gap-3'>
                {data.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`text-sm transition-colors ${
                      activeSection === section.id
                        ? pageTheme.navActive
                        : pageTheme.navInactive
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className='grow px-6 md:px-16 lg:px-24 pt-24 pb-32'>
          {/* Header */}
          <header className='mb-20'>
            <div className='flex items-center justify-between gap-3 mb-4'>
              <span className='px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider'>
                {data.subtitle}
              </span>
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 border transition flex-shrink-0 ${pageTheme.button}`}
                aria-label='Toggle theme'
                type='button'
              >
                {darkMode ? (
                  <Sun size={16} className='sm:w-[18px] sm:h-[18px]' />
                ) : (
                  <Moon size={16} className='sm:w-[18px] sm:h-[18px]' />
                )}
              </button>
            </div>
            <h1
              className={`text-5xl font-bold tracking-tight mb-6 ${pageTheme.heading}`}
            >
              {data.title}
              <span className='text-indigo-500'>.</span>
            </h1>
            <p
              className={`text-lg ${pageTheme.muted} max-w-2xl leading-relaxed`}
            >
              {data.description}
            </p>
          </header>

          {/* Dynamic Sections */}
          <div className='space-y-24'>
            {data.sections.map((section, sIdx) => (
              <section
                key={section.id}
                id={section.id}
                className='scroll-mt-24'
              >
                <div className='flex items-center gap-4 mb-10 group'>
                  <Hash
                    size={18}
                    className='text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity'
                  />
                  <h2
                    className={`text-xl font-bold tracking-tight ${pageTheme.sectionTitle}`}
                  >
                    {section.title}
                  </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {section.items.map((item, iIdx) => {
                    const itemId = `${sIdx}-${iIdx}`;

                    // Render Subsection Titles
                    if (item.type === "subsectionTitle") {
                      return (
                        <div key={itemId} className='col-span-full mt-4'>
                          <h3
                            className={`text-[10px] font-black uppercase tracking-[0.3em] ${pageTheme.sectionLabel}`}
                          >
                            {item.content}
                          </h3>
                        </div>
                      );
                    }

                    // Render Paragraphs
                    if (item.type === "paragraph") {
                      return (
                        <div key={itemId} className='col-span-full max-w-3xl'>
                          <p
                            className={`${pageTheme.muted} leading-relaxed text-base`}
                          >
                            {item.content}
                          </p>
                        </div>
                      );
                    }

                    // Render Code Blocks
                    if (item.type === "code") {
                      return (
                        <div
                          key={itemId}
                          className={`relative group rounded-xl overflow-hidden ${pageTheme.codeCard}`}
                        >
                          <div
                            className={`flex items-center justify-between px-4 py-2 border-b ${pageTheme.codeHeader}`}
                          >
                            <span className='text-[9px] font-bold text-zinc-500 uppercase tracking-widest'>
                              {item.label || "Snippet"}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(item.content, itemId)
                              }
                              className='text-zinc-500 hover:text-white transition-colors'
                            >
                              {copiedId === itemId ? (
                                <Check size={14} className='text-emerald-500' />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </div>
                          <div className='p-1'>
                            <SyntaxHighlighter
                              language={item.language || topicKey}
                              style={pageTheme.syntaxStyle}
                              customStyle={{
                                background: "transparent",
                                color: pageTheme.codeText,
                                padding: "1.25rem",
                                margin: 0,
                                fontSize: "0.85rem",
                                lineHeight: "1.6",
                              }}
                            >
                              {item.content}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* RIGHT DECORATIVE COLUMN (Optional) */}
        <aside className='hidden xl:block w-64 h-screen sticky top-0 p-8 pt-24'>
          <div className='p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10'>
            <p
              className={`text-[11px] ${pageTheme.externalDocsText} font-medium leading-relaxed mb-4`}
            >
              Need more help? Check the official documentation for {data.title}.
            </p>
            <button
              className={`flex items-center gap-2 text-[10px] font-bold uppercase transition-colors ${pageTheme.externalDocsButton}`}
            >
              External Docs <ExternalLink size={12} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
