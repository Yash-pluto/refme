"use client";
import { useState } from "react";
import { useTheme } from "../src/context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import { ReferenceSection } from "./components/BentoGrid";
import Footer from "./components/Footer";
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
const REFERENCE_DATA: ReferenceSection[] = [
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

  const theme = {
    page: darkMode ? "bg-[#050505] text-white" : "bg-zinc-50 text-black",
    overlay: darkMode ? "bg-indigo-500/10" : "bg-indigo-500/5",
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
      className={`${theme.page} min-h-screen transition-colors duration-500 relative overflow-hidden font-sans selection:bg-zinc-500/30`}
    >
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none bg-inherit'>
        {/* Deep Glowing Orbs for Ambient Light */}
        <div
          className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-30 transition-colors duration-1000 ${darkMode ? "bg-indigo-900/40" : "bg-indigo-200/50"}`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${darkMode ? "bg-blue-900/40" : "bg-blue-200/50"}`}
        />

        {/* Architectural Grid Pattern */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
              linear-gradient(to right, ${darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px),
              linear-gradient(to bottom, ${darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 20%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 20%, black 20%, transparent 100%)",
          }}
        />
      </div>

      {/* --- NAVIGATION --- */}
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onShare={handleShare}
      />

      <Hero darkMode={darkMode} />

      <BentoGrid darkMode={darkMode} filteredData={filteredData} />

      <Footer darkMode={darkMode} />
    </div>
  );
}
