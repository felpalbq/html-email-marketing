import type { ComparisonTableProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function comparisonTableHtml(p: ComparisonTableProps): string {
  const cols = p.columns
  const totalCols = cols.length + 1 // +1 for the feature label column
  const colPct = Math.floor(100 / totalCols)
  const labelPct = 100 - colPct * cols.length

  const headerCells = [
    `<td width="${labelPct}%" style="width:${labelPct}%; padding:12px 8px; font-family:${fontStack(p.titleFontFamily)}; font-size:13px; font-weight:700; color:#9ca3af;"></td>`,
    ...cols.map(col => `
      <td width="${colPct}%" align="center"
        style="width:${colPct}%; padding:12px 8px; background-color:${col.isHighlight ? col.highlightColor : 'transparent'}; border-radius:${col.isHighlight ? '8px 8px 0 0' : '0'};">
        <div style="font-family:${fontStack(p.titleFontFamily)}; font-size:14px; font-weight:700; color:${col.isHighlight ? '#ffffff' : '#374151'}; text-align:center;">${col.label}</div>
      </td>`)
  ].join('\n')

  const dataRows = p.rows.map((row, ri) => {
    const bg = ri % 2 === 0 ? '#f9fafb' : '#ffffff'
    const valueCells = cols.map(col => {
      const val = row.values[col.id]
      let content = ''
      if (val === true || val === 'true') {
        content = `<span style="color:${p.checkColor}; font-size:18px; font-weight:700;">✓</span>`
      } else if (val === false || val === 'false' || val === undefined) {
        content = `<span style="color:${p.crossColor}; font-size:18px;">✕</span>`
      } else {
        content = `<span style="font-size:13px; color:#374151;">${val}</span>`
      }
      return `<td align="center" style="padding:12px 8px; background-color:${col.isHighlight ? 'rgba(99,102,241,0.05)' : bg};">${content}</td>`
    }).join('\n')

    return `<tr>
      <td style="padding:12px 8px; background-color:${bg}; font-family:${fontStack(p.titleFontFamily)}; font-size:14px; color:#374151;">${row.feature}</td>
      ${valueCells}
    </tr>`
  }).join('\n')

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <h3 style="margin:0 0 24px; font-family:${fontStack(p.titleFontFamily)}; font-size:28px; font-weight:700; color:${p.titleColor}; text-align:center;">${p.title}</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
      style="border-collapse:collapse; table-layout:fixed;">
      <tr>${headerCells}</tr>
      ${dataRows}
    </table>
  </td>
</tr>`
}
