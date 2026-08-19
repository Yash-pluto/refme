"use client";

/**
 * @fileoverview Layout wrapper for individual documentation topics.
 * Handles layout composition, dynamic TOC generation, scroll-spy navigation,
 * and integrates the global Command Palette search.
 *
 * @author Yash Vardhan
 */

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import {useTheme} from "../../src/context/ThemeContext";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import SearchPalette, { useSearchOSKey, SearchItem } from "../components/SearchPalette";
import {
  ArrowLeft,
  ArrowUp,
  BookOpenText,
  Braces,
  ChevronDown,
  ChevronRight,
  Code2,
  Globe,
  Menu,
  Search,
  TerminalSquare,
  Workflow,
  X,
  Monitor,
  Link as LinkIcon,
} from "lucide-react";

/**
 * Primary layout renderer for documentation topics.
 */
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
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const [domHeadings, setDomHeadings] = useState<
    Array<{ id: string; title: string; depth: number }>
  >([]);

  const [cmdOpen, setCmdOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const { modifierKey, isMounted } = useSearchOSKey();

  const [expandedOutline, setExpandedOutline] = useState<Record<string, boolean>>({});
  const [activeOutlineId, setActiveOutlineId] = useState<string | null>(null);

  /**
   * High-performance DOM refs.
   * I opted to manipulate the DOM directly during scroll events rather than utilizing
   * React state to prevent layout thrashing and maintain 60fps.
   * - Yash Vardhan
   */
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTopBtnRef = useRef<HTMLButtonElement>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const headingElementsRef = useRef<{ id: string; el: HTMLElement }[]>([]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || cmdOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, cmdOpen]);

  useEffect(() => {
    const article = document.querySelector("article");
    const headingNodes = article
      ? Array.from(article.querySelectorAll("h2[id], h3[id]"))
      : [];

    const nextHeadings = headingNodes.map((node) => ({
      id: node.id,
      title: node.textContent?.trim() || node.id,
      depth: node.tagName === "H3" ? 3 : 2,
    }));

    setDomHeadings(nextHeadings);
    setFeedbackSubmitted(false);
  }, [children, topicKey]);

  const activeHeadings = headings.length > 0 ? headings : domHeadings;

  /**
   * Transforms raw heading and topic data into the standard SearchItem contract
   * required by the global SearchPalette component.
   * - Yash Vardhan
   */
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
    if (item.type === "topic" && item.href) {
      router.push(item.href);
    } else if (item.type === "section") {
      scrollToSection(item.id);
    }
  };

  const outlineGroups = useMemo(() => {
    const groups: Array<{
      id: string;
      title: string;
      items: Array<{ id: string; title: string }>;
    }> = [];
    let activeGroup: {
      id: string;
      title: string;
      items: Array<{ id: string; title: string }>;
    } | null = null;

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

  /**
   * Caching heading elements on mount. Executing document.getElementById inside
   * the scroll event listener creates excessive CPU load.
   * - Yash Vardhan
   */
  useEffect(() => {
    const ids = outlineGroups.flatMap((group) => [
      group.id,
      ...group.items.map((item) => item.id),
    ]);

    headingElementsRef.current = ids
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter(Boolean) as { id: string; el: HTMLElement }[];
  }, [outlineGroups]);

  /**
   * Unified requestAnimationFrame scroll loop.
   * Batches progress bar sizing, visibility toggles, and scroll-spy calculations
   * into a single repaint cycle to eliminate jittering.
   * - Yash Vardhan
   */
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
              const safeProgress = Math.min(100, Math.max(0, progress));
              progressBarRef.current.style.width = `${safeProgress}%`;
              progressBarRef.current.style.boxShadow = safeProgress > 0 ? '0 0 10px rgba(198, 153, 255, 0.5)' : 'none';
            }
          }

          if (!isClickScrolling.current && headingElementsRef.current.length > 0) {
            let currentActiveId = null;

            for (const { id, el } of headingElementsRef.current) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 120) {
                currentActiveId = id;
              } else {
                break;
              }
            }

            if (!currentActiveId && currentScrollY < 50) {
              currentActiveId = headingElementsRef.current[0].id;
            }

            if (currentActiveId) {
              setActiveOutlineId((prev) => (prev !== currentActiveId ? currentActiveId : prev));
            }
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
    setExpandedOutline((previous) => {
      const next: Record<string, boolean> = { ...previous };
      outlineGroups.forEach((group, index) => {
        next[group.id] = index === 0 ? true : Boolean(previous[group.id]);
      });
      return next;
    });
  }, [outlineGroups]);

  const themeClasses = {
    page: darkMode ? "bg-[#050505] text-[#F5F5F5]" : "bg-[#F5F3EE] text-[#111111]",
    header: darkMode ? "bg-[#050505]/85" : "bg-[#fcfbf9]/85",
    panel: darkMode ? "bg-[#050505]" : "bg-white",
    border: darkMode ? "border-white/10" : "border-black/10",
    muted: darkMode ? "text-zinc-400" : "text-zinc-500",
    soft: darkMode ? "bg-[#0D0D0D] text-[#F5F5F5]" : "bg-[#F0EFEA] text-[#111111]",
    active: darkMode ? "bg-[#111111] text-white" : "bg-white text-black",
    accent: darkMode ? "text-zinc-100" : "text-zinc-800",
    hoverAccent: darkMode ? "hover:text-white" : "hover:text-zinc-900",
    input: darkMode ? "border-[#1D1D1D] bg-[#0B0B0B]" : "border-[#DDE0D7] bg-[#F7F6F3]",
    sidebar: darkMode ? "bg-[#050505]" : "bg-[#F2F0EA]",
    navItem: darkMode ? "text-[#F5F5F5]" : "text-[#111111]",
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

    const headerOffset = 88;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });

    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFeedback = (isPositive: boolean) => {
    setFeedbackSubmitted(true);
    if (isPositive) {
      toast.success("Glad it helped! Thanks for the feedback.");
    } else {
      toast("Thanks for the feedback! We'll work on improving this.", {
        icon: '📝',
      });
    }
  };

  const currentTopicTitle = topics.find((t) => t.id === topicKey)?.title || frontmatter?.title || topicKey;

  return (
    <div className={`${themeClasses.page} min-h-screen font-sans selection:bg-[#C699FF]/25 transition-colors duration-200`}>
      
      <div 
        ref={progressBarRef}
        className="fixed left-0 top-0 z-[100] h-1 bg-[#C699FF] will-change-[width]" 
        style={{ width: "0%" }} 
      />

      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: darkMode ? '#111111' : '#fff',
            color: darkMode ? '#fff' : '#111111',
            border: `1px solid ${darkMode ? '#1A1A1A' : '#DFE1DA'}`,
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      />

      <SearchPalette 
        isOpen={cmdOpen} 
        onClose={() => setCmdOpen(false)} 
        searchData={searchData} 
        onSelect={handleSearchSelect} 
        placeholder="Search documentation or type a command..."
      />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 top-0 z-50 w-[280px] transform border-r transition-transform duration-300 ease-in-out lg:hidden ${themeClasses.panel} ${themeClasses.border} ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex h-16 items-center justify-between border-b px-4 ${themeClasses.border}`}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
            <span className={`${themeClasses.accent}`}>RefMe</span>
            <span className={`${themeClasses.muted}`}>docs</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-full overflow-y-auto px-4 py-6 pb-24">
          <div className="mb-6 px-2">
            <button
              onClick={() => {
                router.push("/");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}
            >
              <ArrowLeft size={14} className="opacity-80" />
              <span>Directory</span>
            </button>
          </div>

          <div className="space-y-1">
            {topics.map((item) => {
              const isActive = item.id === topicKey;
              const TopicIcon = getTopicIcon(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    router.push(`/${item.id}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                    isActive
                      ? darkMode
                        ? "bg-white/10 font-semibold text-white"
                        : "bg-black/5 font-semibold text-black"
                      : darkMode
                        ? "font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
                        : "font-medium text-zinc-600 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  <TopicIcon size={16} className={`shrink-0 ${isActive ? "opacity-100" : "opacity-60"}`} />
                  <span className="truncate tracking-tight">{item.title || item.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 h-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md`}>
        <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between gap-3 px-4 md:gap-4 md:px-6">
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden -ml-1 p-2 transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-md bg-[#0F1115] text-white shadow-sm ring-1 ring-white/10">
              <span className="text-lg font-black leading-none tracking-[-0.14em]">
                R<span className="text-zinc-500">_</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
              <span className={`${themeClasses.accent}`}>RefMe</span>
              <span className={`${themeClasses.muted}`}>docs</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className={`flex w-full max-w-xl items-center justify-between rounded-full border px-4 py-2 transition-all duration-200 hover:border-[#C699FF]/60 ${themeClasses.border} ${themeClasses.input}`}
            >
              <div className="flex items-center gap-3 text-sm opacity-50">
                <Search className="h-4 w-4" />
                <span>Search topics or commands...</span>
              </div>
              <span className={`hidden rounded-full border border-current/15 px-1.5 py-0.5 text-[10px] font-medium uppercase opacity-60 transition-opacity duration-200 md:block ${isMounted ? "opacity-60" : "opacity-0"}`}>
                {modifierKey}K
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${themeClasses.border} ${themeClasses.soft} ${themeClasses.hoverAccent}`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1700px]">
        
        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 border-r lg:flex lg:flex-col ${themeClasses.border}`}>
          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8">
            <div className="mb-6 px-2">
              <button
                onClick={() => router.push("/")}
                className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}
              >
                <ArrowLeft size={14} className="opacity-80" />
                <span>Directory</span>
              </button>
            </div>

            <div className="space-y-1">
              {topics.map((item) => {
                const isActive = item.id === topicKey;
                const TopicIcon = getTopicIcon(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => router.push(`/${item.id}`)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                      isActive
                        ? darkMode
                          ? "bg-white/10 font-semibold text-white"
                          : "bg-black/5 font-semibold text-black"
                        : darkMode
                          ? "font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
                          : "font-medium text-zinc-600 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    <TopicIcon size={16} className={`shrink-0 ${isActive ? "opacity-100" : "opacity-60"}`} />
                    <span className="truncate tracking-tight">
                      {item.title || item.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 md:px-8 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-[780px] min-w-0">
            
            {outlineGroups.length > 0 && (
              <div className={`mb-8 rounded-xl border xl:hidden ${themeClasses.border} ${themeClasses.panel}`}>
                <button
                  type="button"
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                >
                  <span className="flex items-center gap-2">
                    <BookOpenText size={16} className={`opacity-70 ${themeClasses.muted}`} />
                    On this page
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 opacity-70 ${isMobileTocOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isMobileTocOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className={`border-t px-4 py-4 space-y-4 ${themeClasses.border}`}>
                      {outlineGroups.map((group) => {
                        const isActiveGroup = activeOutlineId === group.id;

                        return (
                          <div key={group.id} className="space-y-2">
                            <a
                              href={`#${group.id}`}
                              onClick={(event) => {
                                event.preventDefault();
                                scrollToSection(group.id);
                                setIsMobileTocOpen(false);
                              }}
                              className={`block text-[14px] font-medium transition-colors ${
                                isActiveGroup
                                  ? darkMode
                                    ? "text-[#C699FF]"
                                    : "text-[#6f45d6]"
                                  : `${themeClasses.muted} hover:text-current`
                              }`}
                            >
                              {group.title}
                            </a>
                            
                            {group.items.length > 0 && (
                              <div className={`ml-1 space-y-2 border-l pl-3 ${themeClasses.border}`}>
                                {group.items.map((item) => {
                                  const isActiveItem = activeOutlineId === item.id;
                                  return (
                                    <a
                                      key={item.id}
                                      href={`#${item.id}`}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        scrollToSection(item.id);
                                        setIsMobileTocOpen(false);
                                      }}
                                      className={`block text-[13px] font-medium transition-colors ${
                                        isActiveItem
                                          ? darkMode
                                            ? "text-[#C699FF]"
                                            : "text-[#6f45d6]"
                                          : `${themeClasses.muted} hover:text-current`
                                      }`}
                                    >
                                      {item.title}
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <nav className={`mb-6 flex items-center gap-2 text-[13px] font-medium ${themeClasses.muted}`}>
              <button onClick={() => router.push("/")} className={`transition-colors ${themeClasses.hoverAccent}`}>
                Directory
              </button>
              <ChevronRight size={14} className="opacity-50" />
              <span className={darkMode ? "text-zinc-200" : "text-zinc-900"}>
                {currentTopicTitle}
              </span>
            </nav>

            <article className="prose prose-sm max-w-none min-w-0 overflow-x-auto dark:prose-invert">
              <div className="mb-10">
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl capitalize">
                  {currentTopicTitle}
                </h1>
                {frontmatter?.description && (
                  <p className={`text-lg ${themeClasses.muted} mt-2 leading-relaxed`}>
                    {frontmatter.description}
                  </p>
                )}
              </div>
              {children}
            </article>

            <div className={`mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 sm:flex-row sm:gap-4 ${themeClasses.border}`}>
              <div className="flex items-center gap-4">
                {feedbackSubmitted ? (
                  <span className={`text-[13px] font-medium text-[#C699FF]`}>
                    Thank you for your feedback! 🎉
                  </span>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <a
                href={`https://github.com/yash-pluto/refme/edit/main/frontend/content/${topicKey}.mdx`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${themeClasses.muted} ${themeClasses.hoverAccent}`}
              >
                <FaGithub size={14} />
                <span>Edit this page on GitHub</span>
              </a>
            </div>

          </div>

          <div className={`mx-auto mt-16 max-w-[820px] border-t pt-8 ${themeClasses.border}`}>
            <div className="flex items-center justify-between gap-4">
              {prevTopic ? (
                <button
                  type="button"
                  onClick={() => router.push(`/${prevTopic.id}`)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left transition-colors hover:border-current/30 ${themeClasses.border} ${themeClasses.soft}`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Previous</span>
                  <span className="text-sm font-semibold">{prevTopic.title || prevTopic.id}</span>
                </button>
              ) : (
                <div />
              )}

              {nextTopic ? (
                <button
                  type="button"
                  onClick={() => router.push(`/${nextTopic.id}`)}
                  className={`ml-auto flex items-center gap-2 rounded-lg border px-4 py-3 text-right transition-colors hover:border-current/30 ${themeClasses.border} ${themeClasses.soft}`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Next</span>
                  <span className="text-sm font-semibold">{nextTopic.title || nextTopic.id}</span>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>

        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[240px] shrink-0 xl:block`}>
          <div className="h-full overflow-y-auto px-5 py-8">
            <p className={`mb-4 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${themeClasses.muted}`}>
              On this page
            </p>

            <nav className="space-y-1">
              {outlineGroups.length > 0 ? (
                outlineGroups.map((group) => {
                  const isExpanded = !!expandedOutline[group.id];
                  const isActiveGroup = activeOutlineId === group.id;

                  return (
                    <div key={group.id} className="space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedOutline((previous) => ({
                            ...previous,
                            [group.id]: !previous[group.id],
                          }));
                          scrollToSection(group.id);
                        }}
                        className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors duration-200 ${
                          isActiveGroup
                            ? darkMode
                              ? "text-[#C699FF]"
                              : "text-[#6f45d6]"
                            : `${themeClasses.muted} ${themeClasses.hoverAccent}`
                        }`}
                      >
                        <span className="truncate">{group.title}</span>
                        {group.items.length > 0 && (
                          <ChevronDown
                            size={14}
                            className={`shrink-0 opacity-50 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                      <div
                        className={`grid transition-all duration-200 ease-in-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          {group.items.length > 0 && (
                            <div className={`mt-0.5 space-y-0.5 border-l px-1 ml-3 ${themeClasses.border}`}>
                              {group.items.map((item) => {
                                const isActiveItem = activeOutlineId === item.id;

                                return (
                                  <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      scrollToSection(item.id);
                                    }}
                                    className={`block truncate rounded-md px-2 py-1 text-[13px] font-medium transition-colors duration-200 ${
                                      isActiveItem
                                        ? darkMode
                                          ? "text-[#C699FF]"
                                          : "text-[#6f45d6]"
                                        : `${themeClasses.muted} ${themeClasses.hoverAccent}`
                                    }`}
                                  >
                                    {item.title}
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`px-2 text-[13px] ${themeClasses.muted}`}>
                  No sections yet
                </div>
              )}
            </nav>
          </div>
        </aside>
      </div>

      <button
        ref={scrollTopBtnRef}
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 md:bottom-10 md:right-10 pointer-events-none translate-y-8 opacity-0 ${themeClasses.panel} ${themeClasses.border} ${themeClasses.hoverAccent}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}