import type { TwoColumnProps } from '../types'
import { fontStack } from '../../utils/fonts'

function renderText(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
  ))
}

export function TwoColumnBlock({ props: p }: { props: TwoColumnProps }) {
  const isTextLeft = (p.layout ?? 'text-left') === 'text-left'
  const ctaFontSize = p.ctaFontSize ?? 15
  const ctaFontWeight = p.ctaFontWeight ?? '700'
  const ctaPaddingV = p.ctaPaddingV ?? 13
  const ctaPaddingH = p.ctaPaddingH ?? 28
  const imgWidth = p.imageWidth ?? 260

  const textContent = (
    <div style={{ flex: 1 }}>
      {p.badge && (
        <div style={{ marginBottom: 10 }}>
          <span style={{ display: 'inline-block', backgroundColor: p.badgeColor, color: p.badgeTextColor, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 20 }}>{p.badge}</span>
        </div>
      )}
      <h2 style={{
        margin: '0 0 14px',
        fontFamily: fontStack(p.titleFontFamily),
        fontSize: p.titleFontSize,
        fontWeight: p.titleFontWeight ?? '700',
        color: p.titleColor,
        lineHeight: p.titleLineHeight ?? 1.2,
        letterSpacing: `${p.titleLetterSpacing ?? 0}px`,
        whiteSpace: 'pre-wrap',
      }}>{renderText(p.title || 'Título')}</h2>
      <p style={{
        margin: '0 0 24px',
        fontFamily: fontStack(p.bodyFontFamily),
        fontSize: p.bodyFontSize ?? 15,
        color: p.bodyColor,
        lineHeight: p.bodyLineHeight ?? 1.7,
        letterSpacing: `${p.bodyLetterSpacing ?? 0}px`,
        whiteSpace: 'pre-wrap',
      }}>{renderText(p.bodyText)}</p>
      {p.ctaText && (
        <a href="#" style={{
          display: 'inline-block',
          backgroundColor: p.ctaBackgroundColor,
          color: p.ctaTextColor,
          fontFamily: fontStack(p.titleFontFamily),
          fontSize: ctaFontSize,
          fontWeight: ctaFontWeight,
          padding: `${ctaPaddingV}px ${ctaPaddingH}px`,
          borderRadius: p.ctaBorderRadius ?? 6,
          textDecoration: 'none',
        }}>{p.ctaText}</a>
      )}
    </div>
  )

  const imgContent = (
    <div style={{ flexShrink: 0 }}>
      {p.image
        ? <img src={p.image} alt={p.imageAlt} style={{ width: imgWidth, height: 'auto', borderRadius: p.imageBorderRadius ?? 8, display: 'block' }} />
        : <div style={{ width: imgWidth, height: 220, backgroundColor: '#e5e7eb', borderRadius: p.imageBorderRadius ?? 8 }} />}
    </div>
  )

  const vAlign = p.verticalAlign ?? 'middle'

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      <div style={{ display: 'flex', gap: 32, alignItems: vAlign === 'top' ? 'flex-start' : vAlign === 'bottom' ? 'flex-end' : 'center' }}>
        {isTextLeft ? <>{textContent}{imgContent}</> : <>{imgContent}{textContent}</>}
      </div>
    </div>
  )
}
