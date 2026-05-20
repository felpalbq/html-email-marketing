import type { LogoBarProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function logoBarHtml(p: LogoBarProps): string {
  const opacity = p.opacity / 100

  const logosCells = p.logos.map(logo => {
    const img = logo.image
      ? `<a href="${logo.url}" style="text-decoration:none;"><img src="${logo.image}" alt="${logo.alt}" style="display:block; max-height:${logo.maxHeight}px; height:auto; opacity:${opacity}; filter:grayscale(${opacity < 1 ? 80 : 0}%);" border="0"></a>`
      : `<div style="background-color:#d1d5db; height:${logo.maxHeight}px; width:80px; opacity:${opacity}; border-radius:4px;"></div>`
    return `<td class="mobile-col" align="${p.alignment}" style="padding:0 ${Math.floor(p.gap / 2)}px 12px;">${img}</td>`
  }).join('\n')

  const title = p.title
    ? `<tr><td align="${p.alignment}" style="padding-bottom:20px; font-family:${fontStack('Inter')}; font-size:13px; font-weight:600; color:#9ca3af; letter-spacing:1px; text-transform:uppercase;">${p.title}</td></tr>`
    : ''

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${title}
      <tr>
        <td align="${p.alignment}">
          <table role="presentation" class="mobile-full" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;">
            <tr>${logosCells}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`
}
