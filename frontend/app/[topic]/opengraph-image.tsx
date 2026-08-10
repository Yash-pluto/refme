import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'RefMe Documentation';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;

  // Format the slug (e.g., 'data-structures' -> 'Data Structures')
  const formattedTitle = topic
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col justify-between p-20"
        style={{
          backgroundColor: '#050505',
          // A modern, subtle purple glow radiating from the bottom right
          backgroundImage: 'radial-gradient(circle at 1000px 800px, rgba(198, 153, 255, 0.20), transparent 65%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Subtle dot grid pattern for a technical aesthetic */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            zIndex: 0,
          }}
        />

        {/* TOP: Brand / Logo */}
        <div tw="flex items-center" style={{ zIndex: 10 }}>
          {/* Logo Box matching TopicLayout.tsx */}
          <div
            tw="flex items-center justify-center rounded-2xl bg-[#0F1115] text-white border border-white/10"
            style={{ width: '72px', height: '72px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <span tw="font-black leading-none" style={{ fontSize: '36px', letterSpacing: '-0.14em' }}>
              R<span tw="text-zinc-500">_</span>
            </span>
          </div>
          {/* Brand Text */}
          <div tw="flex flex-row ml-6 items-center font-semibold uppercase" style={{ fontSize: '22px', letterSpacing: '0.28em' }}>
            <span tw="text-[#F5F5F5]">RefMe</span>
            <span tw="ml-3 text-zinc-500">docs</span>
          </div>
        </div>

        {/* CENTER/BOTTOM: Title & Description */}
        <div tw="flex flex-col mt-auto" style={{ zIndex: 10 }}>
          {/* Accent eyebrow text */}
          <div 
            tw="flex font-semibold uppercase mb-4 opacity-90 text-[#C699FF]" 
            style={{ fontSize: '24px', letterSpacing: '0.2em' }}
          >
            Reference Guide
          </div>
          
          {/* Main Dynamic Title */}
          <div 
            tw="flex font-extrabold text-white leading-none" 
            style={{ fontSize: '110px', letterSpacing: '-0.04em' }}
          >
            {formattedTitle}
          </div>
          
          <div 
            tw="flex mt-8 text-zinc-400 font-medium" 
            style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
          >
            The developer's quick-reference guide.
          </div>
        </div>

        {/* BOTTOM RIGHT: Decorative URL */}
        <div tw="absolute bottom-20 right-20 flex items-center" style={{ zIndex: 10 }}>
           <div tw="flex text-2xl text-zinc-600 font-medium" style={{ letterSpacing: '0.05em' }}>
             github.com/yash-pluto/refme
           </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}