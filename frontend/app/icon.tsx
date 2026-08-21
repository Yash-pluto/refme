import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
    ),
    {
      ...size,
    }
  );
}