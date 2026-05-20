import type { CtaBannerProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function ctaBannerHtml(p: CtaBannerProps): string {
  const badge = p.badge
    ? `<div style="margin-bottom:12px;"><span style="display:inline-block; background-color:${p.badgeColor}; color:${p.badgeTextColor}; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:4px 12px; border-radius:20px;">${p.badge}</span></div>`
    : ''

  const textBlock = `
    ${badge}
    <h2 style="margin:0 0 12px; font-family:${fontStack(p.headlineFontFamily)}; font-size:${p.headlineFontSize}px; font-weight:800; color:${p.headlineColor}; line-height:1.2;">${p.headline}</h2>
    <p style="margin:0 0 24px; font-family:${fontStack(p.bodyFontFamily)}; font-size:16px; color:${p.bodyColor}; line-height:1.6;">${p.bodyText}</p>
    <a href="${p.ctaUrl}" style="display:inline-block; background-color:${p.ctaBackgroundColor}; color:${p.ctaTextColor}; font-family:${fontStack(p.headlineFontFamily)}; font-size:16px; font-weight:700; padding:14px 32px; border-radius:${p.ctaBorderRadius}px; text-decoration:none;">${p.ctaText}</a>`

  const img = p.image
    ? `<img class="mobile-img" src="${p.image}" alt="${p.imageAlt}" width="220" style="display:block; width:220px; height:auto; border-radius:8px;" border="0">`
    : `<div style="width:100%; max-width:220px; height:200px; background-color:rgba(255,255,255,0.1); border-radius:8px;"></div>`

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
  const imgTd = `<td class="mobile-col" valign="middle" align="center" width="240" style="width:240px; padding-bottom:16px;">${img}</td>`

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
