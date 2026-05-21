import type { SocialProofProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { escapeHtml, escapeAttr, escapeSafeUrl } from '../../utils/escapeHtml'

export function socialProofHtml(p: SocialProofProps): string {
  const cols = p.columns
  const gap = 4
  const imgWidth = Math.floor((520 - gap * (cols - 1)) / cols)

  const rows: typeof p.images[] = []
  for (let i = 0; i < p.images.length; i += cols) {
    rows.push(p.images.slice(i, i + cols) as typeof p.images)
  }

  const rowsHtml = rows.map(row => {
    const cells = row.map((img, i) => {
      const spacer = i < row.length - 1 ? `<td class="mobile-spacer" width="${gap}" style="width:${gap}px;"></td>` : ''
      const content = img.url
        ? `<img class="mobile-img" src="${escapeAttr(img.url)}" alt="${escapeAttr(img.alt || '')}" width="${imgWidth}" height="${imgWidth}" style="display:block; width:${imgWidth}px; height:${imgWidth}px; object-fit:cover;" border="0">`
        : `<div style="width:${imgWidth}px; height:${imgWidth}px; background-color:#e5e7eb;"></div>`
      return `<td class="mobile-col" width="${imgWidth}" style="padding-bottom:${gap}px;">${content}</td>${spacer}`
    }).join('\n')
    return `<tr>${cells}</tr>`
  }).join('\n')

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px; text-align:center;">
    <h3 style="margin:0 0 8px; font-family:${fontStack(p.titleFontFamily)}; font-size:26px; font-weight:700; color:${p.titleColor};">${escapeHtml(p.title)}</h3>
    <p style="margin:0 0 24px; font-family:${fontStack(p.titleFontFamily)}; font-size:14px; color:#9ca3af;">${escapeHtml(p.subtitle)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${rowsHtml}
    </table>
    <a href="${escapeSafeUrl(p.ctaUrl || '#')}" style="display:inline-block; background-color:${p.ctaBackgroundColor}; color:${p.ctaTextColor}; font-family:${fontStack(p.titleFontFamily)}; font-size:15px; font-weight:700; padding:13px 32px; border-radius:6px; text-decoration:none;">${escapeHtml(p.ctaText)}</a>
  </td>
</tr>`
}
