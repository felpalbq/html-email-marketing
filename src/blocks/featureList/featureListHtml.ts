import type { FeatureListProps, FeatureItem } from '../types'
import { fontStack } from '../../utils/fonts'
import { nl2br } from '../../utils/nl2br'

function featureCell(f: FeatureItem, p: FeatureListProps, width: number): string {
  const titleLineHeight = p.titleLineHeight ?? 1.3
  const titleLetterSpacing = p.titleLetterSpacing ?? 0
  const descLineHeight = p.descriptionLineHeight ?? 1.55
  const descLetterSpacing = p.descriptionLetterSpacing ?? 0

  const icon = f.icon.startsWith('http') || f.icon.startsWith('/')
    ? `<img src="${f.icon}" alt="" width="${p.iconSize}" height="${p.iconSize}" style="display:block;" border="0">`
    : `<span style="font-size:${p.iconSize}px; line-height:1;">${f.icon}</span>`

  return `<td class="mobile-col" width="${width}" valign="top" style="width:${width}px; padding-bottom:28px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="top" style="padding-right:14px;">${icon}</td>
        <td valign="top">
          <div style="font-family:${fontStack(p.titleFontFamily)}; font-size:${p.titleFontSize}px; font-weight:700; color:${p.titleColor}; margin-bottom:6px; line-height:${titleLineHeight}; mso-line-height-rule:exactly;${titleLetterSpacing > 0 ? ` letter-spacing:${titleLetterSpacing}px;` : ''}">${f.title}</div>
          <div style="font-family:${fontStack(p.descriptionFontFamily)}; font-size:${p.descriptionFontSize}px; color:${p.descriptionColor}; line-height:${descLineHeight}; mso-line-height-rule:exactly;${descLetterSpacing > 0 ? ` letter-spacing:${descLetterSpacing}px;` : ''}">${nl2br(f.description)}</div>
        </td>
      </tr>
    </table>
  </td>`
}

export function featureListHtml(p: FeatureListProps): string {
  const cols = p.columns
  const gap = 24
  const cellWidth = cols === 2 ? Math.floor((520 - gap) / 2) : 520

  const rows: FeatureItem[][] = []
  for (let i = 0; i < p.features.length; i += cols) {
    rows.push(p.features.slice(i, i + cols))
  }

  const rowsHtml = rows.map(row => {
    const cells = row.map((f, i) => {
      const spacer = cols === 2 && i === 0 ? `<td class="mobile-spacer" width="${gap}" style="width:${gap}px;"></td>` : ''
      return featureCell(f, p, cellWidth) + spacer
    }).join('\n')
    return `<tr>${cells}</tr>`
  }).join('\n')

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${rowsHtml}
    </table>
  </td>
</tr>`
}
