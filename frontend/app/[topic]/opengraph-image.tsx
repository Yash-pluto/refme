import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'RefMe_ | Technical Reference for Modern Developers';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col justify-between p-20"
        style={{
          backgroundColor: '#050505',
          backgroundImage: 'radial-gradient(circle at 1000px 800px, rgba(198, 153, 255, 0.20), transparent 65%)',
          fontFamily: 'sans-serif',
        }}
      >
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

        <div tw="flex items-center" style={{ zIndex: 10 }}>
          {/* Note: The container wrapper below has a background and border. 
              Since your SVG also has a background/border, you may want to strip 
              the wrapper's bg/border if it looks like a box-inside-a-box, 
              but it is technically sound as-is. */}
          <div
            tw="flex items-center justify-center rounded-2xl bg-[#0F1115] text-white border border-white/10 overflow-hidden"
            style={{ width: '72px', height: '72px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
              <rect width="512" height="512" rx="116" fill="#09090b"/>
              <rect x="6" y="6" width="500" height="500" rx="110" fill="none" stroke="#27272a" strokeWidth="4"/>
              <g>
                <text 
                  x="150" 
                  y="365" 
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
                  fontWeight="900" 
                  fontSize="290" 
                  fill="#ffffff" 
                  letterSpacing="-8"
                >
                  R
                </text>
                <rect x="350" y="325" width="55" height="24" rx="5" fill="#a1a1aa"/>
              </g>
            </svg>
          </div>
          <div tw="flex flex-row ml-6 items-center font-semibold uppercase" style={{ fontSize: '22px', letterSpacing: '0.28em' }}>
            <span tw="text-[#F5F5F5]">RefMe</span>
            <span tw="ml-3 text-zinc-500">docs</span>
          </div>
        </div>

        <div tw="flex flex-col mt-auto" style={{ zIndex: 10, maxWidth: '960px' }}>
          <div 
            tw="flex font-semibold uppercase mb-4 opacity-90 text-[#C699FF]" 
            style={{ fontSize: '24px', letterSpacing: '0.2em' }}
          >
            Technical Reference
          </div>
          
          <div 
            tw="flex font-extrabold text-white leading-none" 
            style={{ fontSize: '110px', letterSpacing: '-0.04em' }}
          >
            RefMe_
          </div>
          
          <div 
            tw="flex mt-8 text-zinc-400 font-medium" 
            style={{ fontSize: '32px', letterSpacing: '-0.01em', lineHeight: 1.4 }}
          >
            The ultimate centralized, fast, and minimal technical reference hub for modern full-stack development. Built for clarity and speed.
          </div>
        </div>

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