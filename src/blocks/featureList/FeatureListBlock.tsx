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
              <div style={{ fontSize: p.iconSize, lineHeight: 1, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: fontStack(p.titleFontFamily), fontSize: p.titleFontSize, fontWeight: 700, color: p.titleColor, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontFamily: fontStack(p.descriptionFontFamily), fontSize: p.descriptionFontSize, color: p.descriptionColor, lineHeight: 1.55 }}>{f.description}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
