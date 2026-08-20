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
  CheckCircle2,
  ArrowRight,
  Play,
  Copy,
  Map
} from "lucide-react";

export const REFERENCE_DATA = [
  {
    category: "Core Languages",
    icon: <Code2 size={20} />,
    items: [
      { name: "C++", href: "/cpp", icon: <Code2 size={18} />, desc: "Low-level systems, memory management, and STL patterns." },
      { name: "JavaScript", href: "/javascript", icon: <Braces size={18} />, desc: "Modern syntax, async flows, and browser fundamentals." },
      { name: "Python", href: "/python", icon: <FileCode2 size={18} />, desc: "Data processing, automation scripts, and backend architectures." },
      { name: "TypeScript", href: "/typescript", icon: <FileCode2 size={18} />, desc: "Strict typing, interfaces, and large-scale JS systems." },
      { name: "Go", href: "/go", icon: <Binary size={18} />, desc: "Concurrency models, tooling, and service-oriented code." },
      { name: "Rust", href: "/rust", icon: <ShieldCheck size={18} />, desc: "Memory ownership, performance, and safety-first design." },
      { name: "Java", href: "/java", icon: <Code2 size={18} />, desc: "Enterprise patterns, JVM performance, and OOP structures." },
      { name: "C#", href: "/csharp", icon: <ShieldCheck size={18} />, desc: "Strong typing, .NET frameworks, and scalable applications." },
    ],
  },
  {
    category: "Frontend & Web",
    icon: <Globe size={20} />,
    items: [
      { name: "React", href: "/react", icon: <Globe size={18} />, desc: "Component lifecycles, state management, and effects." },
      { name: "Next.js", href: "/nextjs", icon: <Globe size={18} />, desc: "App router, SSR, static generation, and API routes." },
      { name: "CSS", href: "/css", icon: <Sparkles size={18} />, desc: "Flexbox, Grid, design systems, and responsive layouts." },
      { name: "HTML", href: "/html", icon: <Code2 size={18} />, desc: "Document structure, semantic web, and DOM fundamentals." },
      { name: "Tailwind", href: "/tailwind", icon: <Sparkles size={18} />, desc: "Utility-first design, configuration, and rapid UI." },
      { name: "Accessibility", href: "/accessibility", icon: <ShieldCheck size={18} />, desc: "ARIA roles, keyboard navigation, and inclusive design." },
    ],
  },
  {
    category: "Backend & Systems",
    icon: <TerminalSquare size={20} />,
    items: [
      { name: "Bash", href: "/bash", icon: <TerminalSquare size={18} />, desc: "Shell scripting, pipelines, and server automation." },
      { name: "Node.js", href: "/nodejs", icon: <Binary size={18} />, desc: "V8 runtime, event loop, and server-side TS/JS." },
      { name: "SQL", href: "/sql", icon: <Database size={18} />, desc: "Relational queries, table joins, and performance indexing." },
      { name: "APIs", href: "/apis", icon: <Lock size={18} />, desc: "RESTful architecture, GraphQL, and request contracts." },
      { name: "Docker", href: "/docker", icon: <TerminalSquare size={18} />, desc: "Containerization, volumes, and deployment isolation." },
      { name: "Git", href: "/git", icon: <Code2 size={18} />, desc: "Version control, branching strategies, and rebasing." },
    ],
  },
  {
    category: "Concepts & Patterns",
    icon: <Sparkles size={20} />,
    items: [
      { name: "Async", href: "/async", icon: <Braces size={18} />, desc: "Promises, event loops, and asynchronous scheduling." },
      { name: "Testing", href: "/testing", icon: <TestTube size={18} />, desc: "Unit assertions, integration flows, and mocking." },
      { name: "Security", href: "/security", icon: <ShieldCheck size={18} />, desc: "Authentication, authorization, and data validation." },
      { name: "Data Structures", href: "/data-structures", icon: <Database size={18} />, desc: "Memory layouts, trees, graphs, and hash maps." },
      { name: "Algorithms", href: "/algorithms", icon: <Binary size={18} />, desc: "Time complexity, sorting, and traversal methods." },
      { name: "System Design", href: "/system-design", icon: <Globe size={18} />, desc: "Horizontal scaling, bottlenecks, and distributed computing." },
      { name: "State Management", href: "/state-management", icon: <Braces size={18} />, desc: "Global stores, context isolation, and immutability." },
      { name: "OAuth", href: "/oauth", icon: <Lock size={18} />, desc: "Delegated access, JWTs, and secure identity flows." },
      { name: "Caching", href: "/caching", icon: <Database size={18} />, desc: "Redis patterns, invalidation, and edge networks." },
      { name: "Web Security", href: "/web-security", icon: <ShieldCheck size={18} />, desc: "XSS prevention, CSRF tokens, and security headers." },
      { name: "Design Patterns", href: "/design-patterns", icon: <Sparkles size={18} />, desc: "Singleton, Factory, Observer, and SOLID principles." },
      { name: "Dependency Injection", href: "/dependency-injection", icon: <Braces size={18} />, desc: "Inversion of control and modular architecture." },
      { name: "Validation", href: "/validation", icon: <ShieldCheck size={18} />, desc: "Schema parsing, type guarding, and error handling." },
    ],
  },
  {
    category: "Architecture & DevOps",
    icon: <Globe size={20} />,
    items: [
      { name: "Microservices", href: "/microservices", icon: <Globe size={18} />, desc: "Service decoupling, bounded contexts, and API gateways." },
      { name: "Event-Driven", href: "/event-driven", icon: <Binary size={18} />, desc: "Message brokers, pub/sub, and eventual consistency." },
      { name: "Load Balancing", href: "/load-balancing", icon: <TerminalSquare size={18} />, desc: "Traffic distribution, health checks, and reverse proxies." },
      { name: "Kubernetes", href: "/kubernetes", icon: <TerminalSquare size={18} />, desc: "Pod orchestration, cluster scaling, and deployment manifests." },
      { name: "Deployment", href: "/deployment", icon: <ShieldCheck size={18} />, desc: "Blue-green releases, canary rollouts, and CI pipelines." },
      { name: "Monitoring", href: "/monitoring", icon: <Sparkles size={18} />, desc: "Telemetry, distributed tracing, and incident alerting." },
      { name: "Cloud Architecture", href: "/cloud-architecture", icon: <Globe size={18} />, desc: "AWS/GCP infrastructure, VPCs, and serverless compute." },
      { name: "Databases", href: "/databases", icon: <Database size={18} />, desc: "NoSQL vs SQL, replication, and sharding strategies." },
      { name: "Reliability", href: "/reliability", icon: <ShieldCheck size={18} />, desc: "Fault tolerance, circuit breakers, and SLA targeting." },
    ],
  },
  {
    category: "Data & AI",
    icon: <Database size={20} />,
    items: [
      { name: "Data Science", href: "/data-science", icon: <Database size={18} />, desc: "Statistical models, Jupyter notebooks, and pandas processing." },
      { name: "Machine Learning", href: "/ml", icon: <Binary size={18} />, desc: "Supervised training, neural networks, and model deployment." },
      { name: "LLMs", href: "/llms", icon: <Sparkles size={18} />, desc: "Transformer architectures, tokenization, and API integration." },
      { name: "Vectors", href: "/vectors", icon: <Database size={18} />, desc: "High-dimensional embeddings and cosine similarity search." },
      { name: "Prompt Engineering", href: "/prompt-engineering", icon: <Sparkles size={18} />, desc: "Few-shot learning, context windows, and output framing." },
      { name: "RAG", href: "/rag", icon: <Database size={18} />, desc: "Retrieval-augmented generation and knowledge grounding." },
      { name: "Model Evaluation", href: "/model-evaluation", icon: <TestTube size={18} />, desc: "Accuracy benchmarking, hallucination checks, and scoring." },
      { name: "AI Safety", href: "/ai-safety", icon: <ShieldCheck size={18} />, desc: "Prompt injection defense, guardrails, and data privacy." },
      { name: "Agents", href: "/agents", icon: <Sparkles size={18} />, desc: "ReAct patterns, tool calling, and autonomous loops." },
    ],
  },
  {
    category: "Developer Tools",
    icon: <TerminalSquare size={20} />,
    items: [
      { name: "VS Code", href: "/vscode", icon: <TerminalSquare size={18} />, desc: "Workspace configuration, snippets, and integrated debugging." },
      { name: "Linux", href: "/linux", icon: <TerminalSquare size={18} />, desc: "Kernel architecture, system permissions, and POSIX standards." },
      { name: "CI/CD", href: "/ci-cd", icon: <ShieldCheck size={18} />, desc: "Continuous integration, artifact building, and delivery." },
      { name: "Observability", href: "/observability", icon: <Sparkles size={18} />, desc: "Log aggregation, metrics dashboards, and performance tracking." },
      { name: "Nginx", href: "/nginx", icon: <TerminalSquare size={18} />, desc: "Web serving, TLS termination, and connection tuning." },
      { name: "Terraform", href: "/terraform", icon: <ShieldCheck size={18} />, desc: "Infrastructure as code, state management, and provider blocks." },
      { name: "GitHub Actions", href: "/github-actions", icon: <Code2 size={18} />, desc: "Workflow YAMLs, runner environments, and matrix builds." },
      { name: "Webpack", href: "/webpack", icon: <Sparkles size={18} />, desc: "Asset bundling, code splitting, and tree shaking." },
      { name: "Vercel", href: "/vercel", icon: <Globe size={18} />, desc: "Edge functions, middleware routing, and preview environments." },
      { name: "Debugging", href: "/debugging", icon: <TestTube size={18} />, desc: "Memory profiling, network waterfalls, and root cause analysis." },
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

  const [cycle, setCycle] = useState(0);

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
      ? "hover:border-[#555] hover:bg-[#111]"
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
    const interval = setInterval(() => {
      setCycle(c => (c + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
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

  const dynamicBuildStats = [
    { title: "Active Community", desc: `${githubStats.contributors.length} devs building RefMe`, icon: <CheckCircle2 size={16} />, bg: darkMode ? "bg-white text-black" : "bg-black text-white" },
    { title: "Repository Reach", desc: `${githubStats.stars} developers starred`, icon: <Star size={16} />, bg: darkMode ? "bg-[#222] text-white" : "bg-zinc-100 text-black" },
    { title: "Code Reviews", desc: `${githubStats.openPrs} pull requests pending`, icon: <GitPullRequest size={16} />, bg: darkMode ? "bg-[#222] text-white" : "bg-zinc-100 text-black" }
  ];

  const dynamicActivityFeeds = [
    { title: "Codebase Integrity", desc: `${githubStats.mergedPrs} PRs successfully merged`, icon: <GitMerge size={16} />, bg: darkMode ? "bg-[#222] text-white" : "bg-zinc-100 text-black" },
    { title: "Issue Tracking", desc: `${githubStats.openIssues} active issues logged`, icon: <CircleDot size={16} />, bg: darkMode ? "bg-[#222] text-white" : "bg-zinc-100 text-black" },
    { title: "Community Driven", desc: "Open-source architecture", icon: <Globe size={16} />, bg: darkMode ? "bg-[#222] text-white" : "bg-zinc-100 text-black" }
  ];

  const currentBuild = dynamicBuildStats[cycle];
  const currentActivity = dynamicActivityFeeds[cycle];

  return (
    <div className={`${themeClasses.page} min-h-screen flex flex-col transition-colors duration-200 overflow-x-hidden`}>
      
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

     <section className={`relative border-b w-full ${themeClasses.border} px-4 py-12 sm:py-16 md:px-6 lg:px-8 lg:py-32`}>
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            
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
                <div className="relative group inline-flex">
                  <button 
                    onClick={() => router.push('/javascript')} 
                    className={`rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-[0.98] ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
                  >
                    Start reading
                  </button>
                  <div className={`absolute top-full left-1/2 mt-3 -translate-x-1/2 px-4 py-2 rounded-lg text-[13px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border shadow-2xl ${darkMode ? "bg-[#222222] text-white border-[#333333]" : "bg-white text-black border-[#E5E5E5]"}`}>
                    Explore JS, React, System Design & more
                  </div>
                </div>

                <a 
                  href="https://github.com/yash-pluto/refme" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${themeClasses.border}`}
                >
                  View on GitHub
                </a>
              </div>

              <div className="pt-6 flex flex-col gap-5">
                <div className={`flex items-center gap-6 text-sm font-semibold ${themeClasses.muted}`}>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} /> Open Source
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 size={16} /> Community Driven
                  </div>
                </div>
                
                <Link href="/docs" className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase transition-colors w-fit ${darkMode ? "text-[#C699FF] hover:text-white" : "text-[#6f45d6] hover:text-black"}`}>
                  Read the RefMe Philosophy <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end relative mt-10 lg:mt-0">
              
              <div className={`relative z-10 flex flex-col rounded-3xl border w-full max-w-[560px] shadow-2xl overflow-hidden ${darkMode ? "bg-[#0a0a0a] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                
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
                          <div className="flex -space-x-4">
                            {githubStats.contributors.slice(0, 5).map((user: any, idx: number) => (
                              <img 
                                key={user.id} 
                                src={user.avatar_url} 
                                alt={user.login}
                                title={user.login}
                                className={`h-10 w-10 rounded-full border-[3px] ${darkMode ? 'border-[#0a0a0a]' : 'border-white'} shadow-md`}
                                style={{ zIndex: 10 - idx, opacity: 1 - (idx * 0.12) }} 
                              />
                            ))}
                          </div>
                          <p className={`text-xs font-bold uppercase tracking-wider pl-1 ${themeClasses.muted}`}>
                            {githubStats.contributors.length > 5 ? `+${githubStats.contributors.length - 5} Contributors` : 'Contributors'}
                          </p>
                        </>
                      )}
                    </div>
                    
                    <a 
                      href="https://github.com/yash-pluto/refme" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all active:scale-[0.98] ${darkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}
                    >
                      <FaGithub size={18} /> Contribute on GitHub
                    </a>
                  </div>
                </div>

              </div>

              {/* Dynamic Floating Element 1 - Top Right */}
              <div key={`build-${cycle}`} className={`absolute -top-12 right-0 sm:-top-8 sm:-right-8 z-20 flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5 shadow-2xl scale-[0.85] sm:scale-100 origin-top-right sm:origin-center animate-in fade-in zoom-in duration-500 pointer-events-none ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentBuild.bg}`}>
                  {currentBuild.icon}
                </div>
                <div className="pr-2">
                  <p className={`text-[13px] font-bold ${darkMode ? "text-white" : "text-black"}`}>{currentBuild.title}</p>
                  <p className={`text-[11px] font-medium ${themeClasses.muted}`}>{currentBuild.desc}</p>
                </div>
              </div>

              {/* Dynamic Floating Element 2 - Bottom Left */}
              <div key={`activity-${cycle}`} className={`absolute -bottom-12 left-0 sm:-bottom-8 sm:-left-8 z-20 flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5 shadow-2xl scale-[0.85] sm:scale-100 origin-bottom-left sm:origin-center animate-in fade-in zoom-in duration-500 pointer-events-none ${darkMode ? "bg-[#141414] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentActivity.bg}`}>
                  {currentActivity.icon}
                </div>
                <div className="pr-2">
                  <p className={`text-[13px] font-bold ${darkMode ? "text-white" : "text-black"}`}>{currentActivity.title}</p>
                  <p className={`text-[11px] font-medium ${themeClasses.muted}`}>{currentActivity.desc}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
      {/* Refined 3-Step Process - Learning Centric */}
      <section className={`py-24 border-b ${themeClasses.border} ${darkMode ? "bg-[#050505]" : "bg-zinc-50/50"}`}>
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Three steps to master any tech stack.
          </h2>
          <p className={`max-w-2xl mx-auto text-base md:text-lg mb-20 ${themeClasses.muted}`}>
            Stop getting stuck in tutorial hell. Follow curated roadmaps, learn from high-quality videos, and reference syntax on the fly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 text-left">
            
            {/* Step 1: Roadmaps */}
            <div className="flex flex-col relative">
              <Link href="/roadmaps" className={`group h-56 mb-8 rounded-2xl border flex flex-col relative overflow-hidden transition-colors ${darkMode ? "bg-[#0a0a0a] border-[#333] hover:border-[#555]" : "bg-white border-[#E5E5E5] hover:border-[#ccc]"}`}>
                <div className={`px-5 py-4 border-b flex items-center justify-between ${darkMode ? "bg-[#111] border-[#333]" : "bg-zinc-50 border-[#E5E5E5]"}`}>
                  <div className="flex items-center gap-2">
                    <Map size={14} className={themeClasses.muted} />
                    <span className="text-xs font-bold uppercase tracking-wider">Frontend Path</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? "bg-[#222] text-zinc-300" : "bg-zinc-200 text-zinc-700"}`}>Module 2</span>
                </div>
                <div className="flex-1 p-5 relative pl-8 border-l-2 border-dashed ml-6 mt-4 mb-4 space-y-5 border-zinc-200 dark:border-zinc-800">
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">HTML & CSS</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">JavaScript Basics</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(198,153,255,0)] bg-zinc-300 dark:bg-zinc-700 group-hover:bg-[#C699FF] group-hover:shadow-[0_0_10px_rgba(198,153,255,0.8)]" />
                    <span className="text-xs font-bold transition-colors text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">React Components</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center mb-6 w-full">
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold border shadow-sm relative z-10 ${darkMode ? "bg-white text-black border-white" : "bg-black text-white border-black"}`}>
                  1
                </div>
                <div className={`hidden md:block flex-1 h-[1px] w-[calc(100%+2.5rem)] ${darkMode ? 'bg-[#333]' : 'bg-[#E5E5E5]'}`} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Pick your roadmap</h3>
              <p className={`text-sm leading-relaxed ${themeClasses.muted}`}>
                Whether you're a student or a senior dev, find the exact step-by-step path to learn Frontend, Backend, or DevOps.
              </p>
            </div>

            {/* Step 2: Tutorials */}
            <div className="flex flex-col relative">
              <Link href="/tutorials" className={`group h-56 mb-8 rounded-2xl border flex flex-col relative overflow-hidden transition-colors ${darkMode ? "bg-[#0a0a0a] border-[#333] hover:border-[#555]" : "bg-white border-[#E5E5E5] hover:border-[#ccc]"}`}>
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 group-hover:bg-transparent transition-colors z-10" />
                <div className={`flex-1 relative flex items-center justify-center ${darkMode ? "bg-[#111]" : "bg-zinc-100"}`}>
                  <div className={`w-12 h-12 rounded-full border shadow-lg flex items-center justify-center z-20 transition-all duration-300 group-hover:scale-110 group-hover:text-[#C699FF] ${darkMode ? "bg-[#222] border-[#444]" : "bg-white border-[#E5E5E5]"}`}>
                    <Play className="ml-1" size={18} />
                  </div>
                </div>
                <div className={`h-[68px] px-5 py-3 border-t relative z-20 flex flex-col justify-center ${darkMode ? "bg-[#0a0a0a] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                  <p className="text-xs font-bold truncate">Understanding Server Components</p>
                  <p className={`text-[10px] mt-0.5 ${themeClasses.muted}`}>12:45 • Next.js Advanced</p>
                  <div className="absolute bottom-0 left-0 h-1 bg-[#C699FF] w-[15%] group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </Link>
              <div className="flex items-center mb-6 w-full">
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold border shadow-sm relative z-10 ${darkMode ? "bg-white text-black border-white" : "bg-black text-white border-black"}`}>
                  2
                </div>
                <div className={`hidden md:block flex-1 h-[1px] w-[calc(100%+2.5rem)] ${darkMode ? 'bg-[#333]' : 'bg-[#E5E5E5]'}`} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Watch & Learn</h3>
              <p className={`text-sm leading-relaxed ${themeClasses.muted}`}>
                Access hand-picked video tutorials and instantly reference the core syntax whenever you need it to bridge the gap.
              </p>
            </div>

            {/* Step 3: Reference/Execute */}
            <div className="flex flex-col relative">
              <Link href="/javascript" className={`group h-56 mb-8 rounded-2xl border flex flex-col relative overflow-hidden transition-colors ${darkMode ? "bg-[#0a0a0a] border-[#333] hover:border-[#555]" : "bg-white border-[#E5E5E5] hover:border-[#ccc]"}`}>
                <div className={`px-5 py-3 border-b flex items-center justify-between ${darkMode ? "bg-[#111] border-[#333]" : "bg-zinc-50 border-[#E5E5E5]"}`}>
                  <div className="flex items-center gap-2">
                    <FileCode2 size={14} className="text-blue-500" />
                    <span className="text-xs font-bold">fetchData.ts</span>
                  </div>
                  <div className={`p-1.5 rounded-md border transition-colors ${darkMode ? "bg-[#222] border-[#444] text-zinc-400 group-hover:text-emerald-500" : "bg-white border-[#ccc] text-zinc-500 group-hover:text-emerald-600"}`}>
                    <Copy size={12} />
                  </div>
                </div>
                <div className={`flex-1 p-5 font-mono text-[11px] leading-[1.8] ${darkMode ? "bg-[#0a0a0a] text-zinc-300" : "bg-white text-zinc-600"}`}>
                  <span className="text-purple-500">const</span> fetchUser = <span className="text-purple-500">async</span> () ={'>'} {'{\n'}
                  {'  '}<span className="text-purple-500">const</span> res = <span className="text-purple-500">await</span> <span className="text-blue-500">fetch</span>(<span className="text-emerald-500">'/api/user'</span>);<br/>
                  {'  '}<span className="text-purple-500">return</span> res.<span className="text-blue-500">json</span>();\n
                  {'}'}
                </div>
              </Link>
              <div className="flex items-center mb-6 w-full">
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold border shadow-sm relative z-10 ${darkMode ? "bg-white text-black border-white" : "bg-black text-white border-black"}`}>
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">Copy & Build</h3>
              <p className={`text-sm leading-relaxed ${themeClasses.muted}`}>
                Put your knowledge into practice. Copy strictly-typed code examples and ship your projects without the boilerplate.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Enterprise Architecture Vercel/Next.js Documentation Grid Layout */}
      <main className="mx-auto w-full max-w-[1400px] px-4 py-20 md:px-6 lg:px-8">
        <div className="space-y-24">
          {REFERENCE_DATA.map((category) => (
            <section key={category.category} className="scroll-mt-24">
              
              <div className="mb-8 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm ${darkMode ? "bg-[#111] border-[#333]" : "bg-white border-[#E5E5E5]"}`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className={`text-2xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    {category.category}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.items.map((item: any) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`group flex flex-col gap-4 rounded-xl border p-5 transition-all duration-300 ${darkMode ? "bg-[#0a0a0a] border-[#333] hover:border-[#555] hover:bg-[#111]" : "bg-white border-[#E5E5E5] hover:border-[#ccc] hover:bg-zinc-50 hover:shadow-sm"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${darkMode ? "bg-[#141414] border-[#333] text-zinc-400 group-hover:text-white group-hover:bg-[#222]" : "bg-zinc-50 border-[#E5E5E5] text-zinc-500 group-hover:text-black group-hover:bg-white"}`}>
                        {item.icon}
                      </div>
                      <h3 className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${darkMode ? "text-zinc-100 group-hover:text-white" : "text-zinc-900 group-hover:text-black"}`}>
                        {item.name}
                      </h3>
                    </div>
                    <p className={`text-[13px] leading-relaxed transition-colors duration-300 ${darkMode ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-500 group-hover:text-zinc-700"}`}>
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className={`mt-auto border-t py-8 text-center ${themeClasses.border} bg-transparent`}>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
          <p className={`text-sm font-medium ${themeClasses.muted}`}>
            Built by{" "}
            <a 
              href="https://yash-pluto.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`font-bold transition-colors hover:text-[#C699FF] ${darkMode ? "text-white" : "text-black"}`}
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