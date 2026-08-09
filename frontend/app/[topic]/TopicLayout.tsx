"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../../src/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpenText,
  Braces,
  ChevronDown,
  Code2,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
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
      const headingQuery = heading.title.toLowerCase();
      const matchesQuery =
        !hasSearchQuery || headingQuery.includes(normalizedQuery);

      if (heading.depth === 2) {
        if (hasSearchQuery && !matchesQuery) continue;

        activeGroup = { id: heading.id, title: heading.title, items: [] };
        groups.push(activeGroup);
        continue;
      }

      if (heading.depth === 3 && activeGroup) {
        if (!hasSearchQuery || matchesQuery) {
          activeGroup.items.push({ id: heading.id, title: heading.title });
        }
      }
    }

    return groups;
  }, [activeHeadings, hasSearchQuery, normalizedQuery]);

  const [expandedOutline, setExpandedOutline] = useState<
    Record<string, boolean>
  >({});
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

  useEffect(() => {
    setExpandedOutline((previous) => {
      const next: Record<string, boolean> = { ...previous };
      outlineGroups.forEach((group, index) => {
        next[group.id] = index === 0 ? true : Boolean(previous[group.id]);
      });
      return next;
    });
  }, [outlineGroups]);

  const sectionGroups = useMemo(() => {
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

    for (const heading of headings) {
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
  }, [headings]);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setExpandedSections((previous) => {
      const next: Record<string, boolean> = { ...previous };
      for (const group of sectionGroups) {
        if (!(group.id in next)) {
          next[group.id] = true;
        }
      }
      return next;
    });
  }, [sectionGroups]);

  const theme = {
    page: darkMode
      ? "bg-[#050505] text-[#F5F5F5]"
      : "bg-[#F5F3EE] text-[#111111]",
    panel: darkMode ? "bg-[#050505]" : "bg-[#F5F3EE]",
    border: darkMode ? "border-[#1A1A1A]" : "border-[#DFE1DA]",
    muted: darkMode ? "text-[#8A8A8A]" : "text-[#666C73]",
    soft: darkMode
      ? "bg-[#0D0D0D] text-[#F5F5F5]"
      : "bg-[#F0EFEA] text-[#111111]",
    active: darkMode ? "bg-[#111111] text-white" : "bg-white text-black",
    accent: darkMode ? "text-zinc-100" : "text-zinc-800",
    hoverAccent: darkMode ? "hover:text-white" : "hover:text-zinc-900",
    input: darkMode
      ? "border-[#1D1D1D] bg-[#0B0B0B]"
      : "border-[#DDE0D7] bg-[#F7F6F3]",
    sidebar: darkMode ? "bg-[#050505]" : "bg-[#F2F0EA]",
    navItem: darkMode ? "text-[#F5F5F5]" : "text-[#111111]",
  };

  const getTopicIcon = (topicId: string) => {
    const value = topicId.toLowerCase();

    if (value.includes("javascript") || value.includes("js"))
      return TerminalSquare;
    if (value.includes("python")) return Braces;
    if (value.includes("react")) return Workflow;
    if (value.includes("cpp") || value.includes("c++")) return Code2;
    return BookOpenText;
  };

  const getSectionIcon = (title: string) => {
    const value = title.toLowerCase();

    if (
      value.includes("getting") ||
      value.includes("overview") ||
      value.includes("introduction")
    )
      return BookOpenText;
    if (
      value.includes("variable") ||
      value.includes("data") ||
      value.includes("types")
    )
      return Braces;
    if (value.includes("console") || value.includes("terminal"))
      return TerminalSquare;
    if (
      value.includes("function") ||
      value.includes("module") ||
      value.includes("async")
    )
      return Code2;
    if (
      value.includes("security") ||
      value.includes("protection") ||
      value.includes("rules")
    )
      return ShieldCheck;
    if (
      value.includes("best practice") ||
      value.includes("tips") ||
      value.includes("patterns")
    )
      return Sparkles;
    if (
      value.includes("workflow") ||
      value.includes("lifecycle") ||
      value.includes("reconciliation")
    )
      return Workflow;
    return BookOpenText;
  };

  const scrollToSection = (id: string) => {
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 88;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className={`${theme.page} min-h-screen font-sans selection:bg-[#C699FF]/25 transition-colors duration-200`}
    >
      <header
        className={`sticky top-0 z-40 border-b ${theme.border} ${theme.panel} backdrop-blur-sm`}
      >
        <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0F1115] text-white shadow-sm ring-1 ring-white/10">
              <span className="text-lg font-black leading-none tracking-[-0.14em]">
                R<span className="text-zinc-500">_</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
              <span className={`${theme.accent}`}>RefMe</span>
              <span className={`${theme.muted}`}>docs</span>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-xl">
              <div
                className={`flex w-full items-center gap-3 rounded-full border px-3 py-2 transition-all duration-200 ${theme.border} ${theme.input} ${docSearch ? "border-[#C699FF]/70 shadow-[0_0_0_1px_rgba(198,153,255,0.38)]" : "focus-within:border-[#C699FF]/60"}`}
              >
                <Search className="h-4 w-4 opacity-70" />
                <input
                  ref={searchInputRef}
                  value={docSearch}
                  onChange={(event) => setDocSearch(event.target.value)}
                  aria-label="Search docs"
                  placeholder="Search topics and sections..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-50"
                />
                {docSearch ? (
                  <button
                    type="button"
                    onClick={() => setDocSearch("")}
                    className="rounded-full border border-current/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] opacity-70 transition hover:opacity-100"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                ) : (
                  <span className="rounded-full border border-current/15 px-1.5 py-0.5 text-[10px] font-medium uppercase opacity-60">
                    ⌘K
                  </span>
                )}
              </div>

              {hasSearchQuery && (
                <div
                  className={`absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border shadow-lg ${theme.border} ${theme.panel}`}
                >
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
                              {result.type === "topic"
                                ? "Topic"
                                : result.depth === 2
                                  ? "Section"
                                  : "Subsection"}
                            </div>
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.18em] opacity-60">
                            Go
                          </span>
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
            className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${theme.border} ${theme.soft} ${theme.hoverAccent}`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1700px]">
        <aside
          className={`hidden w-[280px] shrink-0 border-r lg:flex lg:flex-col`}
        >
          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
            <div className="mb-6 px-2">
              <button
                onClick={() => router.push("/")}
                className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${theme.muted} ${theme.hoverAccent}`}
              >
                <ArrowLeft size={14} className="opacity-80" />
                <span>Directory</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {topics.map((item) => {
                const isActive = item.id === topicKey;
                const TopicIcon = getTopicIcon(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => router.push(`/${item.id}`)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? darkMode
                          ? "border-white/10 bg-[#111111] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
                          : "border-[#ded9d1] bg-[#f4f1eb] text-[#111111] shadow-[inset_0_0_0_1px_rgba(17,17,17,0.04)]"
                        : darkMode
                          ? "border-transparent bg-[#0D0D0D] text-zinc-200 hover:border-white/10 hover:bg-[#111111]"
                          : "border-transparent bg-[#f7f4ef] text-[#111111] hover:border-[#d9d1c7] hover:bg-[#f2efe9]"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border ${isActive ? (darkMode ? "border-white/15 bg-white/5 text-white" : "border-[#d9d1c7] bg-[#f0ece6] text-[#111111]") : darkMode ? "border-white/10 bg-transparent text-zinc-300" : "border-[#dad2c7] bg-[#f3efe9] text-[#111111]"}`}
                    >
                      <TopicIcon size={15} className="shrink-0" />
                    </span>
                    <span className="truncate text-[15px] font-medium tracking-[-0.02em]">
                      {item.title || item.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {sectionGroups.length > 0 && (
              <div className="mt-4 space-y-3 border-t border-current/10 pt-4">
                {sectionGroups.map((group) => {
                  const SectionIcon = getSectionIcon(group.title);
                  const isExpanded = !!expandedSections[group.id];

                  return (
                    <div key={group.id} className="space-y-2">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSections((previous) => ({
                            ...previous,
                            [group.id]: !previous[group.id],
                          }))
                        }
                        className="flex w-full items-center justify-between gap-2 rounded-md px-1 py-1 text-left"
                      >
                        <span className="flex items-center gap-2 truncate text-[11px] font-medium uppercase tracking-[0.22em] text-current/80">
                          <SectionIcon
                            size={14}
                            className="shrink-0 opacity-80"
                          />
                          <span className="truncate">{group.title}</span>
                        </span>
                        <ChevronDown
                          size={14}
                          className={`shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="space-y-1 pl-5">
                          {group.items.length > 0 ? (
                            group.items.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-current/80 transition-colors hover:text-current"
                              >
                                {item.title}
                              </button>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => scrollToSection(group.id)}
                              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-current/80 transition-colors hover:text-current"
                            >
                              {group.title}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 px-4 py-8 md:px-8 lg:px-10">
          <div className="mx-auto max-w-[780px] min-w-0">
            <article className="max-w-none min-w-0 overflow-x-auto">
              {children}
            </article>
          </div>

          <div className="mx-auto mt-12 max-w-[820px] border-t border-current/10 pt-6">
            <div className="flex items-center justify-between gap-4">
              {prevTopic ? (
                <button
                  type="button"
                  onClick={() => router.push(`/${prevTopic.id}`)}
                  className={`flex items-center gap-2 rounded-md border px-4 py-3 text-left transition-colors ${theme.border} ${theme.soft}`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Previous
                  </span>
                  <span className="text-sm font-semibold">
                    {prevTopic.title || prevTopic.id}
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextTopic ? (
                <button
                  type="button"
                  onClick={() => router.push(`/${nextTopic.id}`)}
                  className={`ml-auto flex items-center gap-2 rounded-md border px-4 py-3 text-left transition-colors ${theme.border} ${theme.soft}`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Next
                  </span>
                  <span className="text-sm font-semibold">
                    {nextTopic.title || nextTopic.id}
                  </span>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>

        <aside className="hidden w-[260px] shrink-0 border-l px-5 py-8 lg:block">
          <div className="sticky top-24">
            <p
              className={`mb-4 text-[10px] font-medium uppercase tracking-[0.2em] ${theme.muted}`}
            >
              On this page
            </p>

            <nav className="space-y-2">
              {outlineGroups.length > 0 ? (
                outlineGroups.map((group) => {
                  const isExpanded = !!expandedOutline[group.id];

                  return (
                    <div key={group.id} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedOutline((previous) => ({
                            ...previous,
                            [group.id]: !previous[group.id],
                          }));
                          scrollToSection(group.id);
                        }}
                        className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-all duration-200 ${
                          activeOutlineId === group.id
                            ? darkMode
                              ? "bg-[#111111] text-[#C699FF] ring-1 ring-[#C699FF]/30"
                              : "bg-[#f0ece6] text-[#6f45d6] ring-1 ring-[#C699FF]/35"
                            : "text-current/80 hover:text-current"
                        }`}
                      >
                        <span className="font-medium">{group.title}</span>
                        {group.items.length > 0 && (
                          <ChevronDown
                            size={14}
                            className={`shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                      {isExpanded && group.items.length > 0 && (
                        <div className="space-y-1 border-l border-current/10 pl-3">
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
                                className={`block rounded-md px-2 py-1 text-sm transition-all duration-200 ${
                                  isActiveItem
                                    ? darkMode
                                      ? "bg-[#111111] text-[#C699FF] ring-1 ring-[#C699FF]/30"
                                      : "bg-[#f0ece6] text-[#6f45d6] ring-1 ring-[#C699FF]/35"
                                    : "text-current/70 hover:text-current"
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
                })
              ) : (
                <div className={`text-sm ${theme.muted}`}>
                  {hasSearchQuery ? "No matching sections" : "No sections yet"}
                </div>
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
