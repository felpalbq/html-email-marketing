import type { TrustBadgesProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function TrustBadgesBlock({ props: p }: { props: TrustBadgesProps }) {
  const cols = p.columns ?? 4
  const rows: typeof p.items[] = []
  for (let i = 0; i < p.items.length; i += cols) {
    rows.push(p.items.slice(i, i + cols) as typeof p.items)
  }

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 16, marginBottom: ri < rows.length - 1 ? 20 : 0 }}>
          {row.map(item => (
            <div key={item.id} style={{ flex: 1, textAlign: p.alignment as 'left' | 'center' | 'right', padding: '12px 8px' }}>
              {item.icon && (
                <div style={{ fontSize: p.iconSize ?? 32, marginBottom: 8, color: p.iconColor }}>
                  {item.icon.startsWith('http') || item.icon.startsWith('/')
                    ? <img src={item.icon} alt="" style={{ width: p.iconSize ?? 32, height: p.iconSize ?? 32 }} />
                    : item.icon}
                </div>
              )}
              <div style={{ fontFamily: fontStack(p.titleFontFamily), fontSize: p.titleFontSize, fontWeight: 700, color: p.titleColor, marginBottom: 2 }}>{item.title}</div>
              {item.subtitle && <div style={{ fontFamily: fontStack(p.subtitleFontFamily), fontSize: p.subtitleFontSize, color: p.subtitleColor }}>{item.subtitle}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
