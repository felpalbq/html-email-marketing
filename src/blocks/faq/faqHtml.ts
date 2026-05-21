import type { FaqProps } from '../types'
import { fontStack } from '../../utils/fonts'
import { escapeHtml } from '../../utils/escapeHtml'

export function faqHtml(p: FaqProps): string {
  const items = p.faqs.map(faq => `
    <tr>
      <td style="padding-bottom:12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="background-color:${faq.backgroundColor}; border:1px solid ${faq.borderColor}; border-radius:8px;">
          <tr>
            <td style="padding:16px 20px 12px;">
              <div style="font-family:${fontStack(p.questionFontFamily)}; font-size:15px; font-weight:700; color:${p.questionColor}; margin-bottom:10px;">${escapeHtml(faq.question)}</div>
              <div style="font-family:${fontStack(p.answerFontFamily)}; font-size:14px; color:${p.answerColor}; line-height:1.65;">${escapeHtml(faq.answer)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('\n')

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <h3 style="margin:0 0 28px; font-family:${fontStack(p.titleFontFamily)}; font-size:28px; font-weight:700; color:${p.titleColor}; text-align:center;">${escapeHtml(p.title)}</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${items}
    </table>
  </td>
</tr>`
}
