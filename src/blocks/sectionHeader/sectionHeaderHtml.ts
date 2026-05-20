import type { SectionHeaderProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function sectionHeaderHtml(p: SectionHeaderProps): string {
  const subtitle = p.subtitle
    ? `<tr><td align="${p.alignment}" style="padding-bottom:8px;">
        <p style="margin:0; font-family:${fontStack(p.subtitleFontFamily)}; font-size:${p.subtitleFontSize}px; color:${p.subtitleColor}; line-height:1.4;">${p.subtitle}</p>
       </td></tr>`
    : ''

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${subtitle}
      <tr>
        <td align="${p.alignment}">
          <h2 style="margin:0; font-family:${fontStack(p.titleFontFamily)}; font-size:${p.titleFontSize}px; font-weight:${p.titleFontWeight}; color:${p.titleColor}; line-height:1.2;">${p.title}</h2>
        </td>
      </tr>
    </table>
  </td>
</tr>`
}
