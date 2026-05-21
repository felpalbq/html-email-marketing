import type { FooterProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { escapeHtml, escapeAttr, escapeSafeUrl } from '../../utils/escapeHtml'

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
    ? `<a href="#" style="text-decoration:none;"><img src="${escapeAttr(p.logo)}" alt="${escapeAttr(p.logoAlt || '')}" style="display:block; max-width:${p.logoMaxWidth}px; height:auto; margin:0 auto 12px;" border="0"></a>`
    : `<div style="font-family:${fontStack(p.fontFamily)}; font-size:20px; font-weight:800; color:${p.linkColor}; text-align:center; margin-bottom:12px;">${escapeHtml(p.logoAlt || '')}</div>`

  const tagline = p.tagline
    ? `<p style="margin:0 0 20px; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize}px; color:${p.textColor}; text-align:center; line-height:1.5;">${escapeHtml(p.tagline)}</p>`
    : ''

  const socialLinks = p.socialLinks.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
        <tr>
          ${p.socialLinks.map(s => {
            const size = s.iconSize ?? 32
            const iconContent = s.icon
              ? `<img src="${escapeAttr(s.icon)}" alt="${escapeAttr(s.platform)}" width="${size}" height="${size}" style="display:block; width:${size}px; height:${size}px; border-radius:50%;" border="0">`
              : `<span style="font-family:${fontStack(p.fontFamily)}; font-size:11px; font-weight:700; color:${p.linkColor}; line-height:${size}px;">${SOCIAL_ICONS[s.platform] || escapeHtml(s.platform.slice(0, 2).toUpperCase())}</span>`
            const iconBg = s.icon ? 'rgba(0,0,0,0)' : (p.socialIconBgColor ?? '#374151')
            return `<td style="padding:0 6px;">
              <a href="${escapeSafeUrl(s.url || '#')}" style="display:inline-block; background-color:${iconBg}; width:${size}px; height:${size}px; line-height:${size}px; text-align:center; text-decoration:none; border-radius:50%; overflow:hidden;">${iconContent}</a>
            </td>`
          }).join('\n')}
        </tr>
      </table>`
    : ''

  const links = p.links.length
    ? `<p style="margin:0 0 12px; text-align:center;">${p.links.map(l =>
        `<a href="${escapeSafeUrl(l.url || '#')}" style="font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize}px; color:${p.linkColor}; text-decoration:underline; margin:0 8px;">${escapeHtml(l.label)}</a>`
      ).join('<span style="color:#4b5563;">|</span>')}</p>`
    : ''

  const address = p.addressText
    ? `<p style="margin:0 0 8px; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize - 1}px; color:${p.textColor}; text-align:center;">${escapeHtml(p.addressText)}</p>`
    : ''

  const unsub = p.unsubscribeText
    ? `<p style="margin:0; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize - 1}px; color:${p.textColor}; text-align:center;">
        <a href="${escapeSafeUrl(p.unsubscribeUrl || '#')}" style="color:${p.textColor}; text-decoration:underline;">${escapeHtml(p.unsubscribeText)}</a>
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
