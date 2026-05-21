import type { HeroProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { hexToRgba } from '../../utils/colorUtils'

function renderText(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}

export function HeroBlock({ props: p }: { props: HeroProps }) {
  const overlayBg = p.overlayOpacity > 0 ? hexToRgba(p.overlayColor, p.overlayOpacity / 100) : 'rgba(0,0,0,0)'
  const direction = p.overlayDirection ?? 'full'
  const overlayWidthPct = `${p.overlayWidth ?? 60}%`

  const ctaAlign = p.ctaAlignment ?? p.contentAlignment
  const ctaFontSize = p.ctaFontSize ?? 16
  const ctaFontWeight = p.ctaFontWeight ?? '700'
  const ctaPaddingV = p.ctaPaddingV ?? 14
  const ctaPaddingH = p.ctaPaddingH ?? 36

  const bgStyle: React.CSSProperties = {
    backgroundImage: p.backgroundImage ? `url(${p.backgroundImage})` : undefined,
    backgroundColor: '#1a1a2e',
    backgroundSize: 'cover',
    backgroundPosition: p.backgroundPosition ?? 'center center',
  }

  const contentBlock = (
    <div style={{ textAlign: p.contentAlignment }}>
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
        margin: '0 0 16px',
        fontFamily: fontStack(p.headlineFontFamily),
        fontSize: p.headlineFontSize,
        fontWeight: p.headlineFontWeight,
        color: p.headlineColor,
        lineHeight: p.headlineLineHeight ?? 1.15,
        letterSpacing: `${p.headlineLetterSpacing ?? 0}px`,
        whiteSpace: 'pre-wrap',
      }}>{renderText(p.headline || 'Headline')}</h1>

      {p.subtitle && (
        <p style={{
          margin: '0 0 28px',
          fontFamily: fontStack(p.subtitleFontFamily),
          fontSize: p.subtitleFontSize,
          color: p.subtitleColor,
          lineHeight: p.subtitleLineHeight ?? 1.6,
          letterSpacing: `${p.subtitleLetterSpacing ?? 0}px`,
          whiteSpace: 'pre-wrap',
        }}>{renderText(p.subtitle)}</p>
      )}

      {p.ctaText && (
        <div style={{ textAlign: ctaAlign }}>
          <a href="#" style={{
            display: 'inline-block',
            backgroundColor: p.ctaBackgroundColor,
            color: p.ctaTextColor,
            padding: `${ctaPaddingV}px ${ctaPaddingH}px`,
            borderRadius: p.ctaBorderRadius,
            textDecoration: 'none',
            fontWeight: ctaFontWeight,
            fontSize: ctaFontSize,
            fontFamily: fontStack(p.headlineFontFamily),
          }}>{p.ctaText}</a>
        </div>
      )}
    </div>
  )

  // Full overlay — single block with semi-transparent colour on top of the background image
  if (direction === 'full') {
    return (
      <div style={{ ...bgStyle, minHeight: p.minHeight, paddingTop: p.paddingTop, paddingBottom: p.paddingBottom, position: 'relative' }}>
        {p.overlayOpacity > 0 && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: overlayBg }} />
        )}
        <div style={{ position: 'relative', padding: '0 40px' }}>
          {contentBlock}
        </div>
      </div>
    )
  }

  // Split overlay — 2-column flex layout matching the email HTML exactly
  // Text column has the solid overlay colour; empty column shows the background image through
  const contentCol = (
    <div style={{
      width: overlayWidthPct,
      flexShrink: 0,
      backgroundColor: overlayBg,
      padding: `${p.paddingTop}px 32px ${p.paddingBottom}px`,
    }}>
      {contentBlock}
    </div>
  )
  const emptyCol = <div style={{ flex: 1 }} />

  return (
    <div style={{ ...bgStyle, minHeight: p.minHeight, display: 'flex', alignItems: 'stretch' }}>
      {direction === 'left' ? <>{contentCol}{emptyCol}</> : <>{emptyCol}{contentCol}</>}
    </div>
  )
}
