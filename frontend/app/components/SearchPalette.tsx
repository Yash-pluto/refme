// app/components/SearchPalette.tsx
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
  onToggle: () => void;
  searchData: SearchItem[];
  onSelect: (item: SearchItem) => void;
  placeholder?: string;
}

/**
 * Evaluates the client OS to render the appropriate keyboard modifier hint (Cmd vs Ctrl).
 * Implementation is wrapped in an initialization effect to remain SSR-safe.
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
 * Utility component to safely render fuzzy match highlights.
 * Splits strings based on fuse.js indices to prevent expensive DOM manipulation
 * and bypass dangerouslySetInnerHTML.
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

// 1. Moved themeClasses outside the component since it is now static CSS strings!
const themeClasses = {
  panel: "bg-white dark:bg-[#050505]",
  border: "border-black/10 dark:border-white/10",
  muted: "text-zinc-500 dark:text-zinc-400",
  navItem: "text-[#111111] dark:text-[#F5F5F5]",
  hoverAccent: "hover:text-zinc-900 dark:hover:text-white",
  highlightText: "font-medium rounded-[3px] px-[2px] bg-[#6f45d6]/15 text-[#6f45d6] dark:bg-[#C699FF]/25 dark:text-[#C699FF]",
};

export default function SearchPalette({
  isOpen,
  onClose,
  onToggle,
  searchData,
  onSelect,
  placeholder = "Search topics, commands, or concepts...",
}: SearchPaletteProps) {
  // We keep useTheme solely for the toggle function and the dynamic label string
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [docSearch, setDocSearch] = useState("");

  /**
   * Static global actions bound to the palette default state.
   * Memoized to prevent unnecessary re-evaluations during typing.
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
        // This is safe from hydration mismatch because the modal returns null if !isOpen
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
   * Primary strict search instance. 
   * Tuned for exact or near-exact matches across all provided data fields.
   * ignoreFieldNorm is enabled to prevent long descriptions from tanking the score of short titles.
   * 
   * - Yash Vardhan
   */
  const fuseStrict = useMemo(
    () =>
      new Fuse(allSearchableData, {
        keys: ["title", "description", "category"],
        includeMatches: true,
        threshold: 0.3,
        ignoreLocation: true,
        ignoreFieldNorm: true, 
      }),
    [allSearchableData]
  );

  /**
   * Secondary relaxed search instance handling Typo Tolerance ("Did you mean X?").
   * Restricted strictly to the 'title' field. Including 'description' causes
   * Fuse.js to severely penalize the match score on pages with heavy description text.
   * 
   * - Yash Vardhan
   */
  const fuseLoose = useMemo(
    () =>
      new Fuse(searchData, {
        keys: ["title"], 
        includeMatches: true,
        threshold: 0.65, 
        ignoreLocation: true,
        ignoreFieldNorm: true,
      }),
    [searchData]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isOpen) onClose();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onToggle();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onToggle]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) setDocSearch("");
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasSearchQuery = docSearch.trim().length > 0;
  
  const rawResults = hasSearchQuery
    ? fuseStrict.search(docSearch.trim()).slice(0, 12)
    : quickActions.map((item) => ({ item, matches: [] }));

  /**
   * Fallback heuristic: If the primary strict search fails to yield results,
   * we execute the relaxed threshold search to generate a suggestion.
   */
  let suggestion: SearchItem | null = null;
  if (hasSearchQuery && rawResults.length === 0) {
    const looseResults = fuseLoose.search(docSearch.trim());
    if (looseResults.length > 0) suggestion = looseResults[0].item;
  }

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
                        // 2. Switched from a JS ternary to standard Tailwind classes for the icon container
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10">
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