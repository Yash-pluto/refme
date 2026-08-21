"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-50 dark:bg-[#050505] border-t border-[#E5E5E5] dark:border-[#333] pt-10 pb-6 overflow-hidden mt-auto relative">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-2">
          <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-4">
            <p className="text-[14px] font-semibold max-w-xs leading-relaxed text-black dark:text-white">
              RefMe is the modern and intuitive way to master tech stacks and build exceptional products.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors border-[#E5E5E5] dark:border-[#333] hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] text-black dark:text-white">
                <FaGithub size={15} />
              </a>
              <a href="https://linkedin.com/in/vardhan-yash3105" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors border-[#E5E5E5] dark:border-[#333] hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] text-black dark:text-white">
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-[13px] font-bold border-b pb-2 border-[#E5E5E5] dark:border-[#333] text-black dark:text-white">Product</h4>
              <ul className="flex flex-col gap-2">
                <li><Link href="/updates" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Product Updates</Link></li>
                <li><Link href="/roadmaps" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Roadmaps</Link></li>
                <li><Link href="/tutorials" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Video Tutorials</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-[13px] font-bold border-b pb-2 border-[#E5E5E5] dark:border-[#333] text-black dark:text-white">Resources</h4>
              <ul className="flex flex-col gap-2">
                <li><Link href="/stories" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Customer stories</Link></li>
                <li><Link href="/docs" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Product docs</Link></li>
                <li><Link href="/philosophy" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Philosophy</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-[13px] font-bold border-b pb-2 border-[#E5E5E5] dark:border-[#333] text-black dark:text-white">Company</h4>
              <ul className="flex flex-col gap-2">
                <li><a href="https://yash-pluto.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">About</a></li>
                <li>
                  <Link href="/careers" className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                    Careers
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-zinc-200 text-zinc-700 dark:bg-[#222] dark:text-zinc-300">WE'RE HIRING</span>
                  </Link>
                </li>
                <li><a href="https://github.com/yash-pluto/refme" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">Open Source</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden md:block relative w-full overflow-hidden pointer-events-none select-none "
          style={{ height: "clamp(65px, 10vw, 150px)" }}
        >
         <div
          className="absolute left-1/2 flex w-max -translate-x-1/2 items-start justify-center whitespace-nowrap font-black uppercase text-[#fafafa] dark:text-[#050505] [-webkit-text-stroke:3px_rgba(0,0,0,0.72)] dark:[-webkit-text-stroke:3px_rgba(255,255,255,0.82)] [text-shadow:0_0_10px_rgba(0,0,0,1),_0_0_10px_rgba(0,0,0,10)] dark:[text-shadow:0_0_10px_#FFFFFF,_0_0_30px_#FFFFFF]"
          style={{
            fontSize: "clamp(75px, 14vw, 200px)",
            bottom: "-40%",
            lineHeight: "0.78",
            letterSpacing: "0.045em",
            paddingLeft: "0.045em",
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

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#E5E5E5] dark:border-[#333] text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
          
          <div 
            className="absolute top-0 left-0 w-full h-[95px] hidden md:block -translate-y-full pointer-events-none z-10 bg-[linear-gradient(to_top,#fafafa_10%,rgba(250,250,250,0.85)_40%,transparent_100%)] dark:bg-[linear-gradient(to_top,#050505_10%,rgba(5,5,5,0.85)_40%,transparent_100%)]"
          />

          <p className="relative z-20">© 2026 RefMe</p>
          <div className="flex items-center gap-6 relative z-20">
            <Link href="/security" className="transition-colors hover:text-black dark:hover:text-white">Security</Link>
            <Link href="/terms" className="transition-colors hover:text-black dark:hover:text-white">Terms of service</Link>
            <Link href="/privacy" className="transition-colors hover:text-black dark:hover:text-white">Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}