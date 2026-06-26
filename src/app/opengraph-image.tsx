import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Shimeming — personal site';

export default function OGImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#F5F8F6',
          backgroundImage: [
            'linear-gradient(rgba(30,95,204,0.08) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(30,95,204,0.08) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '48px 48px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Red accent square */}
        <div
          style={{
            display: 'flex',
            width: 64,
            height: 64,
            backgroundColor: '#C8402F',
            borderRadius: 12,
            marginBottom: 40,
          }}
        />

        {/* Main heading */}
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 700,
            color: '#0F1A12',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          SHIMEMING
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#1E5FCC',
            fontWeight: 600,
            letterSpacing: '2px',
            marginBottom: 20,
          }}
        >
          CS · games · graphics
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#5A7A65',
            fontStyle: 'italic',
          }}
        >
          writing down everything I figure out on the way up
        </div>

        {/* Bottom-right URL */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 48,
            right: 96,
            fontSize: 20,
            color: '#1E5FCC',
            opacity: 0.7,
          }}
        >
          shimeming.github.io
        </div>
      </div>
    ),
    { ...size },
  );
}
