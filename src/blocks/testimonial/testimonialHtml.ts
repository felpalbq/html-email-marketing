import type { TestimonialProps, TestimonialItem } from '../types'
import { fontStack } from '../../utils/fonts'
import { nl2br } from '../../utils/nl2br'

function stars(count: number, color: string): string {
  return Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < count ? '#fbbf24' : '#d1d5db'}; font-size:16px;">★</span>`
  ).join('')
}

function singleCard(t: TestimonialItem, p: TestimonialProps, width: number): string {
  const quoteFontSize = p.quoteFontSize ?? 15
  const quoteLineHeight = p.quoteLineHeight ?? 1.6
  const nameFontSize = p.nameFontSize ?? 14
  const nameLineHeight = p.nameLineHeight ?? 1.4

  const avatar = t.avatar
    ? `<img src="${t.avatar}" alt="${t.name}" width="48" height="48" style="display:block; width:48px; height:48px; border-radius:50%; margin-bottom:12px;" border="0">`
    : `<div style="width:48px; height:48px; border-radius:50%; background-color:#e5e7eb; margin-bottom:12px;"></div>`

  const cta = t.ctaText
    ? `<div style="margin-top:16px;"><a href="${t.ctaUrl}" style="display:inline-block; background-color:${t.ctaBackgroundColor}; color:${t.ctaTextColor}; font-size:14px; font-weight:600; padding:10px 22px; border-radius:4px; text-decoration:none;">${t.ctaText}</a></div>`
    : ''

  return `<table role="presentation" class="mobile-full" width="${width}" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${t.cardBackgroundColor}; border-radius:${t.borderRadius}px; padding:24px; width:${width}px;">
    <tr><td>${stars(t.stars, '#fbbf24')}</td></tr>
    <tr><td style="padding:12px 0 16px;">
      <p style="margin:0; font-family:${fontStack(p.quoteFontFamily)}; font-size:${quoteFontSize}px; color:${p.quoteColor}; line-height:${quoteLineHeight}; mso-line-height-rule:exactly; font-style:italic;">${nl2br(t.quote)}</p>
    </td></tr>
    <tr><td>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="middle" style="padding-right:12px;">${avatar}</td>
          <td valign="middle">
            <div style="font-family:${fontStack(p.nameFontFamily)}; font-size:${nameFontSize}px; font-weight:700; color:${p.nameColor}; line-height:${nameLineHeight}; mso-line-height-rule:exactly;">${t.name}</div>
            <div style="font-family:${fontStack(p.nameFontFamily)}; font-size:${Math.max(11, nameFontSize - 1)}px; color:#9ca3af;">${t.role}</div>
          </td>
        </tr>
      </table>
      ${cta}
    </td></tr>
  </table>`
}

export function testimonialHtml(p: TestimonialProps): string {
  if (p.layout === 'single' || p.testimonials.length === 1) {
    const t = p.testimonials[0]
    if (!t) return ''
    return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    ${singleCard(t, p, 520)}
  </td>
</tr>`
  }

  const items = p.testimonials.slice(0, 3)
  const gap = 16
  const cardWidth = Math.floor((520 - gap * (items.length - 1)) / items.length)

  const cells = items.map((t, i) => {
    const spacer = i < items.length - 1 ? `<td class="mobile-spacer" width="${gap}" style="width:${gap}px;"></td>` : ''
    return `<td class="mobile-col" width="${cardWidth}" valign="top" style="width:${cardWidth}px; padding-bottom:16px;">${singleCard(t, p, cardWidth)}</td>${spacer}`
  }).join('\n')

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>${cells}</tr>
    </table>
  </td>
</tr>`
}
