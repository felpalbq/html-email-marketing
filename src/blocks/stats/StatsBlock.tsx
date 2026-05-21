import type { StatsProps } from '../types'
import { fontStack } from '../../utils/fonts'

const isImageUrl = (s: string) => s.startsWith('http') || s.startsWith('/')

export function StatsBlock({ props: p }: { props: StatsProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {p.items.map((item, i) => (
          <div key={item.id} style={{ flex: 1, textAlign: p.contentAlignment ?? 'center', padding: '0 8px', borderRight: p.showDivider && i < p.items.length - 1 ? `1px solid ${p.dividerColor}33` : 'none' }}>
            {item.icon && (
              <div style={{ marginBottom: 8 }}>
                {isImageUrl(item.icon)
                  ? <img src={item.icon} alt="" style={{ width: p.iconSize ?? 28, height: p.iconSize ?? 28, display: 'block', margin: (p.contentAlignment ?? 'center') === 'center' ? '0 auto' : (p.contentAlignment === 'right' ? '0 0 0 auto' : '0') }} />
                  : <span style={{ fontSize: p.iconSize ?? 28, lineHeight: 1 }}>{item.icon}</span>}
              </div>
            )}
            <div style={{ fontFamily: fontStack(p.valueFontFamily), fontSize: p.valueFontSize, fontWeight: p.valueFontWeight ?? '800', color: p.valueColor, lineHeight: 1.1, marginBottom: 6 }}>{item.value}</div>
            <div style={{ fontFamily: fontStack(p.labelFontFamily), fontSize: p.labelFontSize, color: p.labelColor, lineHeight: 1.4 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
