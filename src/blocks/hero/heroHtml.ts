import type { HeroProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { nl2br } from '../../utils/nl2br'
import { escapeHtml, escapeAttr, escapeSafeUrl, escapeImageUrl } from '../../utils/escapeHtml'

export function heroHtml(p: HeroProps): string {
  const align = p.contentAlignment
  const hasImage = !!p.backgroundImage
  const bgPosition = p.backgroundPosition ?? 'center center'
  const bgStyle = hasImage
    ? `background-image: url('${escapeImageUrl(p.backgroundImage)}'); background-size: cover; background-position: ${bgPosition}; background-color: #1a1a2e;`
    : 'background-color: #1a1a2e;'

  const lineHeight = p.headlineLineHeight ?? 1.15
  const letterSpacing = p.headlineLetterSpacing ?? 0
  const subtitleLineHeight = p.subtitleLineHeight ?? 1.6
  const subtitleLetterSpacing = p.subtitleLetterSpacing ?? 0
  const ctaFontSize = p.ctaFontSize ?? 16
  const ctaFontWeight = p.ctaFontWeight ?? '700'
  const ctaPaddingV = p.ctaPaddingV ?? 14
  const ctaPaddingH = p.ctaPaddingH ?? 36
  const ctaAlign = p.ctaAlignment ?? align

  const vmlStart = hasImage
    ? `<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;"><v:fill type="frame" src="${escapeAttr(p.backgroundImage)}" color="#1a1a2e"/><v:textbox inset="0,0,0,0"><div><![endif]-->`
    : ''
  const vmlEnd = hasImage
    ? `<!--[if gte mso 9]></div></v:textbox></v:rect><![endif]-->`
    : ''

  const badge = p.badge
    ? `<tr><td align="${align}" style="padding-bottom:16px;">
        <span style="display:inline-block; background-color:${p.badgeColor}; color:#ffffff; font-family:${fontStack(p.headlineFontFamily)}; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border-radius:20px; mso-padding-alt:5px 14px;">${escapeHtml(p.badge)}</span>
       </td></tr>`
    : ''

  const headline = `<tr><td align="${align}" style="padding-bottom:16px;">
    <h1 class="mobile-font-lg" style="margin:0; font-family:${fontStack(p.headlineFontFamily)}; font-size:${p.headlineFontSize}px; font-weight:${p.headlineFontWeight}; color:${p.headlineColor}; line-height:${lineHeight};${letterSpacing > 0 ? ` letter-spacing:${letterSpacing}px;` : ''} mso-line-height-rule:exactly;">${nl2br(p.headline)}</h1>
  </td></tr>`

  const subtitle = p.subtitle
    ? `<tr><td align="${align}" style="padding-bottom:28px;">
        <p style="margin:0; font-family:${fontStack(p.subtitleFontFamily)}; font-size:${p.subtitleFontSize}px; color:${p.subtitleColor}; line-height:${subtitleLineHeight};${subtitleLetterSpacing > 0 ? ` letter-spacing:${subtitleLetterSpacing}px;` : ''} mso-line-height-rule:exactly;">${nl2br(p.subtitle)}</p>
       </td></tr>`
    : ''

  const cta = p.ctaText
    ? `<tr><td align="${ctaAlign}">
        <a href="${escapeSafeUrl(p.ctaUrl || '#')}" style="display:inline-block; font-family:${fontStack(p.headlineFontFamily)}; font-size:${ctaFontSize}px; font-weight:${ctaFontWeight}; color:${p.ctaTextColor}; background-color:${p.ctaBackgroundColor}; padding:${ctaPaddingV}px ${ctaPaddingH}px; border-radius:${p.ctaBorderRadius}px; text-decoration:none; mso-padding-alt:${ctaPaddingV}px ${ctaPaddingH}px;">${escapeHtml(p.ctaText)}</a>
       </td></tr>`
    : ''

  const content = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${badge}
    ${headline}
    ${subtitle}
    ${cta}
  </table>`

  return `
<tr>
  <td>
    ${vmlStart}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
      style="min-height:${p.minHeight}px; ${bgStyle}">
      <tr>
        <td class="mobile-padding" bgcolor="#1a1a2e" style="padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
          ${content}
        </td>
      </tr>
    </table>
    ${vmlEnd}
  </td>
</tr>`
}
