import type { CtaBannerProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { nl2br } from '../../utils/nl2br'

export function ctaBannerHtml(p: CtaBannerProps): string {
  const headlineLineHeight = p.headlineLineHeight ?? 1.2
  const headlineLetterSpacing = p.headlineLetterSpacing ?? 0
  const bodyLineHeight = p.bodyLineHeight ?? 1.6
  const bodyFontSize = p.bodyFontSize ?? 16
  const imageWidth = p.imageWidth ?? 220
  const imageAlignment = p.imageAlignment ?? 'center'
  const ctaFontSize = p.ctaFontSize ?? 16
  const ctaFontWeight = p.ctaFontWeight ?? '700'
  const ctaPaddingV = p.ctaPaddingV ?? 14
  const ctaPaddingH = p.ctaPaddingH ?? 28

  const badge = p.badge
    ? `<div style="margin-bottom:12px;"><span style="display:inline-block; background-color:${p.badgeColor}; color:${p.badgeTextColor}; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:4px 12px; border-radius:20px;">${p.badge}</span></div>`
    : ''

  const textBlock = `
    ${badge}
    <h2 style="margin:0 0 12px; font-family:${fontStack(p.headlineFontFamily)}; font-size:${p.headlineFontSize}px; font-weight:800; color:${p.headlineColor}; line-height:${headlineLineHeight}; mso-line-height-rule:exactly;${headlineLetterSpacing > 0 ? ` letter-spacing:${headlineLetterSpacing}px;` : ''}">${nl2br(p.headline)}</h2>
    <p style="margin:0 0 24px; font-family:${fontStack(p.bodyFontFamily)}; font-size:${bodyFontSize}px; color:${p.bodyColor}; line-height:${bodyLineHeight}; mso-line-height-rule:exactly;">${nl2br(p.bodyText)}</p>
    ${p.ctaText ? `<a href="${p.ctaUrl}" style="display:inline-block; background-color:${p.ctaBackgroundColor}; color:${p.ctaTextColor}; font-family:${fontStack(p.headlineFontFamily)}; font-size:${ctaFontSize}px; font-weight:${ctaFontWeight}; padding:${ctaPaddingV}px ${ctaPaddingH}px; border-radius:${p.ctaBorderRadius}px; text-decoration:none; mso-padding-alt:${ctaPaddingV}px ${ctaPaddingH}px;">${p.ctaText}</a>` : ''}`

  const img = p.image
    ? `<img class="mobile-img" src="${p.image}" alt="${p.imageAlt}" width="${imageWidth}" style="display:block; width:${imageWidth}px; height:auto; border-radius:8px;" border="0">`
    : `<div style="width:100%; max-width:${imageWidth}px; height:200px; background-color:rgba(255,255,255,0.1); border-radius:8px;"></div>`

  if (p.layout === 'centered') {
    return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" align="center"
    style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px; text-align:center;">
    ${textBlock}
  </td>
</tr>`
  }

  const isImageRight = p.layout === 'image-right'
  const textTd = `<td class="mobile-col" valign="middle" style="padding:${isImageRight ? '0 32px 0 0' : '0 0 0 32px'};">${textBlock}</td>`
  const imgTd = `<td class="mobile-col" valign="middle" align="${imageAlignment}" width="${imageWidth + 20}" style="width:${imageWidth + 20}px; padding-bottom:16px;">${img}</td>`

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}"
    style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${isImageRight ? textTd + imgTd : imgTd + textTd}
      </tr>
    </table>
  </td>
</tr>`
}
