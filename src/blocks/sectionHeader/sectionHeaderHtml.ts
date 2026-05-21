import type { SectionHeaderProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { nl2br } from '../../utils/nl2br'

export function sectionHeaderHtml(p: SectionHeaderProps): string {
  const titleLineHeight = p.titleLineHeight ?? 1.2
  const titleLetterSpacing = p.titleLetterSpacing ?? 0
  const subtitleLineHeight = p.subtitleLineHeight ?? 1.4
  const subtitleLetterSpacing = p.subtitleLetterSpacing ?? 0

  const subtitle = p.subtitle
    ? `<tr><td align="${p.alignment}" style="padding-bottom:8px;">
        <p style="margin:0; font-family:${fontStack(p.subtitleFontFamily)}; font-size:${p.subtitleFontSize}px; color:${p.subtitleColor}; line-height:${subtitleLineHeight};${subtitleLetterSpacing > 0 ? ` letter-spacing:${subtitleLetterSpacing}px;` : ''} mso-line-height-rule:exactly;">${nl2br(p.subtitle)}</p>
       </td></tr>`
    : ''

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${subtitle}
      <tr>
        <td align="${p.alignment}">
          <h2 style="margin:0; font-family:${fontStack(p.titleFontFamily)}; font-size:${p.titleFontSize}px; font-weight:${p.titleFontWeight}; color:${p.titleColor}; line-height:${titleLineHeight}; mso-line-height-rule:exactly;${titleLetterSpacing > 0 ? ` letter-spacing:${titleLetterSpacing}px;` : ''}">${nl2br(p.title)}</h2>
        </td>
      </tr>
    </table>
  </td>
</tr>`
}
