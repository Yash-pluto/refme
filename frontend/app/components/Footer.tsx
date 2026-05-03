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
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          <div className='col-span-1 md:col-span-2'>
            <div className='text-2xl font-black tracking-tighter mb-4'>
              RefMe<span className='text-zinc-500'>_</span>
            </div>
            <p className={`max-w-sm ${textClass} text-sm leading-relaxed`}>
              The ultimate technical reference for modern full-stack
              development. Optimized for speed, crafted for clarity.
            </p>
          </div>

          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-widest mb-6 ${headingClass}`}
            >
              Resources
            </h4>
            <ul className='space-y-4 text-sm font-medium text-zinc-500'>
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
              className={`text-xs font-bold uppercase tracking-widest mb-6 ${headingClass}`}
            >
              Connect
            </h4>
            <ul className='space-y-4 text-sm font-medium text-zinc-500'>
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
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium ${darkMode ? "border-white/10 text-zinc-600" : "border-black/10 text-zinc-400"}`}
        >
          <p>
            © {new Date().getFullYear()} REFME INFRASTRUCTURE. All rights
            reserved.
          </p>
          <div className='flex items-center gap-6'>
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
