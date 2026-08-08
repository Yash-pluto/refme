"use client";

import DirectoryList from "./components/DirectoryList";
import { useTheme } from "../src/context/ThemeContext";
import { useState } from "react";
import {
  ArrowRight,
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
    category: "Core languages",
    icon: <Code2 size={18} />,
    items: [
      { name: "C++", href: "/cpp", icon: <Code2 size={22} className='text-zinc-200' />, desc: "Low-level systems, performance, and STL patterns.", size: "normal" },
      { name: "JavaScript", href: "/javascript", icon: <Braces size={22} className='text-zinc-200' />, desc: "Modern syntax, async flows, and browser fundamentals.", size: "large" },
      { name: "Python", href: "/python", icon: <FileCode2 size={22} className='text-zinc-200' />, desc: "Data work, automation, and clean backend scripting.", size: "normal" },
      { name: "TypeScript", href: "/typescript", icon: <FileCode2 size={22} className='text-zinc-200' />, desc: "Types, interfaces, and safer large-scale JavaScript systems.", size: "normal" },
      { name: "Go", href: "/go", icon: <Binary size={22} className='text-zinc-200' />, desc: "Simple concurrency, tooling, and service-oriented code.", size: "normal" },
      { name: "Rust", href: "/rust", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Ownership, performance, and safety-first systems design.", size: "normal" },
      { name: "Java", href: "/java", icon: <Code2 size={22} className='text-zinc-200' />, desc: "Enterprise patterns, JVM tooling, and backend architecture.", size: "normal" },
      { name: "C#", href: "/csharp", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Strong typing, .NET frameworks, and application structure.", size: "normal" },
    ],
  },
  {
    category: "Frontend & web",
    icon: <Globe size={18} />,
    items: [
      { name: "React", href: "/react", icon: <Globe size={22} className='text-zinc-200' />, desc: "Components, state, effects, and rendering patterns.", size: "large" },
      { name: "Next.js", href: "/nextjs", icon: <Globe size={22} className='text-zinc-200' />, desc: "App routing, server rendering, and performance patterns.", size: "normal" },
      { name: "CSS", href: "/css", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Layout, design systems, and modern responsive styling.", size: "normal" },
      { name: "HTML", href: "/html", icon: <Code2 size={22} className='text-zinc-200' />, desc: "Structure, semantics, and accessible document foundations.", size: "normal" },
      { name: "Tailwind", href: "/tailwind", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Utility-first styling, tokens, and rapid UI composition.", size: "normal" },
      { name: "Accessibility", href: "/accessibility", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Semantic structure, keyboard flows, and inclusive UI.", size: "normal" },
    ],
  },
  {
    category: "Backend & systems",
    icon: <TerminalSquare size={18} />,
    items: [
      { name: "Bash", href: "/bash", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Shell workflows, pipelines, and automation basics.", size: "normal" },
      { name: "Node.js", href: "/nodejs", icon: <Binary size={22} className='text-zinc-200' />, desc: "Runtime fundamentals and server-side JavaScript patterns.", size: "normal" },
      { name: "SQL", href: "/sql", icon: <Database size={22} className='text-zinc-200' />, desc: "Queries, joins, indexing, and data modeling essentials.", size: "normal" },
      { name: "APIs", href: "/apis", icon: <Lock size={22} className='text-zinc-200' />, desc: "Request patterns, auth flows, and contract design.", size: "normal" },
      { name: "Docker", href: "/docker", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Containers, images, and deployment isolation basics.", size: "normal" },
      { name: "Git", href: "/git", icon: <Code2 size={22} className='text-zinc-200' />, desc: "Branching, commits, and collaboration workflows.", size: "normal" },
    ],
  },
  {
    category: "Concepts",
    icon: <Sparkles size={18} />,
    items: [
      { name: "Async", href: "/async", icon: <Braces size={22} className='text-zinc-200' />, desc: "Promises, async/await, event loops, and scheduling.", size: "normal" },
      { name: "Testing", href: "/testing", icon: <TestTube size={22} className='text-zinc-200' />, desc: "Unit tests, integration coverage, and reliability habits.", size: "normal" },
      { name: "Security", href: "/security", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Auth, validation, and safer defaults for production code.", size: "normal" },
      { name: "Data Structures", href: "/data-structures", icon: <Database size={22} className='text-zinc-200' />, desc: "Arrays, trees, hash maps, and choosing the right shape.", size: "normal" },
      { name: "Algorithms", href: "/algorithms", icon: <Binary size={22} className='text-zinc-200' />, desc: "Sorting, traversal, recursion, and complexity trade-offs.", size: "normal" },
      { name: "System Design", href: "/system-design", icon: <Globe size={22} className='text-zinc-200' />, desc: "Scalability, resilience, and architecture composition.", size: "normal" },
      { name: "State Management", href: "/state-management", icon: <Braces size={22} className='text-zinc-200' />, desc: "Global UI state, immutability, and predictable app flows.", size: "normal" },
      { name: "OAuth", href: "/oauth", icon: <Lock size={22} className='text-zinc-200' />, desc: "Delegated access, tokens, and identity flows in real apps.", size: "normal" },
      { name: "Caching", href: "/caching", icon: <Database size={22} className='text-zinc-200' />, desc: "Read-through patterns, invalidation, and latency reduction.", size: "normal" },
      { name: "Web Security", href: "/web-security", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "XSS, CSRF, headers, and safer web defaults.", size: "normal" },
      { name: "Design Patterns", href: "/design-patterns", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Factory, strategy, observer, and reusable software shapes.", size: "normal" },
      { name: "Dependency Injection", href: "/dependency-injection", icon: <Braces size={22} className='text-zinc-200' />, desc: "Loose coupling, wiring, and testable architecture.", size: "normal" },
      { name: "Validation", href: "/validation", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Input checks, schema rules, and safer user data flows.", size: "normal" },
    ],
  },
  {
    category: "Architecture & infrastructure",
    icon: <Globe size={18} />,
    items: [
      { name: "Microservices", href: "/microservices", icon: <Globe size={22} className='text-zinc-200' />, desc: "Service boundaries, contracts, and deployment autonomy.", size: "normal" },
      { name: "Event-Driven", href: "/event-driven", icon: <Binary size={22} className='text-zinc-200' />, desc: "Streams, decoupling, and asynchronous communication patterns.", size: "normal" },
      { name: "Load Balancing", href: "/load-balancing", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Traffic distribution, resilience, and horizontal scale.", size: "normal" },
      { name: "Kubernetes", href: "/kubernetes", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Container orchestration, scaling, and service management.", size: "normal" },
      { name: "Deployment", href: "/deployment", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Release flow, environments, rollout safety, and automation.", size: "normal" },
      { name: "Monitoring", href: "/monitoring", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Metrics, logs, traces, and runtime health visibility.", size: "normal" },
      { name: "Cloud Architecture", href: "/cloud-architecture", icon: <Globe size={22} className='text-zinc-200' />, desc: "Multi-region design, edge services, and resilient platforms.", size: "normal" },
      { name: "Databases", href: "/databases", icon: <Database size={22} className='text-zinc-200' />, desc: "Storage models, schemas, indexes, and query trade-offs.", size: "normal" },
      { name: "Reliability", href: "/reliability", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Failover, redundancy, and designing for graceful degradation.", size: "normal" },
    ],
  },
  {
    category: "Data & AI",
    icon: <Database size={18} />,
    items: [
      { name: "Data Science", href: "/data-science", icon: <Database size={22} className='text-zinc-200' />, desc: "Analysis, notebooks, and patterns for working with data.", size: "normal" },
      { name: "ML", href: "/ml", icon: <Binary size={22} className='text-zinc-200' />, desc: "Model basics, pipelines, and practical deployment notes.", size: "normal" },
      { name: "LLMs", href: "/llms", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Prompt design, structured outputs, and app integration basics.", size: "normal" },
      { name: "Vectors", href: "/vectors", icon: <Database size={22} className='text-zinc-200' />, desc: "Embeddings, similarity search, and retrieval patterns.", size: "normal" },
      { name: "Prompt Engineering", href: "/prompt-engineering", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Instruction design, context framing, and reliable outputs.", size: "normal" },
      { name: "RAG", href: "/rag", icon: <Database size={22} className='text-zinc-200' />, desc: "Grounded generation with retrieval and relevance filtering.", size: "normal" },
      { name: "Model Evaluation", href: "/model-evaluation", icon: <TestTube size={22} className='text-zinc-200' />, desc: "Benchmarking, scoring, and quality checks for outputs.", size: "normal" },
      { name: "AI Safety", href: "/ai-safety", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Guardrails, risk mitigation, and responsible model usage.", size: "normal" },
      { name: "Agents", href: "/agents", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Tool use, planning loops, and autonomous execution patterns.", size: "normal" },
    ],
  },
  {
    category: "Dev tools",
    icon: <TerminalSquare size={18} />,
    items: [
      { name: "VS Code", href: "/vscode", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Editor workflows, extensions, and keyboard efficiency.", size: "normal" },
      { name: "Linux", href: "/linux", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Filesystems, processes, permissions, and command-line habits.", size: "normal" },
      { name: "CI/CD", href: "/ci-cd", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Pipelines, automation, and release safety checks.", size: "normal" },
      { name: "Observability", href: "/observability", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Logging, tracing, and debugging production systems.", size: "normal" },
      { name: "Nginx", href: "/nginx", icon: <TerminalSquare size={22} className='text-zinc-200' />, desc: "Reverse proxying, performance tuning, and request routing.", size: "normal" },
      { name: "Terraform", href: "/terraform", icon: <ShieldCheck size={22} className='text-zinc-200' />, desc: "Infrastructure as code, repeatable environments, and provisioning.", size: "normal" },
      { name: "GitHub Actions", href: "/github-actions", icon: <Code2 size={22} className='text-zinc-200' />, desc: "CI pipelines, automation, and shipping code confidently.", size: "normal" },
      { name: "Webpack", href: "/webpack", icon: <Sparkles size={22} className='text-zinc-200' />, desc: "Bundling, module resolution, and frontend build optimization.", size: "normal" },
      { name: "Vercel", href: "/vercel", icon: <Globe size={22} className='text-zinc-200' />, desc: "Edge deployment, previews, and modern app delivery.", size: "normal" },
      { name: "Debugging", href: "/debugging", icon: <TestTube size={22} className='text-zinc-200' />, desc: "Root cause analysis, traces, breakpoints, and narrowing bugs.", size: "normal" },
    ],
  },
];

export default function RefMeHero() {
  const { darkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const theme = {
    page: darkMode ? "bg-[#050505] text-[#f5f5f5]" : "bg-[#f3f0ea] text-[#111111]",
    panel: darkMode ? "bg-[#0d0d0d] border-[#1f1f1f]" : "bg-[#f8f6f2] border-[#e1dfd8]",
    soft: darkMode ? "bg-[#121212] border-[#262626]" : "bg-[#f3f1ec] border-[#e1dfd8]",
    border: darkMode ? "border-[#1f1f1f]" : "border-[#e1dfd8]",
    muted: darkMode ? "text-[#9b9b9b]" : "text-[#666a73]",
    accent: darkMode ? "text-zinc-200" : "text-zinc-700",
    dim: darkMode ? "text-[#b8b8b8]" : "text-[#4d4d4d]",
  };

  return (
    <div className={`${theme.page} min-h-screen transition-colors duration-300`}>
      <div className='mx-auto flex min-h-screen max-w-[1700px] flex-col xl:flex-row'>
        <aside
          className={`w-full border-b px-5 py-6 sm:px-6 xl:sticky xl:top-0 xl:h-screen xl:w-[38%] xl:border-b-0 xl:border-r ${theme.border} ${darkMode ? 'bg-[#050505]' : 'bg-[#f6f4ee]'}`}
        >
          <div className='mx-auto flex h-full max-w-[640px] flex-col justify-between'>
            <div>
              <div className='mb-10 flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f1115] text-sm font-black tracking-[-0.18em] text-white ring-1 ring-white/10'>
                    R<span className='text-zinc-500'>_</span>
                  </div>
                  <div className='space-y-0.5'>
                    <div className='text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>RefMe</div>
                    <div className={`text-[11px] uppercase tracking-[0.2em] ${theme.muted}`}>Documentation</div>
                  </div>
                </div>

                <button
                  type='button'
                  onClick={toggleTheme}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${theme.border} ${theme.soft}`}
                >
                  {darkMode ? "Light" : "Dark"}
                </button>
              </div>

              <div className='mb-8 space-y-5'>
                <div className='text-[11px] uppercase tracking-[0.28em] text-zinc-300'>
                  Developer reference library
                </div>

                <h1 className='max-w-[520px] text-4xl font-black tracking-[-0.06em] text-balance sm:text-5xl xl:text-6xl'>
                  Clear reference material for modern engineering work.
                </h1>
              </div>

              <p className={`max-w-[540px] text-base leading-7 sm:text-lg ${theme.dim}`}>
                Find the syntax, patterns, and implementation notes you need without digging through scattered docs.
              </p>

              <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:items-center'>
                <label className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition ${theme.panel} focus-within:border-[#C699FF]/60`}>
                  <Search size={16} className='text-zinc-500' />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder='Search topics...'
                    className='w-full bg-transparent text-sm outline-none placeholder:text-zinc-500'
                  />
                </label>

                <a
                  href='#directory'
                  className='inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EFEAE2] px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#E7E1D7]'
                >
                  Explore
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className={`mt-10 flex flex-wrap items-center gap-4 border-t pt-5 text-[11px] uppercase tracking-[0.24em] ${theme.border} ${theme.muted}`}>
              <span>Documentation-first</span>
              <span className='text-zinc-500'>•</span>
              <span>Concise notes</span>
              <span className='text-zinc-500'>•</span>
              <span>Built for speed</span>
            </div>
          </div>
        </aside>

        <main id='directory' className='flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 xl:py-8'>
          <DirectoryList darkMode={darkMode} searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}
