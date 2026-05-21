import type { FeatureListProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function FeatureListBlock({ props: p }: { props: FeatureListProps }) {
  const rows: typeof p.features[] = []
  for (let i = 0; i < p.features.length; i += p.columns) {
    rows.push(p.features.slice(i, i + p.columns) as typeof p.features)
  }

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 24, marginBottom: ri < rows.length - 1 ? 24 : 0 }}>
          {row.map(f => (
            <div key={f.id} style={{ flex: 1, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, lineHeight: 1 }}>
                {f.icon && (f.icon.startsWith('http') || f.icon.startsWith('/'))
                  ? <img src={f.icon} alt="" style={{ width: p.iconSize, height: p.iconSize, display: 'block' }} />
                  : <span style={{ fontSize: p.iconSize, lineHeight: 1 }}>{f.icon}</span>}
              </div>
              <div>
                <div style={{ fontFamily: fontStack(p.titleFontFamily), fontSize: p.titleFontSize, fontWeight: 700, color: p.titleColor, marginBottom: 4, lineHeight: p.titleLineHeight ?? 1.3, letterSpacing: `${p.titleLetterSpacing ?? 0}px` }}>{f.title}</div>
                <div style={{ fontFamily: fontStack(p.descriptionFontFamily), fontSize: p.descriptionFontSize, color: p.descriptionColor, lineHeight: p.descriptionLineHeight ?? 1.55, letterSpacing: `${p.descriptionLetterSpacing ?? 0}px`, whiteSpace: 'pre-wrap' }}>{f.description}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
