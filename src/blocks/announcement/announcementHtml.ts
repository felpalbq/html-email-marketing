import type { AnnouncementProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function announcementHtml(p: AnnouncementProps): string {
  const content = p.showIcon ? `${p.iconEmoji} ${p.text}` : p.text
  const lineHeight = p.lineHeight ?? 1.5
  const letterSpacing = p.letterSpacing ?? 0
  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" align="${p.alignment}"
    style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 24px ${p.paddingBottom}px; font-family:${fontStack(p.fontFamily)}; font-size:${p.fontSize}px; font-weight:${p.fontWeight}; color:${p.textColor}; line-height:${lineHeight}; mso-line-height-rule:exactly;${letterSpacing > 0 ? ` letter-spacing:${letterSpacing}px;` : ''}">
    ${content}
  </td>
</tr>`
}
