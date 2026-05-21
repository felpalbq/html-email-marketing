import type { SectionHeaderProps } from '../types'
import { fontStack } from '../../utils/fonts'

function renderText(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
  ))
}

export function SectionHeaderBlock({ props: p }: { props: SectionHeaderProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, textAlign: p.alignment }}>
      {p.subtitle && (
        <p style={{
          margin: '0 0 6px',
          fontFamily: fontStack(p.subtitleFontFamily),
          fontSize: p.subtitleFontSize,
          color: p.subtitleColor,
          lineHeight: p.subtitleLineHeight ?? 1.4,
          letterSpacing: `${p.subtitleLetterSpacing ?? 0}px`,
          whiteSpace: 'pre-wrap',
        }}>
          {renderText(p.subtitle)}
        </p>
      )}
      <h2 style={{
        margin: 0,
        fontFamily: fontStack(p.titleFontFamily),
        fontSize: p.titleFontSize,
        fontWeight: p.titleFontWeight,
        color: p.titleColor,
        lineHeight: p.titleLineHeight ?? 1.2,
        letterSpacing: `${p.titleLetterSpacing ?? 0}px`,
        whiteSpace: 'pre-wrap',
      }}>
        {renderText(p.title || 'Section Title')}
      </h2>
    </div>
  )
}
