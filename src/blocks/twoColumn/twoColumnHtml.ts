import type { TwoColumnProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { nl2br } from '../../utils/nl2br'
import { escapeHtml, escapeAttr, escapeSafeUrl } from '../../utils/escapeHtml'

export function twoColumnHtml(p: TwoColumnProps): string {
  const isTextLeft = (p.layout ?? 'text-left') === 'text-left'
  const imgWidth = p.imageWidth ?? 260
  const ctaFontSize = p.ctaFontSize ?? 15
  const ctaFontWeight = p.ctaFontWeight ?? '700'
  const ctaPaddingV = p.ctaPaddingV ?? 13
  const ctaPaddingH = p.ctaPaddingH ?? 28
  const titleLineHeight = p.titleLineHeight ?? 1.2
  const titleLetterSpacing = p.titleLetterSpacing ?? 0
  const bodyLineHeight = p.bodyLineHeight ?? 1.7
  const bodyLetterSpacing = p.bodyLetterSpacing ?? 0
  const vAlign = p.verticalAlign ?? 'middle'
  const textWidth = 520 - imgWidth - 32

  const badge = p.badge
    ? `<div style="margin-bottom:10px;"><span style="display:inline-block; background-color:${p.badgeColor}; color:${p.badgeTextColor}; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:4px 12px; border-radius:20px;">${escapeHtml(p.badge)}</span></div>`
    : ''

  const textBlock = `
    ${badge}
    <h2 style="margin:0 0 14px; font-family:${fontStack(p.titleFontFamily)}; font-size:${p.titleFontSize}px; font-weight:${p.titleFontWeight ?? '700'}; color:${p.titleColor}; line-height:${titleLineHeight}; mso-line-height-rule:exactly;${titleLetterSpacing > 0 ? ` letter-spacing:${titleLetterSpacing}px;` : ''}">${nl2br(p.title)}</h2>
    <p style="margin:0 0 24px; font-family:${fontStack(p.bodyFontFamily)}; font-size:${p.bodyFontSize ?? 15}px; color:${p.bodyColor}; line-height:${bodyLineHeight}; mso-line-height-rule:exactly;${bodyLetterSpacing > 0 ? ` letter-spacing:${bodyLetterSpacing}px;` : ''}">${nl2br(p.bodyText)}</p>
    ${p.ctaText ? `<a href="${escapeSafeUrl(p.ctaUrl || '#')}" style="display:inline-block; background-color:${p.ctaBackgroundColor}; color:${p.ctaTextColor}; font-family:${fontStack(p.titleFontFamily)}; font-size:${ctaFontSize}px; font-weight:${ctaFontWeight}; padding:${ctaPaddingV}px ${ctaPaddingH}px; border-radius:${p.ctaBorderRadius ?? 6}px; text-decoration:none; mso-padding-alt:${ctaPaddingV}px ${ctaPaddingH}px;">${escapeHtml(p.ctaText)}</a>` : ''}`

  const img = p.image
    ? `<img class="mobile-img" src="${escapeAttr(p.image)}" alt="${escapeAttr(p.imageAlt || '')}" width="${imgWidth}" style="display:block; width:${imgWidth}px; height:auto; border-radius:${p.imageBorderRadius ?? 8}px;" border="0">`
    : `<div style="width:100%; height:220px; background-color:#e5e7eb; border-radius:${p.imageBorderRadius ?? 8}px;"></div>`

  const textTd = `<td class="mobile-col" width="${textWidth}" valign="${vAlign}" style="width:${textWidth}px; padding:${isTextLeft ? '0 32px 0 0' : '0 0 0 32px'};">${textBlock}</td>`
  const imgTd = `<td class="mobile-col mobile-top-gap" width="${imgWidth}" valign="${vAlign}" style="width:${imgWidth}px; padding-bottom:16px;">${img}</td>`

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}"
    style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${isTextLeft ? textTd + imgTd : imgTd + textTd}
      </tr>
    </table>
  </td>
</tr>`
}
