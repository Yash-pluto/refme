"use client";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const outerClass = darkMode
    ? "border-white/10 bg-[#020202]"
    : "border-black/10 bg-white";
  const textClass = darkMode ? "text-zinc-600" : "text-zinc-400";
  const headingClass = darkMode ? "text-zinc-400" : "text-zinc-800";

  return (
    <footer className={`relative z-10 border-t ${outerClass}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12'>
          <div className='col-span-1 sm:col-span-2 md:col-span-2'>
            <div className='text-xl sm:text-2xl font-black tracking-tighter mb-3 sm:mb-4'>
              RefMe<span className='text-zinc-500'>_</span>
            </div>
            <p
              className={`max-w-sm ${textClass} text-xs sm:text-sm leading-relaxed`}
            >
              The ultimate technical reference for modern full-stack
              development. Optimized for speed, crafted for clarity.
            </p>
          </div>

          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-widest mb-3 sm:mb-6 ${headingClass}`}
            >
              Resources
            </h4>
            <ul className='space-y-2 sm:space-y-4 text-xs sm:text-sm font-medium text-zinc-500'>
              <li>
                <a href='#' className='hover:text-zinc-400 transition-colors'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-zinc-400 transition-colors'>
                  API Reference
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-zinc-400 transition-colors'>
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-widest mb-3 sm:mb-6 ${headingClass}`}
            >
              Connect
            </h4>
            <ul className='space-y-2 sm:space-y-4 text-xs sm:text-sm font-medium text-zinc-500'>
              <li>
                <a
                  href='https://github.com/Yash-pluto'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-zinc-400 transition-colors'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-zinc-400 transition-colors'>
                  Discord
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-zinc-400 transition-colors'>
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`pt-6 sm:pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs font-medium ${darkMode ? "border-white/10 text-zinc-600" : "border-black/10 text-zinc-400"}`}
        >
          <p className='text-center sm:text-left'>
            © {new Date().getFullYear()} REFME INFRASTRUCTURE. All rights
            reserved.
          </p>
          <div className='flex items-center gap-4 sm:gap-6'>
            <a href='#' className='hover:text-zinc-400 transition-colors'>
              Privacy
            </a>
            <a href='#' className='hover:text-zinc-400 transition-colors'>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
