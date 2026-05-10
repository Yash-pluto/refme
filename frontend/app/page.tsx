"use client";
import DirectoryList from "./components/DirectoryList";
import { useTheme } from "../src/context/ThemeContext";
import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
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

// --- ANIMATION VARIANTS ---

export default function RefMeHero() {
  const { darkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Stark, flat colors. No gradients, no soft grays.
  const theme = {
    page: darkMode
      ? "bg-[#0A0A0A] text-[#E5E5E5]"
      : "bg-[#F4F4F0] text-[#111111]",
    border: darkMode ? "border-[#333333]" : "border-[#111111]",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "RefMe_",
          text: "Technical documentation and patterns for modern engineers.",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // --- SEARCH FILTER LOGIC ---
  // This filters the categories and items based on the user's input
  const filteredData = REFERENCE_DATA.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((section) => section.items.length > 0);

  const dotColor = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  return (
    <div
      className={`${theme.page} min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col md:flex-row`}
    >
      {/* LEFT PANE: Sticky Hero & Search */}
      <div
        className={`w-full md:w-[35vw] md:h-screen md:sticky top-0 flex flex-col justify-between border-b md:border-b-0 md:border-r ${theme.border} p-6 md:p-10`}
      >
        <div>
          {/* Header */}
          <div className='flex justify-between items-start mb-20'>
            <h1 className='text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none'>
              REF
              <br />
              ME<span className='text-orange-500'>_</span>
            </h1>
            <button
              onClick={toggleTheme}
              className='text-sm font-mono uppercase hover:underline underline-offset-4'
            >
              {darkMode ? "[ LIGHT ]" : "[ DARK ]"}
            </button>
          </div>

          {/* Description */}
          <p className='font-mono text-sm uppercase tracking-widest opacity-60 mb-6'>
            // Technical Archive
          </p>
          <p className='text-xl md:text-2xl font-medium leading-tight mb-12'>
            High-fidelity documentation and architectural patterns for modern
            engineering.
          </p>

          {/* Raw Search Input */}
          <div
            className={`relative flex items-center border-b-2 ${theme.border} pb-2`}
          >
            <input
              type='text'
              placeholder='Query archive...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-transparent outline-none font-mono text-lg placeholder-opacity-30 placeholder-current'
            />
            <ArrowDownRight className='opacity-50' />
          </div>
        </div>

        {/* Footer Meta */}
        <div className='hidden md:block font-mono text-xs opacity-50 uppercase mt-12'>
          Index: 04.2026 / Status: Active / Mode: Strict
        </div>
      </div>

      {/* RIGHT PANE: Scrolling Directory */}
      <div className='w-full md:w-[65vw] min-h-screen'>
        <DirectoryList darkMode={darkMode} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
