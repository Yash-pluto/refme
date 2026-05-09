"use client";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  return (
    <main className='flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-24 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-6 relative z-10 text-center'>
      <div>
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-8 sm:mb-12 leading-tight ${darkMode ? "text-white" : "text-zinc-950"}`}
        >
          Engineered <br />
          <span className='text-zinc-500'>References.</span>
        </h1>
      </div>

      <p
        className={`max-w-3xl text-lg sm:text-xl md:text-2xl px-2 leading-relaxed font-medium ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
      >
        Zero-latency, high-fidelity documentation and architectural patterns
        designed specifically for modern full-stack workflows.
      </p>
    </main>
  );
}
