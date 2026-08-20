"use client";

/**
 * @fileoverview Primary entry point and directory index for the application.
 * Composes the category grid and features the unified, responsive global footer.
 *
 * @author Yash Vardhan
 */

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../src/context/ThemeContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SearchPalette, { useSearchOSKey, SearchItem } from "../app/components/SearchPalette";

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

export default function LandingPage() {
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  
  const [cmdOpen, setCmdOpen] = useState(false);
  const { modifierKey, isMounted } = useSearchOSKey();

  const themeClasses = {
    page: darkMode ? "bg-[#050505] text-[#f5f5f5]" : "bg-[#FFFFFF] text-[#111111]",
    header: darkMode ? "bg-[#050505]/90" : "bg-[#FFFFFF]/90",
    panel: darkMode ? "bg-[#101010]" : "bg-[#F7F7F7]",
    border: darkMode ? "border-[#222222]" : "border-[#E5E5E5]",
    muted: darkMode ? "text-zinc-400" : "text-zinc-500",
    accent: darkMode ? "text-zinc-100" : "text-zinc-900",
    cardHover: darkMode
      ? "hover:border-[#C699FF]/40 hover:bg-[#C699FF]/[0.03]"
      : "hover:border-[#6f45d6]/40 hover:bg-[#6f45d6]/[0.03]",
    iconBox: darkMode ? "bg-white/5 border-[#222222]" : "bg-black/5 border-[#E5E5E5]",
    iconBoxHover: darkMode 
      ? "group-hover:border-[#C699FF]/40 group-hover:text-[#C699FF] group-hover:bg-[#C699FF]/10" 
      : "group-hover:border-[#6f45d6]/40 group-hover:text-[#6f45d6] group-hover:bg-[#6f45d6]/10",
  };

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

  const searchData = useMemo<SearchItem[]>(() => {
    return REFERENCE_DATA.flatMap((cat) =>
      cat.items.map((item) => ({
        id: item.name,
        title: item.name,
        description: item.desc,
        type: "topic",
        href: item.href,
        icon: item.icon,
        category: cat.category,
      }))
    );
  }, []);

  const handleSearchSelect = (item: SearchItem) => {
    if (item.type === "topic" && item.href) router.push(item.href);
  };

  return (
    <div className={`${themeClasses.page} min-h-screen flex flex-col transition-colors duration-200`}>
      
      <SearchPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} searchData={searchData} onSelect={handleSearchSelect} placeholder="Search algorithms, frameworks, or concepts..." />

      <header className={`sticky top-0 z-40 h-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md`}>
        <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img src="/refme-logo.svg" alt="RefMe Logo" className="h-7 w-7" />
            </div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <span className={`${themeClasses.accent}`}>RefMe</span>
            </div>
          </div>

          <button onClick={toggleTheme} className={`rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${themeClasses.border} ${themeClasses.panel} hover:opacity-70`}>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <section className="relative px-4 pb-16 pt-24 md:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            The developer's <br className="hidden sm:block" /> quick-reference guide.
          </h1>

          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${themeClasses.muted}`}>
            Find the syntax, patterns, and implementation notes you need without digging through scattered docs. Built for speed and focus.
          </p>

          <div className="mx-auto mt-12 max-w-2xl">
            <button onClick={() => setCmdOpen(true)} className={`relative flex w-full items-center justify-between rounded-full border bg-transparent py-4 pl-5 pr-5 shadow-sm transition-all duration-200 ${themeClasses.border} ${themeClasses.panel} hover:border-[#C699FF]/60 hover:ring-4 hover:ring-[#C699FF]/10 text-left group`}>
              <div className="flex items-center gap-3 w-full min-w-0">
                <Search className={`h-5 w-5 shrink-0 transition-colors group-hover:text-[#C699FF] ${themeClasses.muted}`} />
                <span className={`text-base font-medium opacity-60 w-full truncate ${themeClasses.accent}`}>Search algorithms, frameworks, or concepts...</span>
              </div>
              <div className="shrink-0 ml-3">
                <span className={`hidden md:flex items-center justify-center rounded-full border border-current/20 px-2.5 py-1 text-[11px] font-bold uppercase opacity-50 transition-opacity duration-200 ${isMounted ? "opacity-60" : "opacity-0"}`}>
                  {modifierKey}K
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1400px] px-4 pb-24 md:px-6 lg:px-8">
        <div className="space-y-20">
          {REFERENCE_DATA.map((category) => (
            <section key={category.category} className="scroll-mt-24">
              <div className={`mb-8 flex items-center gap-3 border-b pb-4 ${themeClasses.border} opacity-90`}>
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${themeClasses.iconBox}`}>
                  {category.icon}
                </span>
                <h2 className="text-xl font-bold tracking-tight">
                  {category.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item: any) => (
                  <Link key={item.name} href={item.href} className={`group relative flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 ${themeClasses.border} ${themeClasses.cardHover}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${themeClasses.iconBox} ${themeClasses.iconBoxHover}`}>
                        {item.icon}
                      </div>
                      <h3 className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-current">
                        {item.name}
                      </h3>
                    </div>
                    <p className={`text-sm font-medium leading-relaxed transition-colors duration-300 ${themeClasses.muted} group-hover:opacity-90`}>
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Restored Sleek Minimal Footer */}
      <footer className={`mt-auto border-t py-8 text-center ${themeClasses.border} bg-transparent`}>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
          <p className={`text-sm ${themeClasses.muted}`}>
            Built by{" "}
            <a 
              href="https://yash-pluto.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`font-medium transition-colors hover:text-[#C699FF] ${darkMode ? "text-white" : "text-black"}`}
            >
              Yash
            </a>
          </p>
          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/yash-pluto" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-colors ${themeClasses.muted} hover:text-current`} 
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/vardhan-yash3105" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-colors ${themeClasses.muted} hover:text-current`} 
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a 
              href="https://yash-pluto.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-colors ${themeClasses.muted} hover:text-current`} 
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