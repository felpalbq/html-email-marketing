import type { ComparisonTableProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function ComparisonTableBlock({ props: p }: { props: ComparisonTableProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      <h3 style={{ margin: '0 0 24px', fontFamily: fontStack(p.titleFontFamily), fontSize: 26, fontWeight: 700, color: p.titleColor, textAlign: 'center' }}>{p.title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px 8px', textAlign: 'left', fontSize: 13, color: '#9ca3af' }}></th>
            {p.columns.map(col => (
              <th key={col.id} style={{ padding: '10px 8px', textAlign: 'center', backgroundColor: col.isHighlight ? col.highlightColor : 'transparent', borderRadius: col.isHighlight ? '6px 6px 0 0' : 0 }}>
                <span style={{ fontFamily: fontStack(p.titleFontFamily), fontSize: 13, fontWeight: 700, color: col.isHighlight ? '#fff' : '#374151' }}>{col.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {p.rows.map((row, ri) => (
            <tr key={row.id} style={{ backgroundColor: ri % 2 === 0 ? '#f9fafb' : '#fff' }}>
              <td style={{ padding: '10px 8px', fontFamily: fontStack(p.titleFontFamily), fontSize: 13, color: '#374151' }}>{row.feature}</td>
              {p.columns.map(col => {
                const val = row.values[col.id]
                return (
                  <td key={col.id} style={{ padding: '10px 8px', textAlign: 'center' }}>
                    {val === true || val === 'true' ? <span style={{ color: p.checkColor, fontWeight: 700 }}>✓</span>
                     : val === false || val === 'false' || val === undefined ? <span style={{ color: p.crossColor }}>✕</span>
                     : <span style={{ fontSize: 12 }}>{val as string}</span>}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
