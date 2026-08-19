"use client";

/**
 * @fileoverview Reusable Command Palette component providing unified search 
 * across topics, in-page sections, and global actions.
 * Integrates fuse.js for strict matching and relaxed typo-tolerance fallback.
 *
 * @author Yash Vardhan
 */

import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import { useTheme } from "../../src/context/ThemeContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { Globe, Monitor, Search, X, Link as LinkIcon } from "lucide-react";

/**
 * Defines the contract for items ingested by the Search Palette.
 */
export type SearchItemType = "topic" | "section" | "action";

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: SearchItemType;
  href?: string;
  icon?: React.ReactNode;
  depth?: number;
  category?: string;
  onSelect?: () => void;
}

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  searchData: SearchItem[];
  onSelect: (item: SearchItem) => void;
  placeholder?: string;
}

/**
 * Evaluates the client OS to render the appropriate keyboard modifier hint (Cmd vs Ctrl).
 * Safe for SSR hydration.
 */
export function useSearchOSKey() {
  const [modifierKey, setModifierKey] = useState("⌘");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      setModifierKey(isMac ? "⌘" : "Ctrl ");
    }
  }, []);

  return { modifierKey, isMounted };
}

/**
 * Utility component to render fuzzy match highlights.
 * Splits strings based on fuse.js indices to prevent expensive DOM manipulation.
 */
function HighlightText({
  text,
  matches,
  fieldKey,
  highlightStyle,
}: {
  text: string;
  matches?: readonly any[];
  fieldKey: string;
  highlightStyle?: string;
}) {
  const match = matches?.find((m) => m.key === fieldKey);
  if (!match || !match.indices || match.indices.length === 0) return <span>{text}</span>;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  match.indices.forEach(([start, end]: [number, number], i: number) => {
    if (start > lastIndex) {
      elements.push(<span key={`unmatch-${i}`}>{text.substring(lastIndex, start)}</span>);
    }
    elements.push(
      <span key={`match-${i}`} className={highlightStyle || "font-bold text-[#C699FF] bg-[#C699FF]/10 rounded-sm"}>
        {text.substring(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  if (lastIndex < text.length) {
    elements.push(<span key="unmatch-end">{text.substring(lastIndex)}</span>);
  }

  return <>{elements}</>;
}

export default function SearchPalette({
  isOpen,
  onClose,
  searchData,
  onSelect,
  placeholder = "Search topics, commands, or concepts...",
}: SearchPaletteProps) {
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [docSearch, setDocSearch] = useState("");

  const themeClasses = {
    panel: darkMode ? "bg-[#050505]" : "bg-white",
    border: darkMode ? "border-white/10" : "border-black/10",
    muted: darkMode ? "text-zinc-400" : "text-zinc-500",
    navItem: darkMode ? "text-[#F5F5F5]" : "text-[#111111]",
    hoverAccent: darkMode ? "hover:text-white" : "hover:text-zinc-900",
    highlightText: darkMode
      ? "font-medium bg-[#C699FF]/25 text-[#C699FF] rounded-[3px] px-[2px]"
      : "font-medium bg-[#6f45d6]/15 text-[#6f45d6] rounded-[3px] px-[2px]",
  };

  /**
   * Static global actions bound to the palette default state.
   */
  const quickActions: SearchItem[] = useMemo(
    () => [
      {
        id: "action-home",
        title: "Go to Directory (Home)",
        type: "action",
        icon: <Globe size={16} className="opacity-70" />,
        onSelect: () => router.push("/"),
      },
      {
        id: "action-theme",
        title: `Switch to ${darkMode ? "Light" : "Dark"} Mode`,
        type: "action",
        icon: <Monitor size={16} className="opacity-70" />,
        onSelect: toggleTheme,
      },
      {
        id: "action-copy",
        title: "Copy Current URL",
        type: "action",
        icon: <LinkIcon size={16} className="opacity-70" />,
        onSelect: () => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("URL copied to clipboard!");
        },
      },
      {
        id: "action-github",
        title: "Go to GitHub Repo",
        type: "action",
        icon: <FaGithub size={16} className="opacity-70" />,
        onSelect: () => window.open("https://github.com/yash-pluto/refme", "_blank"),
      },
    ],
    [darkMode, router, toggleTheme]
  );

  const allSearchableData = useMemo(() => [...quickActions, ...searchData], [quickActions, searchData]);

  /**
   * Primary strict search instance. Tuned for exact or near-exact matches.
   */
  const fuseStrict = useMemo(
    () =>
      new Fuse(allSearchableData, {
        keys: ["title", "description", "category"],
        includeMatches: true,
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [allSearchableData]
  );

  /**
   * Secondary relaxed search instance. Provides typo tolerance to power the
   * "Did you mean?" suggestion feature when strict matching fails.
   */
  const fuseLoose = useMemo(
    () =>
      new Fuse(searchData, {
        keys: ["title", "description"],
        includeMatches: true,
        threshold: 0.6,
        ignoreLocation: true,
      }),
    [searchData]
  );

  /**
   * Global event bindings to orchestrate keyboard interaction.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /**
   * Body scroll lock management.
   */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) setDocSearch("");
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasSearchQuery = docSearch.trim().length > 0;
  
  // Base results off strict matching
  const rawResults = hasSearchQuery
    ? fuseStrict.search(docSearch.trim()).slice(0, 12)
    : quickActions.map((item) => ({ item, matches: [] }));

  // Fallback heuristic: If strict fails, run relaxed threshold search for a suggestion
  let suggestion: SearchItem | null = null;
  if (hasSearchQuery && rawResults.length === 0) {
    const looseResults = fuseLoose.search(docSearch.trim());
    if (looseResults.length > 0) suggestion = looseResults[0].item;
  }

  // Result routing logic
  const actionResults = rawResults.filter((r) => r.item.type === "action");
  const topicResults = rawResults.filter((r) => r.item.type === "topic");
  const sectionResults = rawResults.filter((r) => r.item.type === "section");

  const handleItemSelect = (item: SearchItem) => {
    setDocSearch("");
    if (item.onSelect) item.onSelect();
    onSelect(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-[15vh] backdrop-blur-sm sm:pt-[20vh]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl overflow-hidden rounded-xl border shadow-2xl mx-4 ${themeClasses.panel} ${themeClasses.border}`}
      >
        <Command shouldFilter={false} className="flex h-full w-full flex-col overflow-hidden bg-transparent">
          
          <div className={`flex items-center border-b px-4 ${themeClasses.border}`}>
            <Search className={`mr-3 h-5 w-5 opacity-50 ${themeClasses.muted}`} />
            <Command.Input
              autoFocus
              value={docSearch}
              onValueChange={setDocSearch}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  onClose();
                }
              }}
              placeholder={placeholder}
              className={`flex h-14 w-full bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-50 ${themeClasses.navItem}`}
            />
            <button
              onClick={onClose}
              className={`rounded p-1 opacity-50 transition-opacity hover:opacity-100 ${themeClasses.hoverAccent}`}
            >
              <X size={16} />
            </button>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2 sm:max-h-[400px]">
            
            {/* Typo Suggestion Handling */}
            {hasSearchQuery && rawResults.length === 0 && (
              <Command.Empty className={`py-6 text-center text-sm ${themeClasses.muted}`}>
                {suggestion ? (
                  <span>
                    No results for "{docSearch}", did you mean{" "}
                    <button
                      type="button"
                      onClick={() => handleItemSelect(suggestion as SearchItem)}
                      className="text-[#C699FF] font-medium hover:underline focus:outline-none"
                    >
                      {suggestion.title}
                    </button>?
                  </span>
                ) : (
                  <span>No results found for "{docSearch}".</span>
                )}
              </Command.Empty>
            )}

            {actionResults.length > 0 && (
              <Command.Group heading={<div className={`px-2 py-2 text-xs font-semibold uppercase tracking-wider ${themeClasses.muted}`}>Quick Actions</div>}>
                {actionResults.map(({ item, matches }) => (
                  <Command.Item
                    key={item.id}
                    onSelect={() => handleItemSelect(item)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-current/10 aria-selected:bg-current/10 ${themeClasses.navItem}`}
                  >
                    {item.icon}
                    <span>
                      <HighlightText text={item.title} matches={matches} fieldKey="title" highlightStyle={themeClasses.highlightText} />
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {topicResults.length > 0 && (
              <Command.Group heading={<div className={`px-2 py-2 text-xs font-semibold uppercase tracking-wider ${themeClasses.muted}`}>Topics</div>}>
                {topicResults.map(({ item, matches }) => (
                  <Command.Item
                    key={item.id}
                    onSelect={() => handleItemSelect(item)}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-current/10 aria-selected:bg-current/10 ${themeClasses.navItem}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.icon && (
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                          {item.icon}
                        </div>
                      )}
                      <div className="min-w-0 text-left">
                        <div className="truncate font-medium">
                          <HighlightText text={item.title} matches={matches} fieldKey="title" highlightStyle={themeClasses.highlightText} />
                        </div>
                        {item.description && <div className="truncate text-xs opacity-70 mt-0.5">{item.description}</div>}
                      </div>
                    </div>
                    <div className="shrink-0 text-[10px] uppercase tracking-[0.18em] opacity-60">
                      {item.category || "Topic"}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {sectionResults.length > 0 && (
              <Command.Group heading={<div className={`px-2 py-2 text-xs font-semibold uppercase tracking-wider ${themeClasses.muted}`}>Documentation</div>}>
                {sectionResults.map(({ item, matches }) => (
                  <Command.Item
                    key={item.id}
                    onSelect={() => handleItemSelect(item)}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-current/10 aria-selected:bg-current/10 ${themeClasses.navItem}`}
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium">
                        <HighlightText text={item.title} matches={matches} fieldKey="title" highlightStyle={themeClasses.highlightText} />
                      </div>
                    </div>
                    <div className="shrink-0 text-[10px] uppercase tracking-[0.18em] opacity-60">
                      {item.depth === 2 ? "Section" : "Subsection"}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

          </Command.List>
        </Command>
      </div>
    </div>
  );
}