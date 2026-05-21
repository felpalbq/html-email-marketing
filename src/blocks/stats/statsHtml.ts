import type { StatsProps, StatItem } from '../types'
import { fontStack } from '../../utils/fonts'

function statCell(item: StatItem, p: StatsProps, width: number, showDivider: boolean): string {
  const sz = p.iconSize ?? 28
  const icon = item.icon
    ? (item.icon.startsWith('http') || item.icon.startsWith('/'))
      ? `<div style="text-align:center; margin-bottom:8px;"><img src="${item.icon}" alt="" width="${sz}" height="${sz}" border="0" style="display:inline-block;width:${sz}px;height:${sz}px;"></div>`
      : `<div style="font-size:${sz}px; line-height:1; margin-bottom:8px;">${item.icon}</div>`
    : ''

  const divider = showDivider
    ? `<td width="1" style="width:1px; background-color:${p.dividerColor}33; font-size:0; line-height:0;">&nbsp;</td>`
    : ''

  return `<td class="mobile-col" width="${width}" valign="middle" style="width:${width}px; text-align:center; padding:0 8px; padding-bottom:16px;">
    ${icon}
    <div style="font-family:${fontStack(p.valueFontFamily)}; font-size:${p.valueFontSize}px; font-weight:${p.valueFontWeight ?? '800'}; color:${p.valueColor}; line-height:1.1; mso-line-height-rule:exactly; margin-bottom:6px;">${item.value}</div>
    <div style="font-family:${fontStack(p.labelFontFamily)}; font-size:${p.labelFontSize}px; color:${p.labelColor}; line-height:1.4; mso-line-height-rule:exactly;">${item.label}</div>
  </td>${divider}`
}

export function statsHtml(p: StatsProps): string {
  const count = p.items.length
  const gap = p.showDivider ? 1 : 0
  const cellWidth = Math.floor((520 - gap * (count - 1)) / count)

  const cells = p.items.map((item, i) =>
    statCell(item, p, cellWidth, p.showDivider && i < count - 1)
  ).join('\n')

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>${cells}</tr>
    </table>
  </td>
</tr>`
}
