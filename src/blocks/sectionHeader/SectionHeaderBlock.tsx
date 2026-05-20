import type { SectionHeaderProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function SectionHeaderBlock({ props: p }: { props: SectionHeaderProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, textAlign: p.alignment }}>
      {p.subtitle && (
        <p style={{ margin: '0 0 6px', fontFamily: fontStack(p.subtitleFontFamily), fontSize: p.subtitleFontSize, color: p.subtitleColor }}>
          {p.subtitle}
        </p>
      )}
      <h2 style={{ margin: 0, fontFamily: fontStack(p.titleFontFamily), fontSize: p.titleFontSize, fontWeight: p.titleFontWeight, color: p.titleColor, lineHeight: 1.2 }}>
        {p.title || 'Section Title'}
      </h2>
    </div>
  )
}
