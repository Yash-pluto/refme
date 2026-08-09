"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../../src/context/ThemeContext";
import { useRouter } from "next/navigation";
import { FaGithub} from "react-icons/fa";
import {
  ArrowLeft,
  ArrowUp,
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
} from "lucide-react";

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
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [docSearch, setDocSearch] = useState("");
  const [domHeadings, setDomHeadings] = useState<
    Array<{ id: string; title: string; depth: number }>
  >([]);

  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Scroll to Top state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // UX Enhancements: OS detection for the shortcut hint
  const [isMounted, setIsMounted] = useState(false);
  const [modifierKey, setModifierKey] = useState("⌘");

  useEffect(() => {
    setIsMounted(true);
    // Detect if the user is on a Mac or Apple device
    if (typeof window !== "undefined") {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      setModifierKey(isMac ? "⌘" : "Ctrl ");
    }
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Scroll to Top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, [children, topicKey]);

  const activeHeadings = headings.length > 0 ? headings : domHeadings;
  const normalizedQuery = docSearch.trim().toLowerCase();
  const hasSearchQuery = normalizedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!hasSearchQuery) return [];

    const sectionMatches = activeHeadings
      .filter((heading) =>
        heading.title.toLowerCase().includes(normalizedQuery),
      )
      .map((heading) => ({
        id: heading.id,
        title: heading.title,
        type: "section" as const,
        depth: heading.depth,
      }));

    const topicMatches = topics
      .filter((item) => {
        const title = (item.title || item.id || "").toLowerCase();
        const description = (item.description || "").toLowerCase();
        return (
          title.includes(normalizedQuery) ||
          description.includes(normalizedQuery)
        );
      })
      .map((item) => ({
        id: item.id,
        title: item.title || item.id,
        type: "topic" as const,
        depth: 1,
      }));

    return [...sectionMatches, ...topicMatches].slice(0, 12);
  }, [activeHeadings, hasSearchQuery, normalizedQuery, topics]);

  // Decoupled outlineGroups from search state
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

  const [expandedOutline, setExpandedOutline] = useState<Record<string, boolean>>({});
  const [activeOutlineId, setActiveOutlineId] = useState<string | null>(null);

  useEffect(() => {
    const ids = outlineGroups.flatMap((group) => [
      group.id,
      ...group.items.map((item) => item.id),
    ]);
    if (ids.length === 0) {
      setActiveOutlineId(null);
      return;
    }

    const updateActiveOutline = () => {
      const offset = 140;
      let currentId: string | null = ids[0] ?? null;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= offset) {
          currentId = id;
        }
      }

      setActiveOutlineId((previous) =>
        previous === currentId ? previous : currentId,
      );
    };

    updateActiveOutline();
    window.addEventListener("scroll", updateActiveOutline, { passive: true });
    window.addEventListener("resize", updateActiveOutline);

    return () => {
      window.removeEventListener("scroll", updateActiveOutline);
      window.removeEventListener("resize", updateActiveOutline);
    };
  }, [outlineGroups]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.metaKey || event.ctrlKey;
      if (!isModifier || event.key.toLowerCase() !== "k") return;

      event.preventDefault();
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setDocSearch("");
      searchInputRef.current?.blur();
    }
  };

  useEffect(() => {
    setExpandedOutline((previous) => {
      const next: Record<string, boolean> = { ...previous };
      outlineGroups.forEach((group, index) => {
        next[group.id] = index === 0 ? true : Boolean(previous[group.id]);
      });
      return next;
    });
  }, [outlineGroups]);

  const theme = {
    page: darkMode ? "bg-[#050505] text-[#F5F5F5]" : "bg-[#F5F3EE] text-[#111111]",
    header: darkMode ? "bg-[#050505]/85" : "bg-[#F5F3EE]/85",
    panel: darkMode ? "bg-[#050505]" : "bg-[#F5F3EE]",
    border: darkMode ? "border-[#1A1A1A]" : "border-[#DFE1DA]",
    muted: darkMode ? "text-[#8A8A8A]" : "text-[#666C73]",
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

  const scrollToSection = (id: string) => {
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 88;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper to extract the proper title for the breadcrumb
  const currentTopicTitle = topics.find((t) => t.id === topicKey)?.title || frontmatter?.title || topicKey;

  return (
    <div className={`${theme.page} min-h-screen font-sans selection:bg-[#C699FF]/25 transition-colors duration-200`}>
      
      {/* MOBILE DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE DRAWER SIDEBAR */}
      <div
        className={`fixed bottom-0 left-0 top-0 z-50 w-[280px] transform border-r transition-transform duration-300 ease-in-out lg:hidden ${theme.panel} ${theme.border} ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex h-16 items-center justify-between border-b px-4 ${theme.border}`}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
            <span className={`${theme.accent}`}>RefMe</span>
            <span className={`${theme.muted}`}>docs</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 transition-colors ${theme.muted} ${theme.hoverAccent}`}
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
              className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors ${theme.muted} ${theme.hoverAccent}`}
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

      {/* HEADER */}
      <header className={`sticky top-0 z-40 h-16 border-b ${theme.border} ${theme.header} backdrop-blur-md`}>
        <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between gap-3 px-4 md:gap-4 md:px-6">
          <div className="flex items-center gap-3 shrink-0">
            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden -ml-1 p-2 transition-colors ${theme.muted} ${theme.hoverAccent}`}
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
              <span className={`${theme.accent}`}>RefMe</span>
              <span className={`${theme.muted}`}>docs</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              
              {/* SEARCH BAR */}
              <div className={`relative flex w-full items-center rounded-full border transition-all duration-200 ${theme.border} ${theme.input} ${docSearch ? "border-[#C699FF]/70 shadow-[0_0_0_1px_rgba(198,153,255,0.38)]" : "focus-within:border-[#C699FF]/60"}`}>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />
                
                <input
                  ref={searchInputRef}
                  value={docSearch}
                  onChange={(event) => setDocSearch(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  aria-label="Search docs"
                  placeholder="Search topics..."
                  className="w-full bg-transparent py-2 pl-10 pr-16 text-sm outline-none placeholder:text-current placeholder:opacity-50"
                />
                
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-end">
                  {docSearch ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDocSearch("");
                        searchInputRef.current?.focus();
                      }}
                      className="rounded-full border border-current/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] opacity-70 transition hover:opacity-100"
                    >
                      Clear
                    </button>
                  ) : (
                    <span className={`hidden md:block rounded-full border border-current/15 px-1.5 py-0.5 text-[10px] font-medium uppercase opacity-60 transition-opacity duration-200 ${isMounted ? "opacity-60" : "opacity-0"}`}>
                      {modifierKey}K
                    </span>
                  )}
                </div>
              </div>

              {/* SEARCH RESULTS DROPDOWN */}
              {hasSearchQuery && (
                <div className={`absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border shadow-lg ${theme.border} ${theme.panel}`}>
                  {searchResults.length > 0 ? (
                    <div className="max-h-[320px] overflow-y-auto p-2">
                      {searchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() => {
                            if (result.type === "topic") {
                              router.push(`/${result.id}`);
                            } else {
                              scrollToSection(result.id);
                            }
                            setDocSearch("");
                          }}
                          className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-current/5"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">
                              {result.title}
                            </div>
                            <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] opacity-60">
                              {result.type === "topic" ? "Topic" : result.depth === 2 ? "Section" : "Subsection"}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={`px-3 py-3 text-sm ${theme.muted}`}>
                      No matching topics or sections
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${theme.border} ${theme.soft} ${theme.hoverAccent}`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1700px]">
        
        {/* DESKTOP LEFT SIDEBAR */}
        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 border-r lg:flex lg:flex-col ${theme.border}`}>
          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8">
            <div className="mb-6 px-2">
              <button
                onClick={() => router.push("/")}
                className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors ${theme.muted} ${theme.hoverAccent}`}
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

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 px-4 py-6 md:px-8 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-[780px] min-w-0">
            
            {/* MOBILE IN-PAGE TOC */}
            {outlineGroups.length > 0 && (
              <div className={`mb-8 rounded-xl border xl:hidden ${theme.border} ${theme.panel}`}>
                <button
                  type="button"
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                >
                  <span className="flex items-center gap-2">
                    <BookOpenText size={16} className={`opacity-70 ${theme.muted}`} />
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
                    <div className={`border-t px-4 py-4 space-y-4 ${theme.border}`}>
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
                                  : `${theme.muted} hover:text-current`
                              }`}
                            >
                              {group.title}
                            </a>
                            
                            {group.items.length > 0 && (
                              <div className={`ml-1 space-y-2 border-l pl-3 ${theme.border}`}>
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
                                          : `${theme.muted} hover:text-current`
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

            {/* BREADCRUMBS */}
            <nav className={`mb-6 flex items-center gap-2 text-[13px] font-medium ${theme.muted}`}>
              <button onClick={() => router.push("/")} className={`transition-colors ${theme.hoverAccent}`}>
                Directory
              </button>
              <ChevronRight size={14} className="opacity-50" />
              <span className={darkMode ? "text-zinc-200" : "text-zinc-900"}>
                {currentTopicTitle}
              </span>
            </nav>

            <article className="prose prose-sm max-w-none min-w-0 overflow-x-auto dark:prose-invert">
              {children}
            </article>

            {/* USER ENGAGEMENT & GITHUB EDIT */}
            <div className={`mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 sm:flex-row sm:gap-4 ${theme.border}`}>
              <div className="flex items-center gap-4">
                <span className={`text-[13px] font-medium ${theme.muted}`}>Was this page helpful?</span>
                <div className="flex gap-2">
                  <button className={`flex h-8 w-8 items-center justify-center rounded-lg border bg-transparent transition-all hover:bg-current/5 ${theme.border} ${theme.hoverAccent}`}>
                    <span className="text-sm">👍</span>
                  </button>
                  <button className={`flex h-8 w-8 items-center justify-center rounded-lg border bg-transparent transition-all hover:bg-current/5 ${theme.border} ${theme.hoverAccent}`}>
                    <span className="text-sm">👎</span>
                  </button>
                </div>
              </div>
              <a
                href={`https://github.com/yash-pluto/refme/edit/main/frontend/content/${topicKey}.mdx`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${theme.muted} ${theme.hoverAccent}`}
              >
                <FaGithub size={14} />
                <span>Edit this page on GitHub</span>
              </a>
            </div>

          </div>

          {/* BOTTOM PAGINATION */}
          <div className={`mx-auto mt-16 max-w-[820px] border-t pt-8 ${theme.border}`}>
            <div className="flex items-center justify-between gap-4">
              {prevTopic ? (
                <button
                  type="button"
                  onClick={() => router.push(`/${prevTopic.id}`)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left transition-colors hover:border-current/30 ${theme.border} ${theme.soft}`}
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
                  className={`ml-auto flex items-center gap-2 rounded-lg border px-4 py-3 text-right transition-colors hover:border-current/30 ${theme.border} ${theme.soft}`}
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

        {/* DESKTOP RIGHT SIDEBAR */}
        <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-[240px] shrink-0 xl:block`}>
          <div className="h-full overflow-y-auto px-5 py-8">
            <p className={`mb-4 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${theme.muted}`}>
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
                            : `${theme.muted} ${theme.hoverAccent}`
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
                            <div className={`mt-0.5 space-y-0.5 border-l px-1 ml-3 ${theme.border}`}>
                              {group.items.map((item) => {
                                const isActiveItem = activeOutlineId === item.id;

                                return (
                                  <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setActiveOutlineId(item.id);
                                      scrollToSection(item.id);
                                    }}
                                    className={`block truncate rounded-md px-2 py-1 text-[13px] font-medium transition-colors duration-200 ${
                                      isActiveItem
                                        ? darkMode
                                          ? "text-[#C699FF]"
                                          : "text-[#6f45d6]"
                                        : `${theme.muted} ${theme.hoverAccent}`
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
                <div className={`px-2 text-[13px] ${theme.muted}`}>
                  No sections yet
                </div>
              )}
            </nav>
          </div>
        </aside>
      </div>

      {/* SCROLL TO TOP FAB */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 md:bottom-10 md:right-10 ${
          showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
        } ${theme.panel} ${theme.border} ${theme.hoverAccent}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}