import type { FooterProps } from '../types'
import { fontStack } from '../../utils/fonts'

const SOCIAL_ICONS: Record<string, string> = {
  instagram: 'IG',
  facebook: 'FB',
  twitter: 'TW',
  tiktok: 'TK',
  youtube: 'YT',
  linkedin: 'LI',
}

export function footerHtml(p: FooterProps): string {
  const logo = p.logo
    ? `<a href="#" style="text-decoration:none;"><img src="${p.logo}" alt="${p.logoAlt}" style="display:block; max-width:${p.logoMaxWidth}px; height:auto; margin:0 auto 12px;" border="0"></a>`
    : `<div style="font-family:${fontStack(p.fontFamily)}; font-size:20px; font-weight:800; color:${p.linkColor}; text-align:center; margin-bottom:12px;">${p.logoAlt}</div>`

  const tagline = p.tagline
    ? `<p style="margin:0 0 20px; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize}px; color:${p.textColor}; text-align:center; line-height:1.5;">${p.tagline}</p>`
    : ''

  const socialLinks = p.socialLinks.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
        <tr>
          ${p.socialLinks.map(s =>
            `<td style="padding:0 6px;">
              <a href="${s.url}" style="display:inline-block; background-color:#374151; color:${p.linkColor}; font-family:${fontStack(p.fontFamily)}; font-size:11px; font-weight:700; width:32px; height:32px; line-height:32px; text-align:center; text-decoration:none; border-radius:50%;">${SOCIAL_ICONS[s.platform] || s.platform.slice(0, 2).toUpperCase()}</a>
            </td>`).join('\n')}
        </tr>
      </table>`
    : ''

  const links = p.links.length
    ? `<p style="margin:0 0 12px; text-align:center;">${p.links.map(l =>
        `<a href="${l.url}" style="font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize}px; color:${p.linkColor}; text-decoration:underline; margin:0 8px;">${l.label}</a>`
      ).join('<span style="color:#4b5563;">|</span>')}</p>`
    : ''

  const address = p.addressText
    ? `<p style="margin:0 0 8px; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize - 1}px; color:${p.textColor}; text-align:center;">${p.addressText}</p>`
    : ''

  const unsub = p.unsubscribeText
    ? `<p style="margin:0; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize - 1}px; color:${p.textColor}; text-align:center;">
        <a href="${p.unsubscribeUrl}" style="color:${p.textColor}; text-decoration:underline;">${p.unsubscribeText}</a>
       </p>`
    : ''

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    ${logo}
    ${tagline}
    ${socialLinks}
    ${links}
    ${address}
    ${unsub}
  </td>
</tr>`
}
