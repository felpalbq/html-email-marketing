import type { SocialProofProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function SocialProofBlock({ props: p }: { props: SocialProofProps }) {
  const rows: typeof p.images[] = []
  for (let i = 0; i < p.images.length; i += p.columns) {
    rows.push(p.images.slice(i, i + p.columns) as typeof p.images)
  }

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 6px', fontFamily: fontStack(p.titleFontFamily), fontSize: 24, fontWeight: 700, color: p.titleColor }}>{p.title}</h3>
      <p style={{ margin: '0 0 20px', fontFamily: fontStack(p.titleFontFamily), fontSize: 13, color: '#9ca3af' }}>{p.subtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 4 }}>
            {row.map(img => (
              <div key={img.id} style={{ flex: 1, aspectRatio: '1', overflow: 'hidden' }}>
                {img.url ? <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: 100, backgroundColor: '#e5e7eb' }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <a href="#" style={{ display: 'inline-block', backgroundColor: p.ctaBackgroundColor, color: p.ctaTextColor, fontFamily: fontStack(p.titleFontFamily), fontSize: 14, fontWeight: 700, padding: '12px 28px', borderRadius: 6, textDecoration: 'none' }}>{p.ctaText}</a>
    </div>
  )
}
