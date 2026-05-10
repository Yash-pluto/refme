"use client";
import { useTheme } from "../../src/context/ThemeContext";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TopicLayout({
  children,
  frontmatter,
  topicKey,
}: {
  children: React.ReactNode;
  frontmatter: any;
  topicKey: string;
}) {
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();

  // JavaScript-driven theme variables to guarantee instant toggling
  const theme = {
    page: darkMode
      ? "bg-[#0A0A0A] text-[#E5E5E5]"
      : "bg-[#F4F4F0] text-[#111111]",
    border: darkMode ? "border-[#222222]" : "border-[#D1D1D1]",
    accent: darkMode ? "text-cyan-400" : "text-indigo-600",
    hoverAccent: darkMode ? "hover:text-cyan-400" : "hover:text-indigo-600",
    sourceText: darkMode ? "text-amber-500" : "text-amber-700",
  };

  return (
    <div
      className={`${theme.page} min-h-screen font-sans selection:bg-cyan-500/30 flex flex-col md:flex-row transition-colors duration-200`}
    >
      {/* LEFT PANE: Sticky Nav & Meta */}
      <div
        className={`w-full md:w-[35vw] md:h-screen md:sticky top-0 flex flex-col justify-between border-b md:border-b-0 md:border-r ${theme.border} p-6 md:p-10 transition-colors duration-200`}
      >
        <div>
          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className={`flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest opacity-50 ${theme.hoverAccent} transition-colors mb-16`}
          >
            <ArrowLeft size={16} /> [ Directory ]
          </button>

          {/* Topic Header fed by Markdown Frontmatter */}
          <h1 className='text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 wrap-break-words'>
            {frontmatter?.title || topicKey}
            <span className={`${theme.accent} animate-pulse`}>_</span>
          </h1>
          <p className='font-mono text-sm opacity-70 mb-12 max-w-md leading-relaxed'>
            {frontmatter?.description}
          </p>
        </div>

        {/* Footer Settings */}
        <div className='hidden md:flex justify-between items-center font-mono text-[10px] tracking-widest opacity-50 uppercase mt-12'>
          <span>
            Src: <span className={`${theme.sourceText}`}>{topicKey}.mdx</span>
          </span>
          <button
            onClick={toggleTheme}
            className={`${theme.hoverAccent} transition-colors`}
          >
            [ {darkMode ? "LIGHT" : "DARK"} ]
          </button>
        </div>
      </div>

      {/* RIGHT PANE: Scrolling Content where the Markdown goes */}
      <div className='w-full md:w-[65vw] min-h-screen p-6 md:p-10'>
        {children}
        <div className='h-32'></div>
      </div>
    </div>
  );
}
