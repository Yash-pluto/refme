"use client";

import { useTheme } from "../src/context/ThemeContext";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Fuse from "fuse.js"; // <-- Imported Fuse.js
import {
  Binary,
  Braces,
  Code2,
  Database,
  FileCode2,
  Globe,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TestTube,
} from "lucide-react";

export const REFERENCE_DATA = [
  {
    category: "Core Languages",
    icon: <Code2 size={18} />,
    items: [
      { name: "C++", href: "/cpp", icon: <Code2 size={22} className="opacity-80 transition-colors" />, desc: "Low-level systems, performance, and STL patterns." },
      { name: "JavaScript", href: "/javascript", icon: <Braces size={22} className="opacity-80 transition-colors" />, desc: "Modern syntax, async flows, and browser fundamentals." },
      { name: "Python", href: "/python", icon: <FileCode2 size={22} className="opacity-80 transition-colors" />, desc: "Data work, automation, and clean backend scripting." },
      { name: "TypeScript", href: "/typescript", icon: <FileCode2 size={22} className="opacity-80 transition-colors" />, desc: "Types, interfaces, and safer large-scale JavaScript systems." },
      { name: "Go", href: "/go", icon: <Binary size={22} className="opacity-80 transition-colors" />, desc: "Simple concurrency, tooling, and service-oriented code." },
      { name: "Rust", href: "/rust", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Ownership, performance, and safety-first systems design." },
      { name: "Java", href: "/java", icon: <Code2 size={22} className="opacity-80 transition-colors" />, desc: "Enterprise patterns, JVM tooling, and backend architecture." },
      { name: "C#", href: "/csharp", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Strong typing, .NET frameworks, and application structure." },
    ],
  },
  {
    category: "Frontend & Web",
    icon: <Globe size={18} />,
    items: [
      { name: "React", href: "/react", icon: <Globe size={22} className="opacity-80 transition-colors" />, desc: "Components, state, effects, and rendering patterns." },
      { name: "Next.js", href: "/nextjs", icon: <Globe size={22} className="opacity-80 transition-colors" />, desc: "App routing, server rendering, and performance patterns." },
      { name: "CSS", href: "/css", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Layout, design systems, and modern responsive styling." },
      { name: "HTML", href: "/html", icon: <Code2 size={22} className="opacity-80 transition-colors" />, desc: "Structure, semantics, and accessible document foundations." },
      { name: "Tailwind", href: "/tailwind", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Utility-first styling, tokens, and rapid UI composition." },
      { name: "Accessibility", href: "/accessibility", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Semantic structure, keyboard flows, and inclusive UI." },
    ],
  },
  {
    category: "Backend & Systems",
    icon: <TerminalSquare size={18} />,
    items: [
      { name: "Bash", href: "/bash", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Shell workflows, pipelines, and automation basics." },
      { name: "Node.js", href: "/nodejs", icon: <Binary size={22} className="opacity-80 transition-colors" />, desc: "Runtime fundamentals and server-side JavaScript patterns." },
      { name: "SQL", href: "/sql", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Queries, joins, indexing, and data modeling essentials." },
      { name: "APIs", href: "/apis", icon: <Lock size={22} className="opacity-80 transition-colors" />, desc: "Request patterns, auth flows, and contract design." },
      { name: "Docker", href: "/docker", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Containers, images, and deployment isolation basics." },
      { name: "Git", href: "/git", icon: <Code2 size={22} className="opacity-80 transition-colors" />, desc: "Branching, commits, and collaboration workflows." },
    ],
  },
  {
    category: "Concepts & Patterns",
    icon: <Sparkles size={18} />,
    items: [
      { name: "Async", href: "/async", icon: <Braces size={22} className="opacity-80 transition-colors" />, desc: "Promises, async/await, event loops, and scheduling." },
      { name: "Testing", href: "/testing", icon: <TestTube size={22} className="opacity-80 transition-colors" />, desc: "Unit tests, integration coverage, and reliability habits." },
      { name: "Security", href: "/security", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Auth, validation, and safer defaults for production code." },
      { name: "Data Structures", href: "/data-structures", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Arrays, trees, hash maps, and choosing the right shape." },
      { name: "Algorithms", href: "/algorithms", icon: <Binary size={22} className="opacity-80 transition-colors" />, desc: "Sorting, traversal, recursion, and complexity trade-offs." },
      { name: "System Design", href: "/system-design", icon: <Globe size={22} className="opacity-80 transition-colors" />, desc: "Scalability, resilience, and architecture composition." },
      { name: "State Management", href: "/state-management", icon: <Braces size={22} className="opacity-80 transition-colors" />, desc: "Global UI state, immutability, and predictable app flows." },
      { name: "OAuth", href: "/oauth", icon: <Lock size={22} className="opacity-80 transition-colors" />, desc: "Delegated access, tokens, and identity flows in real apps." },
      { name: "Caching", href: "/caching", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Read-through patterns, invalidation, and latency reduction." },
      { name: "Web Security", href: "/web-security", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "XSS, CSRF, headers, and safer web defaults." },
      { name: "Design Patterns", href: "/design-patterns", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Factory, strategy, observer, and reusable software shapes." },
      { name: "Dependency Injection", href: "/dependency-injection", icon: <Braces size={22} className="opacity-80 transition-colors" />, desc: "Loose coupling, wiring, and testable architecture." },
      { name: "Validation", href: "/validation", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Input checks, schema rules, and safer user data flows." },
    ],
  },
  {
    category: "Architecture & DevOps",
    icon: <Globe size={18} />,
    items: [
      { name: "Microservices", href: "/microservices", icon: <Globe size={22} className="opacity-80 transition-colors" />, desc: "Service boundaries, contracts, and deployment autonomy." },
      { name: "Event-Driven", href: "/event-driven", icon: <Binary size={22} className="opacity-80 transition-colors" />, desc: "Streams, decoupling, and asynchronous communication patterns." },
      { name: "Load Balancing", href: "/load-balancing", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Traffic distribution, resilience, and horizontal scale." },
      { name: "Kubernetes", href: "/kubernetes", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Container orchestration, scaling, and service management." },
      { name: "Deployment", href: "/deployment", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Release flow, environments, rollout safety, and automation." },
      { name: "Monitoring", href: "/monitoring", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Metrics, logs, traces, and runtime health visibility." },
      { name: "Cloud Architecture", href: "/cloud-architecture", icon: <Globe size={22} className="opacity-80 transition-colors" />, desc: "Multi-region design, edge services, and resilient platforms." },
      { name: "Databases", href: "/databases", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Storage models, schemas, indexes, and query trade-offs." },
      { name: "Reliability", href: "/reliability", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Failover, redundancy, and designing for graceful degradation." },
    ],
  },
  {
    category: "Data & AI",
    icon: <Database size={18} />,
    items: [
      { name: "Data Science", href: "/data-science", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Analysis, notebooks, and patterns for working with data." },
      { name: "Machine Learning", href: "/ml", icon: <Binary size={22} className="opacity-80 transition-colors" />, desc: "Model basics, pipelines, and practical deployment notes." },
      { name: "LLMs", href: "/llms", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Prompt design, structured outputs, and app integration basics." },
      { name: "Vectors", href: "/vectors", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Embeddings, similarity search, and retrieval patterns." },
      { name: "Prompt Engineering", href: "/prompt-engineering", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Instruction design, context framing, and reliable outputs." },
      { name: "RAG", href: "/rag", icon: <Database size={22} className="opacity-80 transition-colors" />, desc: "Grounded generation with retrieval and relevance filtering." },
      { name: "Model Evaluation", href: "/model-evaluation", icon: <TestTube size={22} className="opacity-80 transition-colors" />, desc: "Benchmarking, scoring, and quality checks for outputs." },
      { name: "AI Safety", href: "/ai-safety", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Guardrails, risk mitigation, and responsible model usage." },
      { name: "Agents", href: "/agents", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Tool use, planning loops, and autonomous execution patterns." },
    ],
  },
  {
    category: "Developer Tools",
    icon: <TerminalSquare size={18} />,
    items: [
      { name: "VS Code", href: "/vscode", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Editor workflows, extensions, and keyboard efficiency." },
      { name: "Linux", href: "/linux", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Filesystems, processes, permissions, and command-line habits." },
      { name: "CI/CD", href: "/ci-cd", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Pipelines, automation, and release safety checks." },
      { name: "Observability", href: "/observability", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Logging, tracing, and debugging production systems." },
      { name: "Nginx", href: "/nginx", icon: <TerminalSquare size={22} className="opacity-80 transition-colors" />, desc: "Reverse proxying, performance tuning, and request routing." },
      { name: "Terraform", href: "/terraform", icon: <ShieldCheck size={22} className="opacity-80 transition-colors" />, desc: "Infrastructure as code, repeatable environments, and provisioning." },
      { name: "GitHub Actions", href: "/github-actions", icon: <Code2 size={22} className="opacity-80 transition-colors" />, desc: "CI pipelines, automation, and shipping code confidently." },
      { name: "Webpack", href: "/webpack", icon: <Sparkles size={22} className="opacity-80 transition-colors" />, desc: "Bundling, module resolution, and frontend build optimization." },
      { name: "Vercel", href: "/vercel", icon: <Globe size={22} className="opacity-80 transition-colors" />, desc: "Edge deployment, previews, and modern app delivery." },
      { name: "Debugging", href: "/debugging", icon: <TestTube size={22} className="opacity-80 transition-colors" />, desc: "Root cause analysis, traces, breakpoints, and narrowing bugs." },
    ],
  },
];

// --- FUZZY SEARCH HIGHLIGHT HELPER ---
function HighlightText({
  text,
  matches,
  fieldKey,
  highlightStyle,
}: {
  text: string;
  matches?: any[];
  fieldKey: string;
  highlightStyle: string;
}) {
  const match = matches?.find((m) => m.key === fieldKey);
  if (!match || !match.indices || match.indices.length === 0) return <span>{text}</span>;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  match.indices.forEach(([start, end]: [number, number], i: number) => {
    // Text before the match
    if (start > lastIndex) {
      elements.push(<span key={`unmatch-${i}`}>{text.substring(lastIndex, start)}</span>);
    }
    // The exact matched characters
    elements.push(
      <span key={`match-${i}`} className={`font-medium ${highlightStyle} rounded-[3px] px-[2px]`}>
        {text.substring(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  // Text after the final match
  if (lastIndex < text.length) {
    elements.push(<span key="unmatch-end">{text.substring(lastIndex)}</span>);
  }

  return <>{elements}</>;
}

export default function LandingPage() {
  const { darkMode, toggleTheme } = useTheme();
  
  // Search bar states & refs
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [modifierKey, setModifierKey] = useState("⌘");

  const theme = {
    page: darkMode ? "bg-[#050505] text-[#f5f5f5]" : "bg-[#fcfbf9] text-[#111111]",
    header: darkMode ? "bg-[#050505]/85" : "bg-[#fcfbf9]/85",
    panel: darkMode ? "bg-[#0d0d0d]" : "bg-white",
    border: darkMode ? "border-white/10" : "border-black/10",
    muted: darkMode ? "text-zinc-400" : "text-zinc-500",
    accent: darkMode ? "text-zinc-100" : "text-zinc-900",
    cardHover: darkMode
      ? "hover:border-[#C699FF]/40 hover:bg-[#C699FF]/[0.03]"
      : "hover:border-[#6f45d6]/40 hover:bg-[#6f45d6]/[0.03]",
    iconBox: darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10",
    iconBoxHover: darkMode 
      ? "group-hover:border-[#C699FF]/40 group-hover:text-[#C699FF] group-hover:bg-[#C699FF]/10" 
      : "group-hover:border-[#6f45d6]/40 group-hover:text-[#6f45d6] group-hover:bg-[#6f45d6]/10",
    highlightText: darkMode ? "bg-[#C699FF]/25 text-[#C699FF]" : "bg-[#6f45d6]/15 text-[#6f45d6]",
  };

  // Keyboard shortcut detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      setModifierKey(isMac ? "⌘" : "Ctrl ");
    }
  }, []);

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
      setSearchQuery("");
      searchInputRef.current?.blur();
    }
  };

  // --- FUZZY SEARCH SETUP ---
  const flattenedItems = useMemo(() => {
    return REFERENCE_DATA.flatMap(cat =>
      cat.items.map(item => ({ 
        ...item, 
        categoryName: cat.category, 
        categoryIcon: cat.icon 
      }))
    );
  }, []);

  const fuse = useMemo(() => new Fuse(flattenedItems, {
    keys: ["name", "desc"],
    includeMatches: true,
    threshold: 0.3, // Allows slight typos like 'reac' or 'jaavscript'
    ignoreLocation: true,
  }), [flattenedItems]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return REFERENCE_DATA;

    const results = fuse.search(searchQuery.trim());

    // Re-group the search results back into their original UI categories
    const grouped = new Map();
    results.forEach(({ item, matches }) => {
      if (!grouped.has(item.categoryName)) {
        grouped.set(item.categoryName, {
          category: item.categoryName,
          icon: item.categoryIcon,
          items: []
        });
      }
      grouped.get(item.categoryName).items.push({
        ...item,
        matches, // Append the match indices to pass to our Highlight component
      });
    });

    return Array.from(grouped.values());
  }, [searchQuery, fuse]);
  // --------------------------

  return (
    <div className={`${theme.page} min-h-screen flex flex-col transition-colors duration-200`}>
      {/* HEADER */}
      <header className={`sticky top-0 z-40 h-16 border-b ${theme.border} ${theme.header} backdrop-blur-md`}>
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0F1115] text-white shadow-sm ring-1 ring-white/10">
              <span className="text-lg font-black leading-none tracking-[-0.14em]">
                R<span className="text-zinc-500">_</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
              <span className={`${theme.accent}`}>RefMe</span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${theme.border} hover:opacity-70`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-4 pb-16 pt-24 md:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            The developer's <br className="hidden sm:block" /> quick-reference guide.
          </h1>

          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${theme.muted}`}>
            Find the syntax, patterns, and implementation notes you need without digging through scattered docs. Built for speed and focus.
          </p>

          <div className="mx-auto mt-12 max-w-2xl">
            <div
              className={`relative flex w-full items-center rounded-2xl border shadow-sm transition-all duration-200 ${theme.border} ${theme.panel} focus-within:border-[#C699FF]/60 focus-within:ring-4 focus-within:ring-[#C699FF]/10`}
            >
              <Search className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${theme.muted}`} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search algorithms, frameworks, or concepts..."
                className="w-full bg-transparent py-4 pl-12 pr-20 text-base outline-none placeholder:opacity-50"
              />
              
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-end">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] opacity-70 transition hover:opacity-100"
                  >
                    Clear
                  </button>
                ) : (
                  <span className={`rounded-full border border-current/15 px-2.5 py-1 text-[11px] font-medium uppercase opacity-60 transition-opacity duration-200 ${isMounted ? "opacity-60" : "opacity-0"}`}>
                    {modifierKey}K
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRIDS */}
      <main className="mx-auto w-full max-w-[1400px] px-4 pb-24 md:px-6 lg:px-8">
        {filteredData.length === 0 ? (
          <div className="py-20 text-center">
            <p className={`text-lg ${theme.muted}`}>
              No references found for "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {filteredData.map((category) => (
              <section key={category.category} className="scroll-mt-24">
                <div className="mb-8 flex items-center gap-3 border-b pb-4 opacity-90">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${theme.iconBox}`}>
                    {category.icon}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {category.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.items.map((item: any) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 ${theme.border} ${theme.cardHover}`}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${theme.iconBox} ${theme.iconBoxHover}`}
                        >
                          {item.icon}
                        </div>
                        <h3 className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-current">
                          <HighlightText text={item.name} matches={item.matches} fieldKey="name" highlightStyle={theme.highlightText} />
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme.muted} group-hover:opacity-90`}>
                        <HighlightText text={item.desc} matches={item.matches} fieldKey="desc" highlightStyle={theme.highlightText} />
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`mt-auto border-t py-8 text-center ${theme.border}`}>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
          <p className={`text-sm ${theme.muted}`}>
            Built by{" "}
            <a 
              href="https://yash-pluto.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`font-medium transition-colors hover:text-[#C699FF] ${theme.accent}`}
            >
              Yash
            </a>
          </p>
          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/yash-pluto" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-colors ${theme.muted} hover:text-current`} 
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/vardhan-yash3105" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-colors ${theme.muted} hover:text-current`} 
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a 
              href="https://yash-pluto.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-colors ${theme.muted} hover:text-current`} 
              aria-label="Portfolio"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}