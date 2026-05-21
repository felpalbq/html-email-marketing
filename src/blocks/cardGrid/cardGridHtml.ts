import type { CardGridProps, CardItem } from '../types'
import { fontStack } from '../../utils/fonts'
import { escapeHtml, escapeAttr, escapeSafeUrl } from '../../utils/escapeHtml'

function cardHtml(card: CardItem, width: number, props: CardGridProps): string {
  const titleLineHeight = props.titleLineHeight ?? 1.3
  const descLineHeight = props.descriptionLineHeight ?? 1.5
  const imgHeight = card.imageHeight ?? 180

  const badge = card.badge
    ? `<div style="margin-bottom:10px;"><span style="display:inline-block; background-color:${card.badgeColor}; color:#ffffff; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:3px 10px; border-radius:20px;">${escapeHtml(card.badge)}</span></div>`
    : ''

  const img = card.image
    ? `<img class="mobile-img" src="${escapeAttr(card.image)}" alt="${escapeAttr(card.imageAlt || '')}" width="${width}" style="display:block; width:${width}px; height:auto; border-radius:${card.borderRadius}px ${card.borderRadius}px 0 0;" border="0">`
    : `<div style="width:100%; height:${imgHeight}px; background-color:#e5e7eb; border-radius:${card.borderRadius}px ${card.borderRadius}px 0 0;"></div>`

  const cta = card.ctaText
    ? `<div style="margin-top:16px;"><a href="${escapeSafeUrl(card.ctaUrl || '#')}" style="display:inline-block; background-color:${card.ctaBackgroundColor}; color:${card.ctaTextColor}; font-size:14px; font-weight:600; padding:10px 22px; border-radius:4px; text-decoration:none;">${escapeHtml(card.ctaText)}</a></div>`
    : ''

  return `<td class="mobile-col" width="${width}" valign="top" style="width:${width}px; padding-bottom:16px;">
    <table role="presentation" class="mobile-full" width="${width}" cellpadding="0" cellspacing="0" border="0"
      style="background-color:${card.cardBackgroundColor}; border-radius:${card.borderRadius}px; overflow:hidden; width:${width}px;">
      <tr><td style="padding:0;">${img}</td></tr>
      <tr><td style="padding:16px 16px 20px;">
        ${badge}
        <div style="font-family:${fontStack(props.titleFontFamily)}; font-size:${props.titleFontSize}px; font-weight:700; color:${props.titleColor}; margin-bottom:8px; line-height:${titleLineHeight}; mso-line-height-rule:exactly;">${escapeHtml(card.title)}</div>
        <div style="font-family:${fontStack(props.descriptionFontFamily)}; font-size:${props.descriptionFontSize}px; color:${props.descriptionColor}; line-height:${descLineHeight}; mso-line-height-rule:exactly;">${escapeHtml(card.description)}</div>
        ${cta}
      </td></tr>
    </table>
  </td>`
}

export function cardGridHtml(p: CardGridProps): string {
  const gap = p.columnGap
  const cols = p.columns
  const totalGap = gap * (cols - 1)
  const cardWidth = Math.floor((600 - 80 - totalGap) / cols)

  const rows: CardItem[][] = []
  for (let i = 0; i < p.cards.length; i += cols) {
    rows.push(p.cards.slice(i, i + cols))
  }

  const rowsHtml = rows.map(row => {
    const cells = row.map((card, i) => {
      const spacer = i < row.length - 1
        ? `<td class="mobile-spacer" width="${gap}" style="width:${gap}px;"></td>`
        : ''
      return cardHtml(card, cardWidth, p) + spacer
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
