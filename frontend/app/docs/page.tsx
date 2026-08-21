import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-500/30 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Hub
        </Link>

        <h1 className="text-4xl font-black tracking-tighter mb-4">
          RefMe<span className="text-zinc-500">_</span> Architecture & Vision
        </h1>
        <p className="text-lg mb-12 text-zinc-600 dark:text-zinc-400">
          A deep dive into how RefMe is built, the problem it solves, and the
          journey of crafting a modern full-stack reference tool.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4">
              The Problem
            </h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              As developers, we constantly switch contexts between writing code,
              running CLI commands, managing infrastructure, and configuring
              tools. The syntax escapes us. We end up opening dozens of browser
              tabs, digging through heavy documentation sites, or repeatedly
              prompting AI for the same boilerplate snippets. There wasn't a
              single, ultra-fast, offline-capable, and distraction-free
              environment curated specifically for quick lookups.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4">
              The Solution
            </h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              <strong>RefMe</strong> is built to be the antidote to
              documentation fatigue. It is a centralized repository of core
              programming languages, CLI tools, infrastructure templates, and AI
              prompts. Designed with an emphasis on speed, clean UI, and
              immediate copy-paste utility, it acts as a secondary brain for
              modern software engineering.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4">
              System Design & Tech Stack
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong>Framework:</strong> Next.js 15 (App Router) to ensure
                excellent SEO, fast server-side rendering, and easy API route
                expansion in the future.
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS V4 for rapid,
                utility-first styling. The design language relies on strict
                monochrome palettes (zinc variants) accented by purposeful
                syntax highlighting to reduce visual noise.
              </li>
              <li>
                <strong>Architecture:</strong> Component-driven and Server-first. 
                Theme resolution is handled via a blocking pre-hydration script, 
                eliminating hydration mismatches and removing the need for heavy 
                client-side theme providers on static pages.
              </li>
              <li>
                <strong>Data Layer:</strong> Currently utilizing modularized
                static JSON/TypeScript data structures (`cheatsheets.ts` and
                `references.json`) for zero-latency retrieval.
              </li>
              <li>
                <strong>Icons & Assets:</strong> Lucide React for consistent,
                lightweight SVG iconography.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4">
              Future Ideas & Roadmap
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <p>
                As this side project evolves, several key features are planned
                for the pipeline:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Backend Integration:</strong> Migrating static data to
                  a database (like PostgreSQL via Prisma) to allow dynamic
                  snippet updates.
                </li>
                <li>
                  <strong>User Authentication:</strong> Allow developers to
                  create accounts, save their favorite snippets, and build
                  custom cheatsheets.
                </li>
                <li>
                  <strong>Interactive Terminal:</strong> A web-based terminal
                  emulator component to practice bash commands or test regex
                  directly in the browser.
                </li>
                <li>
                  <strong>CLI Companion Tool:</strong> A Rust-based CLI that
                  allows users to fetch RefMe snippets directly from their
                  terminal without opening a browser.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}