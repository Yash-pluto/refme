"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../src/context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import Footer from "./components/Footer";
import { Layout, Code2, Terminal, Bot } from "lucide-react";

// --- REUSABLE DATA STRUCTURE ---
const REFERENCE_DATA = [
  {
    category: "AI & Models",
    icon: <Bot size={18} />,
    items: [
      {
        name: "ChatGPT",
        href: "/chatgpt",
        color: "from-emerald-500/20 to-emerald-500/0 text-emerald-500",
        border: "group-hover:border-emerald-500/50",
      },
      {
        name: "Claude Code",
        href: "/claude",
        color: "from-orange-500/20 to-orange-500/0 text-orange-500",
        border: "group-hover:border-orange-500/50",
      },
      {
        name: "Cursor CLI",
        href: "/cursor",
        color: "from-blue-500/20 to-blue-500/0 text-blue-500",
        border: "group-hover:border-blue-500/50",
      },
      {
        name: "Gemini CLI",
        href: "/gemini",
        color: "from-sky-500/20 to-sky-500/0 text-sky-500",
        border: "group-hover:border-sky-500/50",
      },
    ],
  },
  {
    category: "Core Programming",
    icon: <Code2 size={18} />,
    items: [
      {
        name: "Python",
        href: "/python",
        color: "from-yellow-500/20 to-yellow-500/0 text-yellow-500",
        border: "group-hover:border-yellow-500/50",
      },
      {
        name: "JavaScript",
        href: "/javascript",
        color: "from-yellow-400/20 to-yellow-400/0 text-yellow-400",
        border: "group-hover:border-yellow-400/50",
      },
      {
        name: "TypeScript",
        href: "/typescript",
        color: "from-blue-600/20 to-blue-600/0 text-blue-600",
        border: "group-hover:border-blue-600/50",
      },
      {
        name: "Go",
        href: "/go",
        color: "from-cyan-500/20 to-cyan-500/0 text-cyan-500",
        border: "group-hover:border-cyan-500/50",
      },
      {
        name: "Rust",
        href: "/rust",
        color: "from-orange-600/20 to-orange-600/0 text-orange-600",
        border: "group-hover:border-orange-600/50",
      },
      {
        name: "C++",
        href: "/cpp",
        color: "from-indigo-500/20 to-indigo-500/0 text-indigo-500",
        border: "group-hover:border-indigo-500/50",
      },
    ],
  },
  {
    category: "Infrastructure & CLI",
    icon: <Terminal size={18} />,
    items: [
      {
        name: "Bash",
        href: "/bash",
        color: "from-zinc-500/20 to-zinc-500/0 text-zinc-400",
        border: "group-hover:border-zinc-500/50",
      },
      {
        name: "Docker",
        href: "/docker",
        color: "from-blue-400/20 to-blue-400/0 text-blue-400",
        border: "group-hover:border-blue-400/50",
      },
      {
        name: "Kubernetes",
        href: "/kubernetes",
        color: "from-indigo-600/20 to-indigo-600/0 text-indigo-500",
        border: "group-hover:border-indigo-600/50",
      },
      {
        name: "PowerShell",
        href: "/powershell",
        color: "from-blue-700/20 to-blue-700/0 text-blue-500",
        border: "group-hover:border-blue-700/50",
      },
    ],
  },
  {
    category: "Web & Styling",
    icon: <Layout size={18} />,
    items: [
      {
        name: "React",
        href: "/react",
        color: "from-sky-400/20 to-sky-400/0 text-sky-400",
        border: "group-hover:border-sky-400/50",
      },
      {
        name: "Tailwind CSS",
        href: "/tailwind",
        color: "from-cyan-400/20 to-cyan-400/0 text-cyan-400",
        border: "group-hover:border-cyan-400/50",
      },
      {
        name: "CSS 3",
        href: "/css3",
        color: "from-blue-500/20 to-blue-500/0 text-blue-500",
        border: "group-hover:border-blue-500/50",
      },
      {
        name: "HTML 5",
        href: "/html5",
        color: "from-orange-500/20 to-orange-500/0 text-orange-500",
        border: "group-hover:border-orange-500/50",
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
    overlay2: darkMode ? "bg-emerald-500/10" : "bg-emerald-500/5",
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
      {/* --- MODERN ENGINEERED BACKGROUND --- */}
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute inset-0 transition-opacity duration-500'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${dotColor} 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-full blur-[80px] sm:blur-[120px] ${theme.overlay}`}
          style={{
            top: "-20%",
            left: "-10%",
            width: "clamp(200px, 80vw, 50vw)",
            height: "clamp(200px, 80vw, 50vw)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.2, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className={`absolute rounded-full blur-[80px] sm:blur-[120px] ${theme.overlay2}`}
          style={{
            top: "40%",
            right: "-10%",
            width: "clamp(180px, 70vw, 40vw)",
            height: "clamp(180px, 70vw, 40vw)",
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
