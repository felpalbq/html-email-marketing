import type { CtaBannerProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function CtaBannerBlock({ props: p }: { props: CtaBannerProps }) {
  const textContent = (
    <div>
      {p.badge && <div style={{ marginBottom: 10 }}><span style={{ display: 'inline-block', backgroundColor: p.badgeColor, color: p.badgeTextColor, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 20 }}>{p.badge}</span></div>}
      <h2 style={{ margin: '0 0 10px', fontFamily: fontStack(p.headlineFontFamily), fontSize: p.headlineFontSize, fontWeight: 800, color: p.headlineColor, lineHeight: 1.2 }}>{p.headline || 'Headline'}</h2>
      <p style={{ margin: '0 0 20px', fontFamily: fontStack(p.bodyFontFamily), fontSize: 15, color: p.bodyColor, lineHeight: 1.6 }}>{p.bodyText}</p>
      {p.ctaText && <a href="#" style={{ display: 'inline-block', backgroundColor: p.ctaBackgroundColor, color: p.ctaTextColor, fontFamily: fontStack(p.headlineFontFamily), fontSize: 15, fontWeight: 700, padding: '13px 28px', borderRadius: p.ctaBorderRadius, textDecoration: 'none' }}>{p.ctaText}</a>}
    </div>
  )

  const imgContent = (
    <div style={{ flexShrink: 0 }}>
      {p.image ? <img src={p.image} alt={p.imageAlt} style={{ width: 200, height: 'auto', borderRadius: 8 }} /> : <div style={{ width: 200, height: 180, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 }} />}
    </div>
  )

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      {p.layout === 'centered'
        ? <div style={{ textAlign: 'center' }}>{textContent}</div>
        : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {p.layout === 'image-right' ? <>{textContent}{imgContent}</> : <>{imgContent}{textContent}</>}
          </div>
        )}
    </div>
  )
}
