"use client";

/**
 * @fileoverview Layout wrapper for individual documentation topics.
 * Features a 3-column responsive grid, dynamic scroll-spy TOC, bottom pagination,
 * interactive multi-level breadcrumbs, and a sleek, minimal footer.
 *
 * @author Yash Vardhan
 */

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useTheme } from "../../src/context/ThemeContext";
import { useGitHubStats } from "../../src/hooks/useGitHubStats"; 
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import SearchPalette, { useSearchOSKey, SearchItem } from "../components/SearchPalette";
import {
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  BookOpenText,
  Braces,
  ChevronDown,
  ChevronRight,
  Code2,
  Menu,
  Search,
  TerminalSquare,
  Workflow,
  X,
  Home,
  GitPullRequest,
  GitMerge,
  CircleDot,
  Star
} from "lucide-react";

import Footer from "../components/Footer";

export default function TopicLayout({
  children,
  frontmatter,
  topicKey,
  topics = [],
  headings = [],
  prevTopic,
  nextTopic,
}: {
  children: React.ReactNode;
  frontmatter: any;
  topicKey: string;
  topics?: Array<{ id: string; title?: string; description?: string }>;
  headings?: Array<{ id: string; title: string; depth: number }>;
  prevTopic?: { id: string; title?: string } | null;
  nextTopic?: { id: string; title?: string } | null;
}) {
  const { toggleTheme } = useTheme();
  const router = useRouter();

  const [domHeadings, setDomHeadings] = useState<Array<{ id: string; title: string; depth: number }>>([]);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const { modifierKey } = useSearchOSKey();
  const [expandedOutline, setExpandedOutline] = useState<Record<string, boolean>>({});
  const [activeOutlineId, setActiveOutlineId] = useState<string | null>(null);

  const githubStats = useGitHubStats();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTopBtnRef = useRef<HTMLButtonElement>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const headingElementsRef = useRef<{ id: string; el: HTMLElement }[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCmdOpen(false);
        return;
      }
      const isModifier = event.metaKey || event.ctrlKey;
      if (!isModifier || event.key.toLowerCase() !== "k") return;
      
      event.preventDefault();
      setCmdOpen((open) => !open);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || cmdOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, cmdOpen]);

  useEffect(() => {
    const article = document.querySelector("article");
    const headingNodes = article ? Array.from(article.querySelectorAll("h2[id], h3[id]")) : [];
    const nextHeadings = headingNodes.map((node) => ({
      id: node.id,
      title: node.textContent?.trim() || node.id,
      depth: node.tagName === "H3" ? 3 : 2,
    }));
    setDomHeadings(nextHeadings);
    setFeedbackSubmitted(false); 
  }, [children, topicKey]);

  const activeHeadings = headings.length > 0 ? headings : domHeadings;

  const searchData = useMemo<SearchItem[]>(() => {
    const topicDocs: SearchItem[] = topics.map((item) => ({
      id: item.id,
      title: item.title || item.id,
      description: item.description || "",
      type: "topic",
      href: `/${item.id}`,
    }));
    const sectionDocs: SearchItem[] = activeHeadings.map((heading) => ({
      id: heading.id,
      title: heading.title,
      type: "section",
      depth: heading.depth,
    }));
    return [...topicDocs, ...sectionDocs];
  }, [activeHeadings, topics]);

  const handleSearchSelect = (item: SearchItem) => {
    if (item.type === "topic" && item.href) router.push(item.href);
    else if (item.type === "section") scrollToSection(item.id);
  };

  const outlineGroups = useMemo(() => {
    const groups: Array<{ id: string; title: string; items: Array<{ id: string; title: string }> }> = [];
    let activeGroup: any = null;
    for (const heading of activeHeadings) {
      if (heading.depth === 2) {
        activeGroup = { id: heading.id, title: heading.title, items: [] };
        groups.push(activeGroup);
        continue;
      }
      if (heading.depth === 3 && activeGroup) {
        activeGroup.items.push({ id: heading.id, title: heading.title });
      }
    }
    return groups;
  }, [activeHeadings]);

  useEffect(() => {
    const ids = outlineGroups.flatMap((group) => [group.id, ...group.items.map((item) => item.id)]);
    headingElementsRef.current = ids
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter(Boolean) as { id: string; el: HTMLElement }[];
  }, [outlineGroups]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (scrollTopBtnRef.current) {
            if (currentScrollY > 400) {
              scrollTopBtnRef.current.classList.remove("translate-y-8", "opacity-0", "pointer-events-none");
              scrollTopBtnRef.current.classList.add("translate-y-0", "opacity-100");
            } else {
              scrollTopBtnRef.current.classList.add("translate-y-8", "opacity-0", "pointer-events-none");
              scrollTopBtnRef.current.classList.remove("translate-y-0", "opacity-100");
            }
          }
          if (progressBarRef.current) {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (totalHeight > 0) {
              const progress = (currentScrollY / totalHeight) * 100;
              progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            }
          }
          if (!isClickScrolling.current && headingElementsRef.current.length > 0) {
            let currentActiveId = null;
            for (const { id, el } of headingElementsRef.current) {
              if (el.getBoundingClientRect().top <= 120) currentActiveId = id;
              else break;
            }
            if (!currentActiveId && currentScrollY < 50) currentActiveId = headingElementsRef.current[0].id;
            if (currentActiveId) setActiveOutlineId((prev) => (prev !== currentActiveId ? currentActiveId : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setExpandedOutline((prev) => {
      const next: Record<string, boolean> = { ...prev };
      outlineGroups.forEach((group, index) => {
        next[group.id] = index === 0 ? true : Boolean(prev[group.id]);
      });
      return next;
    });
  }, [outlineGroups]);

  const themeClasses = {
    page: "bg-[#FFFFFF] text-[#111111] dark:bg-[#050505] dark:text-[#F5F5F5]",
    sidebar: "bg-[#F7F7F7] dark:bg-[#101010]",
    header: "bg-[#FFFFFF]/90 dark:bg-[#050505]/90",
    border: "border-[#E5E5E5] dark:border-[#222222]",
    muted: "text-zinc-500 dark:text-zinc-400",
    hoverAccent: "hover:text-[#6f45d6] dark:hover:text-[#C699FF]",
    activeNavBg: "bg-[#6f45d6]/10 text-[#6f45d6] dark:bg-[#C699FF]/15 dark:text-[#C699FF]",
    inputBg: "bg-[#F4F4F4] dark:bg-[#101010]",
  };

  const getTopicIcon = (topicId: string) => {
    const value = topicId.toLowerCase();
    if (value.includes("javascript") || value.includes("js")) return TerminalSquare;
    if (value.includes("python")) return Braces;
    if (value.includes("react")) return Workflow;
    if (value.includes("cpp") || value.includes("c++")) return Code2;
    return BookOpenText;
  };

  const scrollToSection = useCallback((id: string) => {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    isClickScrolling.current = true;
    setActiveOutlineId(id);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  const handleFeedback = (isPositive: boolean) => {
    setFeedbackSubmitted(true);
    if (isPositive) {
      toast.success("Glad it helped! Thanks for the feedback.");
    } else {
      toast("Thanks for the feedback! We'll work on improving this.", { icon: '📝' });
    }
  };

  const currentTopicTitle = topics.find((t) => t.id === topicKey)?.title || frontmatter?.title || topicKey;

  let activeGroupTitle: string | null = null;
  let activeChildTitle: string | null = null;
  let activeGroupId: string | null = null;
  let activeChildId: string | null = null;

  if (activeOutlineId) {
    for (const group of outlineGroups) {
      if (group.id === activeOutlineId) {
        activeGroupTitle = group.title;
        activeGroupId = group.id;
        break;
      }
      const child = group.items.find((item) => item.id === activeOutlineId);
      if (child) {
        activeGroupTitle = group.title;
        activeGroupId = group.id;
        activeChildTitle = child.title;
        activeChildId = child.id;
        break;
      }
    }
  }

  return (
    <div className={`${themeClasses.page} min-h-screen font-sans selection:bg-[#C699FF]/25 transition-colors duration-200 flex flex-col`}>
      <div ref={progressBarRef} className="fixed left-0 top-0 z-[100] h-[3px] bg-[#C699FF] will-change-[width]" style={{ width: "0%" }} />

      <Toaster 
        position="bottom-center" 
        toastOptions={{ 
          className: '!bg-white dark:!bg-[#111] !text-[#111] dark:!text-white !border !border-[#E5E5E5] dark:!border-[#222]' 
        }} 
      />

      <SearchPalette 
        isOpen={cmdOpen} 
        onClose={() => setCmdOpen(false)} 
        onToggle={() => setCmdOpen((prev) => !prev)}
        searchData={searchData} 
        onSelect={handleSearchSelect} 
        placeholder="Search documentation or type a command..." 
      />
      
      {/* STATIC NODE: Toggles visibility via CSS to prevent React DevTools mounting crashes */}
      <div 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
      />
      
      <div className={`fixed bottom-0 left-0 top-0 z-50 w-[280px] transform border-r transition-transform duration-300 ease-in-out lg:hidden ${themeClasses.sidebar} ${themeClasses.border} ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className={`flex h-16 items-center justify-between border-b px-6 ${themeClasses.border}`}>
          <button onClick={() => router.push("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/refme-logo.svg" alt="RefMe Logo" className="h-6 w-6" />
            <span className="text-[12px] font-bold uppercase tracking-[0.25em]">RefMe</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(false)} className={`p-2 ${themeClasses.muted} ${themeClasses.hoverAccent}`}><X size={18} /></button>
        </div>
        <div className="h-full overflow-y-auto px-4 py-6 pb-24">
          <button onClick={() => router.push("/")} className={`mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${themeClasses.muted} ${themeClasses.hoverAccent}`}>
            <ArrowLeft size={14} /> <span>Directory</span>
          </button>
          <div className="space-y-1">
            {topics.map((item) => {
              const isActive = item.id === topicKey;
              const TopicIcon = getTopicIcon(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => { router.push(`/${item.id}`); setIsMobileMenuOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${isActive ? `${themeClasses.activeNavBg} font-semibold` : `text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10 dark:hover:text-white`}`}
                >
                  <TopicIcon size={16} className={isActive ? "opacity-100" : "opacity-60"} />
                  <span className="truncate">{item.title || item.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 h-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md`}>
        <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`lg:hidden p-1 ${themeClasses.muted} ${themeClasses.hoverAccent}`}><Menu size={20} /></button>
            <button onClick={() => router.push("/")} className="hidden lg:flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center">
                <img src="/refme-logo.svg" alt="RefMe Logo" className="h-7 w-7" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">RefMe</span>
            </button>
          </div>

          <div className="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
            <button onClick={() => setCmdOpen(true)} className={`flex w-full items-center justify-between rounded-full border px-4 py-1.5 transition-all hover:border-[#C699FF]/50 ${themeClasses.border} ${themeClasses.inputBg}`}>
              <div className="flex items-center gap-3 text-sm opacity-60"><Search className="h-4 w-4" /> <span>Search...</span></div>
              <span className={`hidden md:block rounded border border-current/20 px-1.5 py-0.5 text-[10px] font-bold opacity-50`}>{modifierKey}K</span>
            </button>
          </div>

          <button onClick={toggleTheme} className={`shrink-0 flex justify-center items-center min-w-[70px] rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${themeClasses.border} ${themeClasses.inputBg} ${themeClasses.hoverAccent}`}>
            <span className="block dark:hidden">Dark</span>
            <span className="hidden dark:block">Light</span>
          </button>
        </div>
      </header>

      <div className="flex-1 mx-auto flex w-full max-w-[1700px]">
        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[280px] shrink-0 overflow-y-auto border-r lg:block ${themeClasses.sidebar} ${themeClasses.border}`}>
          <div className="px-5 py-8 pb-24">
             <button onClick={() => router.push("/")} className={`mb-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${themeClasses.muted} ${themeClasses.hoverAccent}`}>
              <ArrowLeft size={14} /> <span>Directory</span>
            </button>
            <div className="space-y-1">
              {topics.map((item) => {
                const isActive = item.id === topicKey;
                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(`/${item.id}`)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-all duration-200 ${isActive ? `${themeClasses.activeNavBg} font-semibold border-l-2 border-[#C699FF]` : `text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10 dark:hover:text-white border-l-2 border-transparent`}`}
                  >
                    <span className="truncate">{item.title || item.id}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col relative">
          
          <div className={`sticky top-16 z-30 flex items-center gap-2 py-3 px-5 md:px-10 xl:px-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            <button onClick={() => router.push("/")} className={`shrink-0 transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}>
              <Home size={15} />
            </button>
            
            {/* STATIC NODES: Toggles flex/hidden based on state. Prevents DevTools crashing during scroll. */}
            <div className={`items-center gap-2 shrink-0 ${frontmatter?.category ? "flex" : "hidden"}`}>
              <ChevronRight size={14} className={`opacity-40 ${themeClasses.muted}`} />
              <button 
                onClick={() => router.push("/")}
                className={`text-[13px] font-medium transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}
              >
                {frontmatter?.category}
              </button>
            </div>

            <ChevronRight size={14} className={`shrink-0 opacity-40 ${themeClasses.muted}`} />

            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveOutlineId(null); }}
              className={`shrink-0 text-[13px] font-medium transition-colors ${!activeGroupTitle ? "text-[#6f45d6] dark:text-[#C699FF]" : `${themeClasses.muted} ${themeClasses.hoverAccent}`}`}
            >
              {currentTopicTitle}
            </button>

            <div className={`items-center gap-2 shrink-0 ${activeGroupTitle ? "flex" : "hidden"}`}>
              <ChevronRight size={14} className={`opacity-40 ${themeClasses.muted}`} />
              <button 
                onClick={() => activeGroupId && scrollToSection(activeGroupId)}
                className={`transition-colors text-[13px] font-medium ${!activeChildTitle ? "text-[#6f45d6] dark:text-[#C699FF]" : `${themeClasses.muted} ${themeClasses.hoverAccent}`}`}
              >
                {activeGroupTitle}
              </button>
            </div>

            <div className={`items-center gap-2 shrink-0 ${activeChildTitle ? "flex" : "hidden"}`}>
              <ChevronRight size={14} className={`opacity-40 ${themeClasses.muted}`} />
              <button
                onClick={() => activeChildId && scrollToSection(activeChildId)}
                className={`px-2 py-0.5 rounded text-[13px] font-medium bg-[#6f45d6]/10 text-[#6f45d6] dark:bg-[#C699FF]/15 dark:text-[#C699FF]`}
              >
                {activeChildTitle}
              </button>
            </div>
          </div>

          <div className="flex-1 px-5 pb-16 pt-6 md:px-10 lg:pt-10 xl:px-16 max-w-4xl mx-auto w-full">
            
            {/* STATIC NODE: Toggles block/hidden */}
            <div className={`mb-8 rounded-xl border xl:hidden ${themeClasses.border} ${themeClasses.sidebar} ${outlineGroups.length > 0 ? "block" : "hidden"}`}>
              <button onClick={() => setIsMobileTocOpen(!isMobileTocOpen)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold">
                <span className="flex items-center gap-2"><BookOpenText size={16} className="opacity-60" /> Table of Contents</span>
                <ChevronDown size={16} className={`transition-transform duration-200 opacity-60 ${isMobileTocOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-200 ease-in-out ${isMobileTocOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className={`border-t px-4 py-4 space-y-4 ${themeClasses.border}`}>
                    {outlineGroups.map((group) => (
                      <div key={group.id} className="space-y-2">
                        <a href={`#${group.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(group.id); setIsMobileTocOpen(false); }} className={`block text-[14px] font-medium ${activeOutlineId === group.id ? "text-[#6f45d6] dark:text-[#C699FF]" : themeClasses.muted}`}>
                          {group.title}
                        </a>
                        <div className={`ml-1 space-y-2 border-l pl-3 ${themeClasses.border} ${group.items.length > 0 ? "block" : "hidden"}`}>
                          {group.items.map((item) => (
                            <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); setIsMobileTocOpen(false); }} className={`block text-[13px] font-medium ${activeOutlineId === item.id ? "text-[#6f45d6] dark:text-[#C699FF]" : themeClasses.muted}`}>
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6 capitalize">{currentTopicTitle}</h1>
              {/* STATIC NODE: Toggles block/hidden */}
              <p className={`text-lg md:text-xl ${themeClasses.muted} leading-relaxed mb-10 ${frontmatter?.description ? "block" : "hidden"}`}>
                {frontmatter?.description}
              </p>
              {children}
            </article>

            <div className={`mt-10 xl:mt-16 flex flex-col items-center justify-center gap-10 border-t pt-10 ${themeClasses.border}`}>
              <div className="relative flex items-center justify-center h-8 w-full">
                <div className={`absolute inset-0 flex items-center justify-center w-full gap-4 transition-opacity duration-300 ${feedbackSubmitted ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                  <span className={`text-[13px] font-medium ${themeClasses.muted}`}>Was this page helpful?</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleFeedback(true)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border bg-transparent transition-all hover:bg-current/5 ${themeClasses.border} ${themeClasses.hoverAccent}`}
                    >
                      <span className="text-sm">👍</span>
                    </button>
                    <button 
                      onClick={() => handleFeedback(false)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border bg-transparent transition-all hover:bg-current/5 ${themeClasses.border} ${themeClasses.hoverAccent}`}
                    >
                      <span className="text-sm">👎</span>
                    </button>
                  </div>
                </div>
                <div className={`absolute inset-0 flex items-center justify-center w-full transition-opacity duration-300 ${feedbackSubmitted ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  <span className={`text-[13px] font-medium text-[#C699FF]`}>
                    Thank you for your feedback! 🎉
                  </span>
                </div>
              </div>

              <div className={`relative z-10 flex flex-col rounded-3xl border w-full max-w-2xl mx-auto shadow-sm overflow-hidden bg-white border-[#E5E5E5] dark:bg-[#0a0a0a] dark:border-[#333]`}>
                <div className={`p-6 sm:p-8 border-b bg-zinc-50 border-[#E5E5E5] dark:bg-[#111] dark:border-[#333]`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      <img 
                        src="https://github.com/yash-pluto.png" 
                        alt="Yash Vardhan" 
                        className={`h-20 w-20 rounded-full border-4 shadow-sm border-white dark:border-[#222]`} 
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <a href="https://yash-pluto.vercel.app/" target="_blank" rel="noopener noreferrer" className={`text-2xl font-extrabold tracking-tight hover:underline text-black dark:text-white`}>
                            Yash-Pluto
                          </a>
                          <BadgeCheck size={20} className="text-[#C699FF]" />
                        </div>
                        <p className={`text-sm font-medium ${themeClasses.muted}`}>Lead Maintainer</p>
                      </div>
                    </div>
                    <a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className="pt-1 hidden sm:block">
                      <FaGithub size={32} className={`text-zinc-900 dark:text-white hover:opacity-70 transition-opacity`} />
                    </a>
                  </div>
                  
                  <p className={`text-[15px] leading-relaxed mb-6 text-zinc-700 dark:text-zinc-300`}>
                    Join the community building the ultimate quick-reference. Contributions are welcome for all categories and languages.
                  </p>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#1a1a1a] dark:border-[#333] dark:shadow-inner`}>
                      <span className="text-[#C699FF] text-base font-black">✓</span>
                      <span className={`text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300`}>Open Source Architecture</span>
                    </div>
                    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#1a1a1a] dark:border-[#333] dark:shadow-inner`}>
                      <span className="text-[#C699FF] text-base font-black">✓</span>
                      <span className={`text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300`}>Community Driven Updates</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <GitPullRequest size={16} className="text-emerald-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Open PRs</span>
                      </div>
                      <span className={`text-2xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.openPrs}</span>
                    </div>
                    
                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <GitMerge size={16} className="text-purple-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Merged</span>
                      </div>
                      <span className={`text-2xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.mergedPrs}</span>
                    </div>

                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <CircleDot size={16} className="text-emerald-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Issues</span>
                      </div>
                      <span className={`text-2xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.openIssues}</span>
                    </div>

                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Star size={16} className="text-amber-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Stars</span>
                      </div>
                      <span className={`text-2xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.stars}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                      {/* STATIC NODE: Toggles flex/hidden */}
                      <div className={`items-center gap-3 ${githubStats.contributors.length > 0 ? "flex" : "hidden"}`}>
                        <div className="flex -space-x-4">
                          {githubStats.contributors.slice(0, 5).map((user: any, idx: number) => (
                            <img 
                              key={user.id} 
                              src={user.avatar_url} 
                              alt={user.login}
                              title={user.login}
                              className={`h-10 w-10 rounded-full border-[3px] border-white dark:border-[#0a0a0a] shadow-md`}
                              style={{ zIndex: 10 - idx, opacity: 1 - (idx * 0.12) }} 
                            />
                          ))}
                        </div>
                        <p className={`text-[11px] font-bold uppercase tracking-wider pl-1 ${themeClasses.muted}`}>
                          {githubStats.contributors.length > 5 ? `+${githubStats.contributors.length - 5} Devs` : 'Contributors'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a 
                        href={`https://github.com/yash-pluto/refme/edit/main/frontend/content/${topicKey}.mdx`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold border transition-colors border-[#E5E5E5] hover:bg-black/5 text-zinc-700 dark:border-[#333] dark:hover:bg-white/5 dark:text-zinc-300`}
                      >
                        Edit Page
                      </a>
                      <a 
                        href="https://github.com/yash-pluto/refme" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold transition-all active:scale-[0.98] bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200`}
                      >
                        <FaGithub size={16} /> Contribute
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-12 flex items-center justify-between gap-4 border-t pt-8 ${themeClasses.border}`}>
              {/* STATIC NODES: Replaced dynamic ternary with static layout toggled via CSS classes */}
              <div className="flex w-1/2">
                <button
                  onClick={() => prevTopic && router.push(`/${prevTopic.id}`)}
                  className={`w-full flex-col items-start gap-1.5 rounded-xl border p-4 transition-colors hover:border-[#C699FF] ${themeClasses.border} ${prevTopic ? "flex" : "hidden"}`}
                >
                  <span className={`text-[10px] uppercase tracking-[0.2em] opacity-60 ${themeClasses.muted}`}>Previous</span>
                  <span className="text-sm font-semibold text-left">{prevTopic?.title || prevTopic?.id}</span>
                </button>
              </div>

              <div className="flex w-1/2 justify-end">
                <button
                  onClick={() => nextTopic && router.push(`/${nextTopic.id}`)}
                  className={`w-full flex-col items-end gap-1.5 rounded-xl border p-4 text-right transition-colors hover:border-[#C699FF] ${themeClasses.border} ${nextTopic ? "flex" : "hidden"}`}
                >
                  <span className={`text-[10px] uppercase tracking-[0.2em] opacity-60 ${themeClasses.muted}`}>Next</span>
                  <span className="text-sm font-semibold text-right">{nextTopic?.title || nextTopic?.id}</span>
                </button>
              </div>
            </div>

          </div>
        </main>

        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 overflow-y-auto border-l xl:block ${themeClasses.sidebar} ${themeClasses.border}`}>
          <div className="px-6 py-10 pb-24">
            <div>
              <h4 className={`text-[11px] font-bold uppercase tracking-widest mb-5 ${themeClasses.muted}`}>Table of Contents</h4>
              <nav className="space-y-1.5">
                {outlineGroups.map((group) => {
                  const isActiveGroup = activeOutlineId === group.id;
                  return (
                    <div key={group.id} className="mb-4">
                      <a href={`#${group.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(group.id); }} className={`block text-[13px] tracking-tight font-semibold leading-snug transition-colors mb-2 ${isActiveGroup ? "text-[#6f45d6] drop-shadow-[0_0_8px_rgba(111,69,214,0.4)] dark:text-[#C699FF] dark:drop-shadow-[0_0_8px_rgba(198,153,255,0.4)]" : `${themeClasses.muted} hover:text-current`}`}>
                        {group.title}
                      </a>
                      {/* STATIC NODE: Toggles block/hidden */}
                      <div className={`border-l ml-[3px] pl-3 mt-1 space-y-2 ${themeClasses.border} ${group.items.length > 0 ? "block" : "hidden"}`}>
                        {group.items.map((item) => (
                          <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }} className={`block text-[12px] font-medium leading-snug transition-colors ${activeOutlineId === item.id ? "text-[#6f45d6] drop-shadow-[0_0_8px_rgba(111,69,214,0.4)] dark:text-[#C699FF] dark:drop-shadow-[0_0_8px_rgba(198,153,255,0.4)]" : `${themeClasses.muted} hover:text-current`}`}>
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>
      </div>

      <Footer />

      <button
        ref={scrollTopBtnRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg transition-all duration-300 md:bottom-24 md:right-12 pointer-events-none translate-y-8 opacity-0 bg-white border-[#E5E5E5] dark:bg-[#101010] dark:border-[#333] ${themeClasses.hoverAccent}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}