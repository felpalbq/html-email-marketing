import type { HeroProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { hexToRgba } from '../../utils/colorUtils'

export function heroHtml(p: HeroProps): string {
  const align = p.contentAlignment
  const overlayBg = p.overlayOpacity > 0 ? hexToRgba(p.overlayColor, p.overlayOpacity / 100) : 'transparent'
  const hasImage = !!p.backgroundImage
  const bgStyle = hasImage
    ? `background-image: url('${p.backgroundImage}'); background-size: cover; background-position: center; background-color: #1a1a2e;`
    : 'background-color: #1a1a2e;'

  const badge = p.badge
    ? `<tr><td align="${align}" style="padding-bottom:16px;">
        <span style="display:inline-block; background-color:${p.badgeColor}; color:#ffffff; font-family:${fontStack(p.headlineFontFamily)}; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border-radius:20px;">${p.badge}</span>
       </td></tr>`
    : ''

  const headline = `<tr><td align="${align}" style="padding-bottom:16px;">
    <h1 class="mobile-font-lg" style="margin:0; font-family:${fontStack(p.headlineFontFamily)}; font-size:${p.headlineFontSize}px; font-weight:${p.headlineFontWeight}; color:${p.headlineColor}; line-height:1.15;">${p.headline}</h1>
  </td></tr>`

  const subtitle = p.subtitle
    ? `<tr><td align="${align}" style="padding-bottom:28px;">
        <p style="margin:0; font-family:${fontStack(p.subtitleFontFamily)}; font-size:${p.subtitleFontSize}px; color:${p.subtitleColor}; line-height:1.6;">${p.subtitle}</p>
       </td></tr>`
    : ''

  const cta = p.ctaText
    ? `<tr><td align="${align}">
        <a href="${p.ctaUrl}" style="display:inline-block; font-family:${fontStack(p.headlineFontFamily)}; font-size:16px; font-weight:700; color:${p.ctaTextColor}; background-color:${p.ctaBackgroundColor}; padding:14px 36px; border-radius:${p.ctaBorderRadius}px; text-decoration:none;">${p.ctaText}</a>
       </td></tr>`
    : ''

  const vmlStart = hasImage
    ? `<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;"><v:fill type="frame" src="${p.backgroundImage}" color="#1a1a2e"/><v:textbox inset="0,0,0,0"><div><![endif]-->`
    : ''
  const vmlEnd = hasImage
    ? `<!--[if gte mso 9]></div></v:textbox></v:rect><![endif]-->`
    : ''

  return `
<tr>
  <td>
    ${vmlStart}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
      style="min-height:${p.minHeight}px; ${bgStyle}">
      <tr>
        <td class="mobile-padding" style="background-color:${overlayBg}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${badge}
            ${headline}
            ${subtitle}
            ${cta}
          </table>
        </td>
      </tr>
    </table>
    ${vmlEnd}
  </td>
</tr>`
}
