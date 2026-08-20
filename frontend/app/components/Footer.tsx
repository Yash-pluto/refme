// Footer.tsx
"use client";

import Link from "next/link";
import { useTheme } from "../../src/context/ThemeContext";
import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const { darkMode } = useTheme();

  const themeClasses = {
    bg: darkMode ? "bg-[#050505]" : "bg-zinc-50",
    border: darkMode ? "border-[#333]" : "border-[#E5E5E5]",
    text: darkMode ? "text-zinc-400" : "text-zinc-500",
    hover: darkMode ? "hover:text-white" : "hover:text-black",
    heading: darkMode ? "text-white" : "text-black",
    iconBtn: darkMode ? "border-[#333] hover:bg-[#1a1a1a]" : "border-[#E5E5E5] hover:bg-zinc-200",
  };

  const watermarkStroke = darkMode
    ? "rgba(255, 255, 255, 0.82)"
    : "rgba(0, 0, 0, 0.72)";

  return (
    <footer className={`w-full ${themeClasses.bg} border-t ${themeClasses.border} pt-10 pb-6 overflow-hidden mt-auto relative`}>
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-2">
          <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-4">
            <p className={`text-[14px] font-semibold max-w-xs leading-relaxed ${themeClasses.heading}`}>
              RefMe is the modern and intuitive way to master tech stacks and build exceptional products.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${themeClasses.iconBtn} ${themeClasses.heading}`}>
                <FaGithub size={15} />
              </a>
              <a href="https://linkedin.com/in/vardhan-yash3105" target="_blank" rel="noopener noreferrer" className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${themeClasses.iconBtn} ${themeClasses.heading}`}>
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <h4 className={`text-[13px] font-bold border-b pb-2 ${themeClasses.border} ${themeClasses.heading}`}>Product</h4>
              <ul className="flex flex-col gap-2">
                <li><Link href="/updates" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Product Updates</Link></li>
                <li><Link href="/roadmaps" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Roadmaps</Link></li>
                <li><Link href="/tutorials" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Video Tutorials</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className={`text-[13px] font-bold border-b pb-2 ${themeClasses.border} ${themeClasses.heading}`}>Resources</h4>
              <ul className="flex flex-col gap-2">
                <li><Link href="/stories" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Customer stories</Link></li>
                <li><Link href="/docs" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Product docs</Link></li>
                <li><Link href="/philosophy" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Philosophy</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className={`text-[13px] font-bold border-b pb-2 ${themeClasses.border} ${themeClasses.heading}`}>Company</h4>
              <ul className="flex flex-col gap-2">
                <li><a href="https://yash-pluto.vercel.app/" target="_blank" rel="noopener noreferrer" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>About</a></li>
                <li>
                  <Link href="/careers" className={`inline-flex items-center gap-2 text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>
                    Careers
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${darkMode ? "bg-[#222] text-zinc-300" : "bg-zinc-200 text-zinc-700"}`}>WE'RE HIRING</span>
                  </Link>
                </li>
                <li><a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className={`text-[13px] font-medium transition-colors ${themeClasses.text} ${themeClasses.hover}`}>Open Source</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative w-full overflow-hidden pointer-events-none select-none"
          style={{ height: "clamp(65px, 10vw, 150px)" }}
        >
         <div
          className="absolute left-1/2 flex w-max -translate-x-1/2 items-start justify-center whitespace-nowrap font-black uppercase"
          style={{
            fontSize: "clamp(75px, 14vw, 200px)",
            bottom: "-40%",
            lineHeight: "0.78",
            letterSpacing: "0.045em",
            paddingLeft: "0.045em",
            
            textShadow: darkMode 
              ? "0 0 10px #FFFFFF, 0 0 30px #FFFFFF" 
              : "0 0 10px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,10)", 

            color: darkMode ? "#050505" : "#fafafa", 
            
            WebkitTextStroke: `3px ${watermarkStroke}`,
            
            WebkitMaskImage: `
              linear-gradient(
                to bottom,
                black 0%,
                black 42%,
                rgba(0, 0, 0, 0.92) 55%,
                rgba(0, 0, 0, 0.55) 72%,
                rgba(0, 0, 0, 0.16) 88%,
                transparent 100%
              )
            `,
            maskImage: `
              linear-gradient(
                to bottom,
                black 0%,
                black 42%,
                rgba(0, 0, 0, 0.92) 55%,
                rgba(0, 0, 0, 0.55) 72%,
                rgba(0, 0, 0, 0.16) 88%,
                transparent 100%
              )
            `,
          }}
        >
            RefMe
          </div>
        </div>

        <div className={`relative flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t ${themeClasses.border} text-[13px] font-medium ${themeClasses.text}`}>
          
          <div 
            className="absolute top-0 left-0 w-full h-[95px] -translate-y-full pointer-events-none z-10"
            style={{
              background: darkMode 
                ? 'linear-gradient(to top, #050505 10%, rgba(5,5,5,0.85) 40%, transparent 100%)' 
                : 'linear-gradient(to top, #fafafa 10%, rgba(250,250,250,0.85) 40%, transparent 100%)'
            }}
          />

          <p className="relative z-20">© 2026 RefMe</p>
          <div className="flex items-center gap-6 relative z-20">
            <Link href="/security" className={`transition-colors ${themeClasses.hover}`}>Security</Link>
            <Link href="/terms" className={`transition-colors ${themeClasses.hover}`}>Terms of service</Link>
            <Link href="/privacy" className={`transition-colors ${themeClasses.hover}`}>Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}