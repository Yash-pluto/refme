"use client";
import DirectoryList from "./components/DirectoryList";
import { useTheme } from "../src/context/ThemeContext";
import { useState } from "react";
import {
  Layout,
  Code2,
  Terminal,
  Bot,
  Cpu,
  Braces,
  Binary,
  FileJson,
  Sparkles,
  FileCode2,
  Blocks,
  Globe,
  ArrowDownRight,
  Code,
  Link,
} from "lucide-react";

// --- REUSABLE DATA STRUCTURE ---
export const REFERENCE_DATA = [
  {
    category: "AI & Models",
    icon: <Bot size={20} />,
    items: [
      {
        name: "ChatGPT",
        href: "/chatgpt",
        theme: "emerald",
        icon: <Cpu size={24} className='text-emerald-500' />,
        desc: "Prompt engineering & API reference.",
        size: "large",
      },
      {
        name: "Claude Code",
        href: "/claude",
        theme: "orange",
        icon: <Bot size={24} className='text-orange-500' />,
        desc: "Anthropic's CLI and SDK patterns.",
        size: "normal",
      },
      {
        name: "Cursor",
        href: "/cursor",
        theme: "blue",
        icon: <Terminal size={24} className='text-blue-500' />,
        desc: "AI-first IDE workflows.",
        size: "normal",
      },
      {
        name: "Gemini",
        href: "/gemini",
        theme: "sky",
        icon: <Sparkles size={24} className='text-sky-500' />,
        desc: "Google's multi-modal intelligence.",
        size: "normal",
      },
    ],
  },
  {
    category: "Core Programming",
    icon: <Code2 size={20} />,
    items: [
      {
        name: "Python",
        href: "/python",
        theme: "yellow",
        icon: <FileCode2 size={24} className='text-yellow-500' />,
        desc: "Data science, ML, and backend scripting.",
        size: "large",
      },
      {
        name: "JavaScript",
        href: "/javascript",
        theme: "yellow",
        icon: <Braces size={24} className='text-yellow-400' />,
        desc: "The universal language of the web.",
        size: "normal",
      },
      {
        name: "TypeScript",
        href: "/typescript",
        theme: "blue",
        icon: <FileCode2 size={24} className='text-blue-500' />,
        desc: "Type-safe JavaScript for scale.",
        size: "normal",
      },
      {
        name: "Go",
        href: "/go",
        theme: "cyan",
        icon: <Binary size={24} className='text-cyan-500' />,
        desc: "High-performance concurrency.",
        size: "normal",
      },
      {
        name: "Rust",
        href: "/rust",
        theme: "orange",
        icon: <Blocks size={24} className='text-orange-600' />,
        desc: "Memory safety without garbage collection.",
        size: "normal",
      },
      {
        name: "C++",
        href: "/cpp",
        theme: "indigo",
        icon: <Cpu size={24} className='text-indigo-500' />,
        desc: "System-level performance and control.",
        size: "normal",
      },
    ],
  },
  {
    category: "Infrastructure & CLI",
    icon: <Terminal size={20} />,
    items: [
      {
        name: "Docker",
        href: "/docker",
        theme: "sky",
        icon: <FileJson size={24} className='text-sky-500' />,
        desc: "Containerization and compose structures.",
        size: "large",
      },
      {
        name: "Bash",
        href: "/bash",
        theme: "zinc",
        icon: <Terminal size={24} className='text-zinc-500' />,
        desc: "Unix shell scripting essentials.",
        size: "normal",
      },
      {
        name: "Kubernetes",
        href: "/kubernetes",
        theme: "indigo",
        icon: <Layout size={24} className='text-indigo-500' />,
        desc: "Orchestration & Helm charts.",
        size: "normal",
      },
      {
        name: "PowerShell",
        href: "/powershell",
        theme: "blue",
        icon: <Terminal size={24} className='text-blue-600' />,
        desc: "Windows automation and configuration.",
        size: "normal",
      },
    ],
  },
  {
    category: "Web & Styling",
    icon: <Layout size={20} />,
    items: [
      {
        name: "React",
        href: "/react",
        theme: "sky",
        icon: <Globe size={24} className='text-sky-400' />,
        desc: "Hooks, patterns, and state management.",
        size: "large",
      },
      {
        name: "Tailwind CSS",
        href: "/tailwind",
        theme: "cyan",
        icon: <Layout size={24} className='text-cyan-400' />,
        desc: "Utility classes and configuration.",
        size: "normal",
      },
      {
        name: "CSS 3",
        href: "/css3",
        theme: "blue",
        icon: <Blocks size={24} className='text-blue-500' />,
        desc: "Modern semantic web layouts.",
        size: "normal",
      },
      {
        name: "HTML 5",
        href: "/html5",
        theme: "orange",
        icon: <FileCode2 size={24} className='text-orange-500' />,
        desc: "Document structure and accessibility.",
        size: "normal",
      },
    ],
  },
];

export default function RefMeHero() {
  const { darkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const theme = {
    page: darkMode
      ? "bg-[#0A0A0A] text-[#E5E5E5]"
      : "bg-[#F4F4F0] text-[#111111]",
    border: darkMode ? "border-[#222222]" : "border-[#D1D1D1]",
    accent: darkMode ? "text-cyan-400" : "text-indigo-600",
  };

  return (
    <div
      className={`${theme.page} min-h-screen font-sans selection:bg-cyan-500/30 flex flex-col md:flex-row`}
    >
      {/* LEFT PANE: Sticky Hero & Search */}
      <div
        className={`w-full md:w-[35vw] md:h-screen md:sticky top-0 flex flex-col justify-between border-b md:border-b-0 md:border-r ${theme.border} p-6 md:p-10`}
      >
        <div>
          {/* Header */}
          <div className='flex justify-between items-start mb-16'>
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none flex flex-col'>
              <span>REF</span>
              <div className='flex items-center'>
                <span
                  className={darkMode ? "text-[#333333]" : "text-[#CCCCCC]"}
                >
                  //
                </span>
                <span>ME</span>
                <span className={`${theme.accent} animate-pulse ml-1`}>_</span>
              </div>
            </h1>
            <button
              onClick={toggleTheme}
              className='text-xs font-mono font-bold uppercase tracking-widest hover:text-cyan-500 transition-colors'
            >
              [ {darkMode ? "LIGHT" : "DARK"} ]
            </button>
          </div>

          {/* Description (Syntax Highlighted Text) */}
          <p className='font-mono text-xs uppercase tracking-widest opacity-50 mb-6'>
            &gt; SYSTEM.INIT()
          </p>
          <p className='text-xl md:text-2xl font-medium leading-relaxed mb-12'>
            A curated collection of{" "}
            <span className='text-emerald-500 font-bold'>cheat sheets</span>,{" "}
            <span className='text-indigo-500 font-bold'>workflows</span>, and{" "}
            <span className='text-rose-500 font-bold'>
              architectural patterns
            </span>
            . No fluff, no endless scrolling—just the{" "}
            <span className='text-amber-500 font-bold'>raw syntax</span> you
            need to build.
          </p>

          {/* Terminal Search Input */}
          <div
            className={`relative flex items-center border-b-2 ${theme.border} pb-2 group focus-within:border-cyan-500 transition-colors`}
          >
            <span className={`font-mono font-bold mr-3 ${theme.accent}`}>
              $&gt;
            </span>
            <input
              type='text'
              placeholder='Query directory...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-transparent outline-none font-mono text-lg placeholder-opacity-30 placeholder-current'
            />
            <ArrowDownRight className='opacity-30 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all' />
          </div>
        </div>
        {/* Footer Meta */}
        <div className='flex flex-wrap items-end justify-between gap-y-6 gap-x-4 font-mono text-[10px] uppercase mt-12 tracking-widest'>
          <div className='flex flex-col gap-2.5 opacity-60'>
            <span>Built by Yash Vardhan.</span>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/Yash-pluto'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 hover:text-cyan-500 transition-colors'
              >
                <Code size={12} />
                GitHub
              </a>
              <a
                href='https://www.linkedin.com/in/vardhan-yash3105/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 hover:text-cyan-500 transition-colors'
              >
                <Link size={12} />
                LinkedIn
              </a>
            </div>
          </div>
          <span className='opacity-50'>
            Status: <span className='text-emerald-500'>Online</span>
          </span>
        </div>
      </div>

      {/* RIGHT PANE: Scrolling Directory */}
      <div className='w-full md:w-[65vw] min-h-screen'>
        <DirectoryList darkMode={darkMode} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
