"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../src/context/ThemeContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SearchPalette, { useSearchOSKey, SearchItem } from "../app/components/SearchPalette";
import { Skeleton } from "../app/components/Skeleton";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Footer from "./components/Footer";
import { useGitHubStats } from "../src/hooks/useGitHubStats"; 

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
  ArrowRight
} from "lucide-react";

export const REFERENCE_DATA = [
  {
    category: "Core Languages",
    icon: <Code2 size={16} />,
    desc: "Master foundational programming languages and concepts.",
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
    icon: <Globe size={16} />,
    desc: "Build responsive, accessible, and dynamic user interfaces.",
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
    icon: <TerminalSquare size={16} />,
    desc: "Design robust server architectures, databases, and APIs.",
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
    icon: <Sparkles size={16} />,
    desc: "Essential principles for scalable software design and security.",
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
    icon: <Globe size={16} />,
    desc: "Deploy, monitor, scale, and manage cloud infrastructure.",
    items: [
      { name: "Microservices", href: "/microservices", icon: <Globe size={18} />, desc: "Service decoupling, bounded contexts, and API gateways." },
      { name: "Event-Driven", href: "/event-driven", icon: <Binary size={18} />, desc: "Message brokers, pub/sub, and eventual consistency." },
      { name: "Load Balancing", href: "/load-balancing", icon: <TerminalSquare size={18} />, desc: "Traffic distribution, health checks, and reverse proxies." },
      { name: "Kubernetes", href: "/kubernetes", icon: <TerminalSquare size={18} />, desc: "Pod orchestration, cluster scaling, and deployment manifests." },
      { name: "Deployment", href: "/deployment", icon: <ShieldCheck size={18} />, desc: "Blue-green releases, canary rollouts, and CI pipelines." },
      { name: "Monitoring", href: "/monitoring", icon: <Sparkles size={18} />, desc: "Metrics, logs, and runtime health visibility." },
      { name: "Cloud Architecture", href: "/cloud-architecture", icon: <Globe size={18} />, desc: "AWS/GCP infrastructure, VPCs, and serverless compute." },
      { name: "Databases", href: "/databases", icon: <Database size={18} />, desc: "NoSQL vs SQL, replication, and sharding strategies." },
      { name: "Reliability", href: "/reliability", icon: <ShieldCheck size={18} />, desc: "Fault tolerance, circuit breakers, and SLA targeting." },
    ],
  },
  {
    category: "Data & AI",
    icon: <Database size={16} />,
    desc: "Explore machine learning, LLMs, and vector data pipelines.",
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
    icon: <TerminalSquare size={16} />,
    desc: "Optimize your workflow with modern development and CI/CD tools.",
    items: [
      { name: "VS Code", href: "/vscode", icon: <TerminalSquare size={18} />, desc: "Workspace configuration, snippets, and integrated debugging." },
      { name: "Linux", href: "/linux", icon: <TerminalSquare size={18} />, desc: "Kernel architecture, system permissions, and POSIX standards." },
      { name: "CI/CD", href: "/ci-cd", icon: <ShieldCheck size={18} />, desc: "Continuous integration, artifact building, and delivery." },
      { name: "Observability", href: "/observability", icon: <Sparkles size={18} />, desc: "Log aggregation, metrics dashboards, and performance tracking." },
      { name: "Nginx", href: "/nginx", icon: <TerminalSquare size={18} />, desc: "Web serving, TLS termination, and connection tuning." },
      { name: "Terraform", href: "/terraform", icon: <ShieldCheck size={18} />, desc: "Infrastructure as code, state management, and provider blocks." },
      { name: "GitHub Actions", href: "/github-actions", icon: <Code2 size={18} />, desc: "Workflow YAMLs, runner environments, and matrix builds." },
      { name: "Webpack", href: "/webpack", icon: <Sparkles size={18} />, desc: "Asset bundling, code splitting, and tree shaking." },
      { name: "Vercel", href: "/vercel", icon: <Globe size={18} />, desc: "Edge deployment, preview environments, and modern delivery." },
      { name: "Debugging", href: "/debugging", icon: <TestTube size={18} />, desc: "Memory profiling, network waterfalls, and root cause analysis." },
    ],
  },
];

function timeSince(dateString: string) {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "Just now";
}

export default function LandingPage() {
  const { toggleTheme } = useTheme();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { modifierKey } = useSearchOSKey();
  const shouldReduceMotion = useReducedMotion();
  
  // Clean, single-line hook consumption (replaces the massive inline fetch)
  const githubStats = useGitHubStats();

  const [cycle, setCycle] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeClasses = {
    page: "bg-[#FFFFFF] text-[#111111] dark:bg-[#0a0a0a] dark:text-[#ededed]",
    header: "bg-[#FFFFFF]/95 dark:bg-[#0a0a0a]/95",
    panel: "bg-[#F7F7F7] dark:bg-[#141414]",
    border: "border-[#E5E5E5] dark:border-[#333333]",
    muted: "text-zinc-500 dark:text-zinc-400",
    accent: "text-zinc-900 dark:text-zinc-100",
    inputBg: "bg-[#F4F4F4] dark:bg-[#1a1a1a]",
    hoverAccent: "hover:text-[#6f45d6] dark:hover:text-[#C699FF]",
    cardHover: "hover:border-[#ccc] hover:bg-[#fafafa] dark:hover:border-[#555] dark:hover:bg-[#141414]",
    iconBox: "bg-[#f4f4f4] border-[#E5E5E5] text-zinc-500 dark:bg-[#1a1a1a] dark:border-[#333] dark:text-zinc-400",
    iconBoxHover: "group-hover:text-black dark:group-hover:text-white",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle(c => (c + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % REFERENCE_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, shouldReduceMotion]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollIndicator(
        Math.ceil(scrollHeight) > Math.ceil(clientHeight) + 5 && 
        Math.ceil(scrollTop + clientHeight) < Math.ceil(scrollHeight) - 20
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();
    const timer = setTimeout(checkScroll, 600); 

    const resizeObserver = new ResizeObserver(() => checkScroll());
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

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

  const timeSinceStr = timeSince(githubStats.lastPush);
  
  const dynamicBuildStats = [
    { title: "Repository Synced", desc: `Last push: ${timeSinceStr}`, icon: <CheckCircle2 size={16} />, bg: "bg-black text-white dark:bg-white dark:text-black" },
    { title: "Active Contributors", desc: `${githubStats.contributors.length} devs building RefMe`, icon: <Code2 size={16} />, bg: "bg-zinc-100 text-black dark:bg-[#222] dark:text-white" },
    { title: "Code Reviews", desc: `${githubStats.openPrs} open PRs pending`, icon: <GitPullRequest size={16} />, bg: "bg-zinc-100 text-black dark:bg-[#222] dark:text-white" }
  ];

  const dynamicActivityFeeds = [
    { title: "Successful Merges", desc: `${githubStats.mergedPrs} PRs merged to main`, icon: <GitMerge size={16} />, bg: "bg-zinc-100 text-black dark:bg-[#222] dark:text-white" },
    { title: "Community Health", desc: `${githubStats.openIssues} open issues tracked`, icon: <CircleDot size={16} />, bg: "bg-zinc-100 text-black dark:bg-[#222] dark:text-white" },
    { title: "Global Reach", desc: `${githubStats.stars} repository stars`, icon: <Star size={16} />, bg: "bg-zinc-100 text-black dark:bg-[#222] dark:text-white" }
  ];

  const currentBuild = dynamicBuildStats[cycle];
  const currentActivity = dynamicActivityFeeds[cycle];

  const tabContentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  };

  const isReducedMotionSafe = mounted && shouldReduceMotion;

  const itemVariants = {
    hidden: { opacity: 0, y: isReducedMotionSafe ? 0 : 15 },
    visible: {
      opacity: 1, y: 0,
      transition: isReducedMotionSafe ? { duration: 0.15 } : { type: "spring" as const, stiffness: 400, damping: 30 }
    },
  };

  return (
    <div className={`${themeClasses.page} min-h-screen flex flex-col transition-colors duration-200 overflow-x-hidden`}>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(150, 150, 150, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(150, 150, 150, 0.5);
        }
      `}} />
      
      <SearchPalette 
        isOpen={cmdOpen} 
        onClose={() => setCmdOpen(false)} 
        onToggle={() => setCmdOpen((prev) => !prev)} 
        searchData={searchData} 
        onSelect={handleSearchSelect} 
        placeholder="Search algorithms, frameworks, or concepts..." 
      />
      <header className={`fixed top-0 left-0 w-full z-50 h-16 border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-md`}>
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
              <span suppressHydrationWarning className={`hidden md:block rounded border border-current/20 px-1.5 py-0.5 text-[10px] font-bold opacity-50`}>
                {mounted ? modifierKey : "Ctrl"}K
              </span>
            </button>
          </div>

          <button onClick={toggleTheme} className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${themeClasses.border} ${themeClasses.panel} ${themeClasses.hoverAccent}`}>
            <span className="block dark:hidden">Dark</span>
            <span className="hidden dark:block">Light</span>
          </button>
        </div>
      </header>

      <section className={`relative border-b w-full ${themeClasses.border} mt-16 px-4 py-12 sm:py-16 md:px-6 lg:px-8 lg:py-32`}>
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-8">
             
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-[72px] lg:leading-[1.1] text-balance">
                Reference that keeps pace with your code.
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${themeClasses.muted}`}>
                RefMe turns scattered documentation into clean, accessible syntax and architectural patterns: no endless scrolling, no outdated tutorials.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="relative group inline-flex">
                  <button 
                    onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })} 
                    className={`rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-[0.98] bg-black text-white dark:bg-white dark:text-black`}
                  >
                    Start reading
                  </button>
                  <div className={`absolute top-full left-1/2 mt-3 -translate-x-1/2 px-4 py-2 rounded-lg text-[13px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border shadow-2xl bg-white text-black border-[#E5E5E5] dark:bg-[#222222] dark:text-white dark:border-[#333333]`}>
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
                <Link href="/docs" className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase transition-colors w-fit text-[#6f45d6] hover:text-black dark:text-[#C699FF] dark:hover:text-white`}>
                  Read the RefMe Philosophy <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end relative mt-10 lg:mt-0">
              
              <div className={`relative z-10 flex flex-col rounded-3xl border w-full max-w-[560px] shadow-2xl overflow-hidden bg-white border-[#E5E5E5] dark:bg-[#0a0a0a] dark:border-[#333]`}>
                
                <div className={`p-6 sm:p-10 border-b bg-zinc-50 border-[#E5E5E5] dark:bg-[#111] dark:border-[#333]`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      <img 
                        src="https://github.com/yash-pluto.png" 
                        alt="Yash Vardhan" 
                        className={`h-20 w-20 rounded-full border-4 shadow-sm border-white dark:border-[#222]`} 
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <a href="https://yash-pluto.vercel.app/" target="_blank" rel="noopener noreferrer" className={`text-2xl sm:text-3xl font-extrabold tracking-tight hover:underline text-black dark:text-white`}>
                            Yash-Pluto
                          </a>
                          <BadgeCheck size={24} className="text-[#C699FF]" />
                        </div>
                        <p className={`text-sm font-medium ${themeClasses.muted}`}>Lead Maintainer</p>
                      </div>
                    </div>
                    <a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className="pt-1">
                      <FaGithub size={32} className={`text-zinc-900 hover:opacity-70 transition-opacity dark:text-white`} />
                    </a>
                  </div>
                  
                  <p className={`text-base leading-relaxed mb-6 text-zinc-700 dark:text-zinc-300`}>
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
                      {githubStats.loading ? (
                        <Skeleton className="h-9 w-12" />
                      ) : (
                        <span className={`text-3xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.openPrs}</span>
                      )}
                    </div>
                    
                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <GitMerge size={16} className="text-purple-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Merged</span>
                      </div>
                      {githubStats.loading ? (
                        <Skeleton className="h-9 w-12" />
                      ) : (
                        <span className={`text-3xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.mergedPrs}</span>
                      )}
                    </div>

                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <CircleDot size={16} className="text-emerald-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Issues</span>
                      </div>
                      {githubStats.loading ? (
                        <Skeleton className="h-9 w-12" />
                      ) : (
                        <span className={`text-3xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.openIssues}</span>
                      )}
                    </div>

                    <div className={`flex flex-col justify-between p-4 rounded-xl border bg-white border-[#E5E5E5] shadow-sm dark:bg-[#141414] dark:border-[#333]`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Star size={16} className="text-amber-500" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.muted}`}>Stars</span>
                      </div>
                      {githubStats.loading ? (
                        <Skeleton className="h-9 w-12" />
                      ) : (
                        <span className={`text-3xl font-extrabold tracking-tight text-black dark:text-white`}>{githubStats.stars}</span>
                      )}
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                      {githubStats.loading ? (
                        <>
                          <div className="flex -space-x-4">
                            {[0, 1, 2, 3, 4].map((idx) => (
                              <Skeleton
                                key={idx}
                                variant="circle"
                                className={`h-10 w-10 border-[3px] border-white shadow-md dark:border-[#0a0a0a]`}
                                style={{ zIndex: 10 - idx, opacity: 1 - (idx * 0.12) }}
                              />
                            ))}
                          </div>
                          <Skeleton className="h-3 w-24 ml-1" />
                        </>
                      ) : githubStats.contributors.length > 0 ? (
                        <>
                          <div className="flex -space-x-4">
                            {githubStats.contributors.slice(0, 5).map((user: any, idx: number) => (
                              <img 
                                key={user.id} 
                                src={user.avatar_url} 
                                alt={user.login}
                                title={user.login}
                                className={`h-10 w-10 rounded-full border-[3px] border-white shadow-md dark:border-[#0a0a0a]`}
                                style={{ zIndex: 10 - idx, opacity: 1 - (idx * 0.12) }} 
                              />
                            ))}
                          </div>
                          <p className={`text-xs font-bold uppercase tracking-wider pl-1 ${themeClasses.muted}`}>
                            {githubStats.contributors.length > 5 ? `+${githubStats.contributors.length - 5} Contributors` : 'Contributors'}
                          </p>
                        </>
                      ) : null}
                    </div>
                    
                    <a 
                      href="https://github.com/yash-pluto/refme" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all active:scale-[0.98] bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200`}
                    >
                      <FaGithub size={18} /> Contribute on GitHub
                    </a>
                  </div>
                </div>

              </div>

              {/* Dynamic Floating Element 1 - Top Right */}
              <div key={`build-${cycle}`} className={`absolute -top-12 right-0 sm:-top-8 sm:-right-8 z-20 flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5 shadow-2xl scale-[0.85] sm:scale-100 origin-top-right sm:origin-center animate-in fade-in zoom-in duration-500 pointer-events-none bg-white border-[#E5E5E5] dark:bg-[#141414] dark:border-[#333]`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentBuild.bg}`}>
                  {currentBuild.icon}
                </div>
                <div className="pr-2">
                  <p className={`text-[13px] font-bold text-black dark:text-white`}>{currentBuild.title}</p>
                  <p className={`text-[11px] font-medium ${themeClasses.muted}`}>{currentBuild.desc}</p>
                </div>
              </div>

              {/* Dynamic Floating Element 2 - Bottom Left */}
              <div key={`activity-${cycle}`} className={`absolute -bottom-12 left-0 sm:-bottom-8 sm:-left-8 z-20 flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5 shadow-2xl scale-[0.85] sm:scale-100 origin-bottom-left sm:origin-center animate-in fade-in zoom-in duration-500 pointer-events-none bg-white border-[#E5E5E5] dark:bg-[#141414] dark:border-[#333]`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentActivity.bg}`}>
                  {currentActivity.icon}
                </div>
                <div className="pr-2">
                  <p className={`text-[13px] font-bold text-black dark:text-white`}>{currentActivity.title}</p>
                  <p className={`text-[11px] font-medium ${themeClasses.muted}`}>{currentActivity.desc}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className={`py-24 md:py-32 border-b ${themeClasses.border} bg-zinc-50/50 dark:bg-[#050505]`}>
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 text-center flex flex-col items-center">
          
          <p className={`text-sm font-bold tracking-wide uppercase mb-4 ${themeClasses.muted}`}>
            Built for everyone who wants to learn
          </p>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-balance text-zinc-900 dark:text-white`}>
            For students, professors, teachers, and developers.
          </h2>

          <div className="w-full relative">
            
            <div className="max-w-4xl mx-auto w-full px-2 sm:px-4">
              <div className="flex justify-between items-center px-4 sm:px-12 md:px-24 mb-6">
                <div className={`px-4 py-1.5 rounded-lg border text-xs font-bold shadow-sm bg-white border-[#E5E5E5] text-zinc-700 dark:bg-[#111] dark:border-zinc-600 dark:text-zinc-200`}>Students</div>
                <div className={`px-4 py-1.5 rounded-lg border text-xs font-bold shadow-sm bg-white border-[#E5E5E5] text-zinc-700 dark:bg-[#111] dark:border-zinc-600 dark:text-zinc-200`}>Educators</div>
                <div className={`px-4 py-1.5 rounded-lg border text-xs font-bold shadow-sm bg-white border-[#E5E5E5] text-zinc-700 dark:bg-[#111] dark:border-zinc-600 dark:text-zinc-200`}>Developers</div>
              </div>

              <div className="relative flex justify-between items-center px-8 sm:px-16 md:px-28 mb-10 sm:mb-16">
                <div className={`absolute top-1/2 left-8 right-8 sm:left-16 sm:right-16 md:left-28 md:right-28 h-[2px] -translate-y-1/2 z-0 bg-zinc-200 dark:bg-zinc-600`} />
                <div className={`w-3.5 h-3.5 rounded-full border-[3px] z-10 border-zinc-300 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-900`} />
                <div className={`w-3.5 h-3.5 rounded-full border-[3px] z-10 border-zinc-300 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-900`} />
                <div className={`w-3.5 h-3.5 rounded-full border-[3px] z-10 border-zinc-300 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-900`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto px-4">
              
              <div className={`flex flex-col rounded-3xl border p-8 shadow-sm bg-white border-[#E5E5E5] dark:bg-[#141414] dark:border-[#333]`}>
                <h3 className={`text-xl font-bold tracking-tight mb-6 text-black dark:text-white`}>Structured Roadmaps.</h3>
                <div className="space-y-4">
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Step-by-step learning paths
                  </div>
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Master the topics listed below
                  </div>
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Clear progression for all levels
                  </div>
                </div>
              </div>

              <div className={`flex flex-col rounded-3xl border p-8 shadow-sm bg-white border-[#E5E5E5] dark:bg-[#141414] dark:border-[#333]`}>
                <h3 className={`text-xl font-bold tracking-tight mb-6 text-black dark:text-white`}>Video Tutorials.</h3>
                <div className="space-y-4">
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Dedicated videos for every concept
                  </div>
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Visual explanations that stick
                  </div>
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Learn at your own pace
                  </div>
                </div>
              </div>

              <div className={`flex flex-col rounded-3xl border p-8 shadow-sm bg-white border-[#E5E5E5] dark:bg-[#141414] dark:border-[#333]`}>
                <h3 className={`text-xl font-bold tracking-tight mb-6 text-black dark:text-white`}>For Everyone.</h3>
                <div className="space-y-4">
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Perfect for students & learners
                  </div>
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Resources for teachers & professors
                  </div>
                  <div className={`flex items-start gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300`}>
                    <span className={themeClasses.muted}>✓</span> Quick reference for developers
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section id="ecosystem" className={`py-24 md:py-32 w-full mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]`}>
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white`}>
            Explore the Ecosystem
          </h2>
          <p className={`text-lg font-medium max-w-2xl ${themeClasses.muted}`}>
            Everything you need to master modern tech stacks and build exceptional products.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch max-w-[1400px] mx-auto lg:h-[720px]">
          <div className="w-full lg:w-[35%] flex flex-col gap-3 h-full">
            {REFERENCE_DATA.map((cat, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveTab(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive 
                      ? "bg-white border-[#ccc] shadow-md dark:bg-[#1a1a1a] dark:border-[#444]"
                      : "bg-zinc-50 border-transparent hover:bg-zinc-100 hover:border-[#E5E5E5] dark:bg-[#0a0a0a] dark:border-[#222] dark:hover:bg-[#111] dark:hover:border-[#333]"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                    isActive 
                      ? "bg-zinc-100 border-[#ddd] text-black dark:bg-[#333] dark:border-[#555] dark:text-white"
                      : "bg-white border-[#E5E5E5] text-zinc-500 dark:bg-[#111] dark:border-[#333] dark:text-zinc-400"
                  }`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className={`text-base font-bold mb-1 transition-colors ${
                      isActive ? "text-black dark:text-white" : "text-zinc-700 dark:text-zinc-300"
                    }`}>
                      {cat.category}
                    </h3>
                    <p className={`text-[13px] leading-relaxed ${themeClasses.muted}`}>
                      {cat.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`w-full lg:w-[65%] rounded-3xl border p-6 sm:p-10 flex flex-col relative h-[600px] lg:h-full overflow-hidden bg-white border-[#E5E5E5] shadow-sm dark:bg-[#111] dark:border-[#333]`}>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col h-full overflow-hidden"
              >
                <motion.div variants={itemVariants} className="mb-6 shrink-0">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border mb-5 shadow-sm bg-zinc-50 border-[#ccc] text-black dark:bg-[#1a1a1a] dark:border-[#444] dark:text-white`}>
                      {REFERENCE_DATA[activeTab].icon}
                  </div>
                  <h2 className={`text-3xl font-extrabold tracking-tight mb-2 text-black dark:text-white`}>
                    {REFERENCE_DATA[activeTab].category}
                  </h2>
                  <p className={`text-base ${themeClasses.muted}`}>
                    {REFERENCE_DATA[activeTab].desc}
                  </p>
                </motion.div>

                <div 
                  ref={scrollContainerRef}
                  onScroll={checkScroll}
                  className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12"
                >
                  {REFERENCE_DATA[activeTab].items.map((item: any) => (
                    <motion.div key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-4 p-4 rounded-xl border transition-all bg-zinc-50 border-[#E5E5E5] hover:border-[#ccc] hover:bg-zinc-100 dark:bg-[#1a1a1a] dark:border-[#333] dark:hover:border-[#555] dark:hover:bg-[#222]`}
                      >
                        <div className="shrink-0 flex items-center justify-center relative">
                          <CheckCircle2 size={20} className={`transition-colors text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300`} />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className={`text-[15px] font-bold text-zinc-800 group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white`}>
                            {item.name}
                          </span>
                          <span className={`hidden sm:block text-zinc-500 text-sm opacity-50`}>-</span>
                          <span className={`text-[13px] ${themeClasses.muted} group-hover:text-current`}>
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute bottom-0 left-0 right-0 h-32 pointer-events-none flex items-end justify-center pb-6 bg-gradient-to-t from-white to-transparent dark:from-[#111]`}
                >
                  <div
                    className={`flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full border shadow-sm backdrop-blur-sm bg-white/70 border-[#E5E5E5] text-zinc-600 dark:bg-black/50 dark:border-[#333] dark:text-zinc-300`}
                  >
                    Scroll for more
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

     <Footer />
    </div>
  );
}