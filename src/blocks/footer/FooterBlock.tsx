import type { FooterProps } from '../types'
import { fontStack } from '../../utils/fonts'

const PLATFORM_LABELS: Record<string, string> = { instagram: 'IG', facebook: 'FB', twitter: 'TW', tiktok: 'TK', youtube: 'YT', linkedin: 'LI' }

export function FooterBlock({ props: p }: { props: FooterProps }) {
  const socialIconBg = p.socialIconBgColor ?? '#374151'

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, textAlign: 'center' }}>
      {p.logo
        ? <img src={p.logo} alt={p.logoAlt} style={{ maxWidth: p.logoMaxWidth, height: 'auto', margin: '0 auto 12px', display: 'block' }} />
        : <div style={{ fontFamily: fontStack(p.fontFamily), fontSize: 18, fontWeight: 800, color: p.linkColor, marginBottom: 12 }}>{p.logoAlt}</div>}
      {p.tagline && <p style={{ margin: '0 0 16px', fontFamily: fontStack(p.fontFamily), fontSize: p.fontSize, color: p.textColor, lineHeight: 1.5 }}>{p.tagline}</p>}
      {p.socialLinks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          {p.socialLinks.map(s => {
            const size = s.iconSize ?? 32
            return (
              <a key={s.id} href="#" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: '50%', backgroundColor: s.icon ? 'transparent' : socialIconBg, textDecoration: 'none', overflow: 'hidden', flexShrink: 0 }}>
                {s.icon
                  ? <img src={s.icon} alt={s.platform} style={{ width: size, height: size, display: 'block', borderRadius: '50%' }} />
                  : <span style={{ color: p.linkColor, fontSize: 10, fontWeight: 700, fontFamily: fontStack(p.fontFamily) }}>{PLATFORM_LABELS[s.platform] || s.platform.slice(0, 2).toUpperCase()}</span>}
              </a>
            )
          })}
        </div>
      )}
      {p.links.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          {p.links.map((l, i) => (
            <span key={l.id}>
              <a href="#" style={{ fontFamily: fontStack(p.fontFamily), fontSize: p.fontSize, color: p.linkColor, textDecoration: 'underline', margin: '0 6px' }}>{l.label}</a>
              {i < p.links.length - 1 && <span style={{ color: '#4b5563' }}>|</span>}
            </span>
          ))}
        </div>
      )}
      {p.addressText && <p style={{ margin: '0 0 6px', fontFamily: fontStack(p.fontFamily), fontSize: p.fontSize - 1, color: p.textColor }}>{p.addressText}</p>}
      {p.unsubscribeText && <p style={{ margin: 0, fontFamily: fontStack(p.fontFamily), fontSize: p.fontSize - 1, color: p.textColor }}>{p.unsubscribeText}</p>}
    </div>
  )
}
