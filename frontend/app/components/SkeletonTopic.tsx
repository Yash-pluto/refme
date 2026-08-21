import { Clock, Sparkles, FileCode2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function SkeletonTopic({ topicKey }: { topicKey: string }) {
  return (
    <div className="mx-auto max-w-3xl py-12 md:py-16">
      <div className="overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white shadow-sm transition-colors duration-200 dark:border-[#222222] dark:bg-[#0A0A0A]">
        
        {/* Header / Status Banner */}
        <div className="flex items-center gap-3 border-b border-[#E5E5E5] bg-zinc-50 px-6 py-5 dark:border-[#222222] dark:bg-[#111111]">
          <div className="flex items-center justify-center rounded-full bg-[#6f45d6]/10 p-2 text-[#6f45d6] dark:bg-[#C699FF]/15 dark:text-[#C699FF]">
            <Clock size={16} strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
            Draft in Progress
          </span>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8 p-6 sm:p-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl dark:text-white">
              Documentation in Progress
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The reference material for <span className="font-semibold text-[#6f45d6] dark:text-[#C699FF]">{topicKey}</span> is currently being developed. It will soon be expanded into a comprehensive guide featuring real-world applications, advanced patterns, and interactive examples.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3">
            {["Examples", "Patterns", "Best Practices"].map((badge) => (
              <span 
                key={badge} 
                className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E5] bg-zinc-50 px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide text-zinc-700 shadow-sm dark:border-[#333333] dark:bg-[#141414] dark:text-zinc-300"
              >
                <Sparkles size={14} className="text-[#6f45d6] dark:text-[#C699FF]" />
                {badge}
              </span>
            ))}
          </div>

          {/* Contributor Callout */}
          <div className="mt-10 rounded-2xl border border-[#E5E5E5] bg-zinc-50 p-5 transition-colors dark:border-[#333333] dark:bg-[#141414]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
                Want to help speed this up or check the latest commits?
              </p>
              <a
                href="https://github.com/yash-pluto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#E5E5E5] bg-white px-4 py-2.5 text-[13px] font-bold text-zinc-800 transition-all hover:bg-zinc-100 dark:border-[#444] dark:bg-[#222] dark:text-zinc-200 dark:hover:bg-[#2A2A2A]"
              >
                <FaGithub size={16} />
                <span>@Yash-pluto</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}