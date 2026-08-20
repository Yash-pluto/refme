"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../src/context/ThemeContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SearchPalette, { useSearchOSKey, SearchItem } from "../app/components/SearchPalette";

import {
  BadgeCheck,
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
  GitPullRequest,
  GitMerge,
  CircleDot,
  Star,
  CheckCircle2
} from "lucide-react";

export const REFERENCE_DATA = [
  {
    category: "Core Languages",
    icon: <Code2 size={16} />,
    items: [
      { name: "C++", href: "/cpp", icon: <Code2 size={18} />, desc: "Low-level systems, performance, and STL patterns." },
      { name: "JavaScript", href: "/javascript", icon: <Braces size={18} />, desc: "Modern syntax, async flows, and browser fundamentals." },
      { name: "Python", href: "/python", icon: <FileCode2 size={18} />, desc: "Data work, automation, and clean backend scripting." },
      { name: "TypeScript", href: "/typescript", icon: <FileCode2 size={18} />, desc: "Types, interfaces, and safer large-scale JavaScript systems." },
      { name: "Go", href: "/go", icon: <Binary size={18} />, desc: "Simple concurrency, tooling, and service-oriented code." },
      { name: "Rust", href: "/rust", icon: <ShieldCheck size={18} />, desc: "Ownership, performance, and safety-first systems design." },
      { name: "Java", href: "/java", icon: <Code2 size={18} />, desc: "Enterprise patterns, JVM tooling, and backend architecture." },
      { name: "C#", href: "/csharp", icon: <ShieldCheck size={18} />, desc: "Strong typing, .NET frameworks, and application structure." },
    ],
  },
  {
    category: "Frontend & Web",
    icon: <Globe size={16} />,
    items: [
      { name: "React", href: "/react", icon: <Globe size={18} />, desc: "Components, state, effects, and rendering patterns." },
      { name: "Next.js", href: "/nextjs", icon: <Globe size={18} />, desc: "App routing, server rendering, and performance patterns." },
      { name: "CSS", href: "/css", icon: <Sparkles size={18} />, desc: "Layout, design systems, and modern responsive styling." },
      { name: "HTML", href: "/html", icon: <Code2 size={18} />, desc: "Structure, semantics, and accessible document foundations." },
      { name: "Tailwind", href: "/tailwind", icon: <Sparkles size={18} />, desc: "Utility-first styling, tokens, and rapid UI composition." },
      { name: "Accessibility", href: "/accessibility", icon: <ShieldCheck size={18} />, desc: "Semantic structure, keyboard flows, and inclusive UI." },
    ],
  },
  {
    category: "Backend & Systems",
    icon: <TerminalSquare size={16} />,
    items: [
      { name: "Bash", href: "/bash", icon: <TerminalSquare size={18} />, desc: "Shell workflows, pipelines, and automation basics." },
      { name: "Node.js", href: "/nodejs", icon: <Binary size={18} />, desc: "Runtime fundamentals and server-side JavaScript patterns." },
      { name: "SQL", href: "/sql", icon: <Database size={18} />, desc: "Queries, joins, indexing, and data modeling essentials." },
      { name: "APIs", href: "/apis", icon: <Lock size={18} />, desc: "Request patterns, auth flows, and contract design." },
      { name: "Docker", href: "/docker", icon: <TerminalSquare size={18} />, desc: "Containers, images, and deployment isolation basics." },
      { name: "Git", href: "/git", icon: <Code2 size={18} />, desc: "Branching, commits, and collaboration workflows." },
    ],
  },
  {
    category: "Concepts & Patterns",
    icon: <Sparkles size={16} />,
    items: [
      { name: "Async", href: "/async", icon: <Braces size={18} />, desc: "Promises, async/await, event loops, and scheduling." },
      { name: "Testing", href: "/testing", icon: <TestTube size={18} />, desc: "Unit tests, integration coverage, and reliability habits." },
      { name: "Security", href: "/security", icon: <ShieldCheck size={18} />, desc: "Auth, validation, and safer defaults for production code." },
      { name: "Data Structures", href: "/data-structures", icon: <Database size={18} />, desc: "Arrays, trees, hash maps, and choosing the right shape." },
      { name: "Algorithms", href: "/algorithms", icon: <Binary size={18} />, desc: "Sorting, traversal, recursion, and complexity trade-offs." },
      { name: "System Design", href: "/system-design", icon: <Globe size={18} />, desc: "Scalability, resilience, and architecture composition." },
      { name: "State Management", href: "/state-management", icon: <Braces size={18} />, desc: "Global UI state, immutability, and predictable app flows." },
      { name: "OAuth", href: "/oauth", icon: <Lock size={18} />, desc: "Delegated access, tokens, and identity flows in real apps." },
      { name: "Caching", href: "/caching", icon: <Database size={18} />, desc: "Read-through patterns, invalidation, and latency reduction." },
      { name: "Web Security", href: "/web-security", icon: <ShieldCheck size={18} />, desc: "XSS, CSRF, headers, and safer web defaults." },
      { name: "Design Patterns", href: "/design-patterns", icon: <Sparkles size={18} />, desc: "Factory, strategy, observer, and reusable software shapes." },
      { name: "Dependency Injection", href: "/dependency-injection", icon: <Braces size={18} />, desc: "Loose coupling, wiring, and testable architecture." },
      { name: "Validation", href: "/validation", icon: <ShieldCheck size={18} />, desc: "Input checks, schema rules, and safer user data flows." },
    ],
  },
  {
    category: "Architecture & DevOps",
    icon: <Globe size={16} />,
    items: [
      { name: "Microservices", href: "/microservices", icon: <Globe size={18} />, desc: "Service boundaries, contracts, and deployment autonomy." },
      { name: "Event-Driven", href: "/event-driven", icon: <Binary size={18} />, desc: "Streams, decoupling, and asynchronous communication patterns." },
      { name: "Load Balancing", href: "/load-balancing", icon: <TerminalSquare size={18} />, desc: "Traffic distribution, resilience, and horizontal scale." },
      { name: "Kubernetes", href: "/kubernetes", icon: <TerminalSquare size={18} />, desc: "Container orchestration, scaling, and service management." },
      { name: "Deployment", href: "/deployment", icon: <ShieldCheck size={18} />, desc: "Release flow, environments, rollout safety, and automation." },
      { name: "Monitoring", href: "/monitoring", icon: <Sparkles size={18} />, desc: "Metrics, logs, traces, and runtime health visibility." },
      { name: "Cloud Architecture", href: "/cloud-architecture", icon: <Globe size={18} />, desc: "Multi-region design, edge services, and resilient platforms." },
      { name: "Databases", href: "/databases", icon: <Database size={18} />, desc: "Storage models, schemas, indexes, and query trade-offs." },
      { name: "Reliability", href: "/reliability", icon: <ShieldCheck size={18} />, desc: "Failover, redundancy, and designing for graceful degradation." },
    ],
  },
  {
    category: "Data & AI",
    icon: <Database size={16} />,
    items: [
      { name: "Data Science", href: "/data-science", icon: <Database size={18} />, desc: "Analysis, notebooks, and patterns for working with data." },
      { name: "Machine Learning", href: "/ml", icon: <Binary size={18} />, desc: "Model basics, pipelines, and practical deployment notes." },
      { name: "LLMs", href: "/llms", icon: <Sparkles size={18} />, desc: "Prompt design, structured outputs, and app integration basics." },
      { name: "Vectors", href: "/vectors", icon: <Database size={18} />, desc: "Embeddings, similarity search, and retrieval patterns." },
      { name: "Prompt Engineering", href: "/prompt-engineering", icon: <Sparkles size={18} />, desc: "Instruction design, context framing, and reliable outputs." },
      { name: "RAG", href: "/rag", icon: <Database size={18} />, desc: "Grounded generation with retrieval and relevance filtering." },
      { name: "Model Evaluation", href: "/model-evaluation", icon: <TestTube size={18} />, desc: "Benchmarking, scoring, and quality checks for outputs." },
      { name: "AI Safety", href: "/ai-safety", icon: <ShieldCheck size={18} />, desc: "Guardrails, risk mitigation, and responsible model usage." },
      { name: "Agents", href: "/agents", icon: <Sparkles size={18} />, desc: "Tool use, planning loops, and autonomous execution patterns." },
    ],
  },
  {
    category: "Developer Tools",
    icon: <TerminalSquare size={16} />,
    items: [
      { name: "VS Code", href: "/vscode", icon: <TerminalSquare size={18} />, desc: "Editor workflows, extensions, and keyboard efficiency." },
      { name: "Linux", href: "/linux", icon: <TerminalSquare size={18} />, desc: "Filesystems, processes, permissions, and command-line habits." },
      { name: "CI/CD", href: "/ci-cd", icon: <ShieldCheck size={18} />, desc: "Pipelines, automation, and release safety checks." },
      { name: "Observability", href: "/observability", icon: <Sparkles size={18} />, desc: "Logging, tracing, and debugging production systems." },
      { name: "Nginx", href: "/nginx", icon: <TerminalSquare size={18} />, desc: "Reverse proxying, performance tuning, and request routing." },
      { name: "Terraform", href: "/terraform", icon: <ShieldCheck size={18} />, desc: "Infrastructure as code, repeatable environments, and provisioning." },
      { name: "GitHub Actions", href: "/github-actions", icon: <Code2 size={18} />, desc: "CI pipelines, automation, and shipping code confidently." },
      { name: "Webpack", href: "/webpack", icon: <Sparkles size={18} />, desc: "Bundling, module resolution, and frontend build optimization." },
      { name: "Vercel", href: "/vercel", icon: <Globe size={18} />, desc: "Edge deployment, previews, and modern app delivery." },
      { name: "Debugging", href: "/debugging", icon: <TestTube size={18} />, desc: "Root cause analysis, traces, breakpoints, and narrowing bugs." },
    ],
  },
];

export default function LandingPage() {
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  
  const [cmdOpen, setCmdOpen] = useState(false);
  const { modifierKey, isMounted } = useSearchOSKey();
  
  const [githubStats, setGithubStats] = useState({
    stars: "-",
    openIssues: "-",
    openPrs: "-",
    mergedPrs: "-",
    contributors: [] as any[],
    loading: true
  });

  const themeClasses = {
    page: darkMode ? "bg-[#0a0a0a] text-[#ededed]" : "bg-[#FFFFFF] text-[#111111]",
    header: darkMode ? "bg-[#0a0a0a]/95" : "bg-[#FFFFFF]/95",
    panel: darkMode ? "bg-[#141414]" : "bg-[#F7F7F7]",
    border: darkMode ? "border-[#333333]" : "border-[#E5E5E5]",
    muted: darkMode ? "text-zinc-400" : "text-zinc-500",
    accent: darkMode ? "text-zinc-100" : "text-zinc-900",
    inputBg: darkMode ? "bg-[#1a1a1a]" : "bg-[#F4F4F4]",
    hoverAccent: darkMode ? "hover:text-[#C699FF]" : "hover:text-[#6f45d6]",
    cardHover: darkMode
      ? "hover:border-[#555] hover:bg-[#141414]"
      : "hover:border-[#ccc] hover:bg-[#fafafa]",
    iconBox: darkMode ? "bg-[#1a1a1a] border-[#333] text-zinc-400" : "bg-[#f4f4f4] border-[#E5E5E5] text-zinc-500",
    iconBoxHover: darkMode 
      ? "group-hover:text-white" 
      : "group-hover:text-black",
  };

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [repoRes, openPrsRes, mergedPrsRes, issuesRes, contributorsRes] = await Promise.all([
          fetch('https://api.github.com/repos/yash-pluto/refme').catch(() => null),
          fetch('https://api.github.com/search/issues?q=repo:yash-pluto/refme+is:pr+is:open').catch(() => null),
          fetch('https://api.github.com/search/issues?q=repo:yash-pluto/refme+is:pr+is:merged').catch(() => null),
          fetch('https://api.github.com/search/issues?q=repo:yash-pluto/refme+is:issue+is:open').catch(() => null),
          fetch('https://api.github.com/repos/yash-pluto/refme/contributors').catch(() => null)
        ]);

        const repoData = repoRes && repoRes.ok ? await repoRes.json() : {};
        const openPrsData = openPrsRes && openPrsRes.ok ? await openPrsRes.json() : {};
        const mergedPrsData = mergedPrsRes && mergedPrsRes.ok ? await mergedPrsRes.json() : {};
        const issuesData = issuesRes && issuesRes.ok ? await issuesRes.json() : {};
        const contributorsData = contributorsRes && contributorsRes.ok ? await contributorsRes.json() : [];

        setGithubStats({
          stars: repoData.stargazers_count !== undefined ? repoData.stargazers_count.toString() : "-",
          openIssues: issuesData.total_count !== undefined ? issuesData.total_count.toString() : "-",
          openPrs: openPrsData.total_count !== undefined ? openPrsData.total_count.toString() : "-",
          mergedPrs: mergedPrsData.total_count !== undefined ? mergedPrsData.total_count.toString() : "-",
          contributors: Array.isArray(contributorsData) ? contributorsData : [],
          loading: false
        });
      } catch (error) {
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGitHubStats();
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
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center">
                <img src="/refme-logo.svg" alt="RefMe Logo" className="h-7 w-7" />
              </div>
              <span className={`hidden md:block text-sm font-bold tracking-widest uppercase ${themeClasses.accent}`}>RefMe</span>
            </button>
          </div>

          <div className="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
            <button onClick={() => setCmdOpen(true)} className={`flex w-full items-center justify-between rounded-full border px-4 py-1.5 transition-all hover:border-[#C699FF]/50 ${themeClasses.border} ${themeClasses.inputBg}`}>
              <div className="flex items-center gap-3 text-sm opacity-60"><Search className="h-4 w-4" /> <span>Search...</span></div>
              <span className={`hidden md:block rounded border border-current/20 px-1.5 py-0.5 text-[10px] font-bold opacity-50`}>{modifierKey}K</span>
            </button>
          </div>

          <button onClick={toggleTheme} className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${themeClasses.border} ${themeClasses.panel} ${themeClasses.hoverAccent}`}>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <section className={`relative border-b overflow-hidden w-full ${themeClasses.border} px-4 py-12 sm:py-16 md:px-6 lg:px-8 lg:py-32`}>
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <div className={`text-[11px] font-bold uppercase tracking-[0.2em] ${themeClasses.muted}`}>
                Syntax • Patterns • Architecture
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-[72px] lg:leading-[1.1] text-balance">
                Reference that keeps pace with your code.
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${themeClasses.muted}`}>
                RefMe turns scattered documentation into clean, accessible syntax and architectural patterns: no endless scrolling, no outdated tutorials.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={() => router.push('/javascript')} 
                  className={`rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-[0.98] ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
                >
                  Start reading
                </button>

                <a 
                  href="https://github.com/yash-pluto/refme" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${themeClasses.border}`}
                >
                  View on GitHub
                </a>
              </div>

              <div className={`flex items-center gap-6 pt-6 text-sm font-medium ${themeClasses.muted}`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} /> Open Source
                </div>
                <div className="flex items-center gap-2">
                  <Code2 size={16} /> Community Driven
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full flex justify-end relative mt-10 lg:mt-0">
              
              <div className={`relative z-10 flex flex-col rounded-3xl border w-full max-w-[600px] shadow-2xl overflow-hidden ${darkMode ? "bg-[#0a0a0a] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                
                <div className={`p-6 sm:p-10 border-b ${darkMode ? "bg-[#111] border-[#333]" : "bg-zinc-50 border-[#E5E5E5]"}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      <img 
                        src="https://github.com/yash-pluto.png" 
                        alt="Yash Vardhan" 
                        className={`h-20 w-20 rounded-full border-4 shadow-sm ${darkMode ? "border-[#222]" : "border-white"}`} 
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <a href="https://yash-pluto.vercel.app/" target="_blank" rel="noopener noreferrer" className={`text-2xl font-extrabold tracking-tight hover:underline ${darkMode ? "text-white" : "text-black"}`}>
                            Yash-Pluto
                          </a>
                          <BadgeCheck size={24} className="text-[#C699FF]" />
                        </div>
                        <p className={`text-sm font-medium ${themeClasses.muted}`}>Lead Maintainer</p>
                      </div>
                    </div>
                    <a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className="pt-1">
                      <FaGithub size={32} className={`${darkMode ? "text-white" : "text-zinc-900"} hover:opacity-70 transition-opacity`} />
                    </a>
                  </div>
                  
                  <p className={`text-base leading-relaxed mb-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    Join the community building the ultimate quick-reference. Contributions are welcome for all categories and languages.
                  </p>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border ${darkMode ? "bg-[#1a1a1a] border-[#333] shadow-inner" : "bg-white border-[#E5E5E5] shadow-sm"}`}>
                      <span className="text-[#C699FF] text-base font-black">✓</span>
                      <span className={`text-xs font-bold uppercase tracking-wide ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Open Source Architecture</span>
                    </div>
                    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border ${darkMode ? "bg-[#1a1a1a] border-[#333] shadow-inner" : "bg-white border-[#E5E5E5] shadow-sm"}`}>
                      <span className="text-[#C699FF] text-base font-black">✓</span>
                      <span className={`text-xs font-bold uppercase tracking-wide ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Community Driven Updates</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    
                    <div className={`flex flex-col justify-between p-4 rounded-xl border ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"} shadow-sm`}>
                      <div className="flex items-center gap-2 mb-3">
                        <GitPullRequest size={16} className="text-emerald-500" />
                        <span className={`text-xs font-bold uppercase tracking-wider ${themeClasses.muted}`}>Open PRs</span>
                      </div>
                      <span className={`text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-black"}`}>{githubStats.openPrs}</span>
                    </div>
                    
                    <div className={`flex flex-col justify-between p-4 rounded-xl border ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"} shadow-sm`}>
                      <div className="flex items-center gap-2 mb-3">
                        <GitMerge size={16} className="text-purple-500" />
                        <span className={`text-xs font-bold uppercase tracking-wider ${themeClasses.muted}`}>Merged</span>
                      </div>
                      <span className={`text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-black"}`}>{githubStats.mergedPrs}</span>
                    </div>

                    <div className={`flex flex-col justify-between p-4 rounded-xl border ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"} shadow-sm`}>
                      <div className="flex items-center gap-2 mb-3">
                        <CircleDot size={16} className="text-emerald-500" />
                        <span className={`text-xs font-bold uppercase tracking-wider ${themeClasses.muted}`}>Issues</span>
                      </div>
                      <span className={`text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-black"}`}>{githubStats.openIssues}</span>
                    </div>

                    <div className={`flex flex-col justify-between p-4 rounded-xl border ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"} shadow-sm`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Star size={16} className="text-amber-500" />
                        <span className={`text-xs font-bold uppercase tracking-wider ${themeClasses.muted}`}>Stars</span>
                      </div>
                      <span className={`text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-black"}`}>{githubStats.stars}</span>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                      {githubStats.contributors.length > 0 && (
                        <>
                          <div className="flex -space-x-3">
                            {githubStats.contributors.slice(0, 5).map((user: any, idx: number) => (
                              <img 
                                key={user.id} 
                                src={user.avatar_url} 
                                alt={user.login}
                                title={user.login}
                                className={`h-10 w-10 rounded-full border-[3px] ${darkMode ? 'border-[#0a0a0a]' : 'border-white'} shadow-sm`}
                                style={{ zIndex: 10 - idx, opacity: 1 - (idx * 0.12) }} 
                              />
                            ))}
                          </div>
                          <p className={`text-xs font-semibold ${themeClasses.muted}`}>
                            {githubStats.contributors.length > 5 ? `+${githubStats.contributors.length - 5} contributors` : 'Awesome contributors'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`hidden md:flex absolute -top-8 -right-8 z-20 items-center gap-3 rounded-xl border p-3.5 shadow-xl ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${darkMode ? "text-white" : "text-black"}`}>Build passing</p>
                  <p className={`text-[10px] ${themeClasses.muted}`}>Main branch</p>
                </div>
              </div>

              <div className={`hidden md:flex absolute -bottom-8 -left-8 z-20 items-center gap-3 rounded-xl border p-3.5 shadow-xl ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${darkMode ? "bg-[#222] text-white" : "bg-zinc-100 text-black"}`}>
                  <GitPullRequest size={16} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${darkMode ? "text-white" : "text-black"}`}>PR Merged</p>
                  <p className={`text-[10px] ${themeClasses.muted}`}>Docs updated • 2m ago</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1400px] px-4 py-16 md:px-6 lg:px-8">
        <div className="space-y-20">
          {REFERENCE_DATA.map((category) => (
            <section key={category.category} className="scroll-mt-24">
              <div className={`mb-6 flex items-center gap-3 border-b pb-3 ${themeClasses.border}`}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                  {category.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item: any) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`group flex items-start gap-4 rounded-xl border p-4 transition-all duration-200 ${themeClasses.border} ${themeClasses.cardHover}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${themeClasses.iconBox} ${themeClasses.iconBoxHover}`}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className={`text-sm font-semibold truncate transition-colors duration-200 ${darkMode ? "text-zinc-200 group-hover:text-white" : "text-zinc-800 group-hover:text-black"}`}>
                        {item.name}
                      </h3>
                      <p className={`mt-1 text-[13px] leading-snug line-clamp-2 transition-colors duration-200 ${themeClasses.muted} ${darkMode ? "group-hover:text-zinc-300" : "group-hover:text-zinc-600"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

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