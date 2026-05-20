import type { HeroProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { hexToRgba } from '../../utils/colorUtils'

export function HeroBlock({ props: p }: { props: HeroProps }) {
  const overlayBg = p.overlayOpacity > 0 ? hexToRgba(p.overlayColor, p.overlayOpacity / 100) : 'transparent'

  return (
    <div style={{
      backgroundImage: p.backgroundImage ? `url(${p.backgroundImage})` : undefined,
      backgroundColor: p.backgroundImage ? '#1a1a2e' : '#1a1a2e',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: p.minHeight,
      paddingTop: p.paddingTop,
      paddingBottom: p.paddingBottom,
      position: 'relative',
    }}>
      {p.overlayOpacity > 0 && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: overlayBg }} />
      )}
      <div style={{ position: 'relative', padding: '0 40px', textAlign: p.contentAlignment }}>
        {p.badge && (
          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block', backgroundColor: p.badgeColor, color: '#fff',
              fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              padding: '5px 14px', borderRadius: 20,
              fontFamily: fontStack(p.headlineFontFamily),
            }}>{p.badge}</span>
          </div>
        )}
        <h1 style={{
          margin: '0 0 16px', fontFamily: fontStack(p.headlineFontFamily),
          fontSize: p.headlineFontSize, fontWeight: p.headlineFontWeight,
          color: p.headlineColor, lineHeight: 1.15,
        }}>{p.headline || 'Headline'}</h1>
        {p.subtitle && (
          <p style={{
            margin: '0 0 28px', fontFamily: fontStack(p.subtitleFontFamily),
            fontSize: p.subtitleFontSize, color: p.subtitleColor, lineHeight: 1.6,
          }}>{p.subtitle}</p>
        )}
        {p.ctaText && (
          <a href="#" style={{
            display: 'inline-block', backgroundColor: p.ctaBackgroundColor,
            color: p.ctaTextColor, padding: '14px 36px', borderRadius: p.ctaBorderRadius,
            textDecoration: 'none', fontWeight: 700, fontSize: 16,
            fontFamily: fontStack(p.headlineFontFamily),
          }}>{p.ctaText}</a>
        )}
      </div>
    </div>
  )
}
