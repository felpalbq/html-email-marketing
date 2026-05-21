import type { TrustBadgesProps, TrustBadgeItem } from '../types'
import { fontStack } from '../../utils/fonts'

function badgeCell(item: TrustBadgeItem, p: TrustBadgesProps, width: number): string {
  const iconHtml = !item.icon
    ? ''
    : item.icon.startsWith('http') || item.icon.startsWith('/')
      ? `<img src="${item.icon}" alt="" width="${p.iconSize ?? 32}" height="${p.iconSize ?? 32}" style="display:inline-block;" border="0"><br>`
      : `<span style="font-size:${p.iconSize ?? 32}px; line-height:1;">${item.icon}</span><br>`

  const subtitle = item.subtitle
    ? `<div style="font-family:${fontStack(p.subtitleFontFamily)}; font-size:${p.subtitleFontSize}px; color:${p.subtitleColor}; margin-top:2px;">${item.subtitle}</div>`
    : ''

  return `<td class="mobile-col" width="${width}" valign="top" align="${p.alignment}" style="width:${width}px; text-align:${p.alignment}; padding:12px 8px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${p.alignment}">
      <tr>
        <td align="${p.alignment}" style="padding-bottom:8px;">${iconHtml}</td>
      </tr>
      <tr>
        <td align="${p.alignment}">
          <div style="font-family:${fontStack(p.titleFontFamily)}; font-size:${p.titleFontSize}px; font-weight:700; color:${p.titleColor};">${item.title}</div>
          ${subtitle}
        </td>
      </tr>
    </table>
  </td>`
}

export function trustBadgesHtml(p: TrustBadgesProps): string {
  const cols = p.columns ?? 4
  const gap = 16
  const cellWidth = Math.floor((520 - gap * (cols - 1)) / cols)

  const rows: TrustBadgeItem[][] = []
  for (let i = 0; i < p.items.length; i += cols) {
    rows.push(p.items.slice(i, i + cols))
  }

  const rowsHtml = rows.map(row => {
    const cells = row.map((item, i) => {
      const spacer = i < row.length - 1 ? `<td class="mobile-spacer" width="${gap}" style="width:${gap}px;"></td>` : ''
      return badgeCell(item, p, cellWidth) + spacer
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
