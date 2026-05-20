import type { PricingProps, PricingPlan } from '../types'
import { fontStack } from '../../utils/fonts'

function planCard(plan: PricingPlan, p: PricingProps, width: number): string {
  const highlight = plan.isHighlight
    ? `<div style="text-align:center; margin-bottom:12px;"><span style="display:inline-block; background-color:${plan.highlightColor}; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:4px 14px; border-radius:20px;">${plan.highlightLabel}</span></div>`
    : '<div style="height:28px;"></div>'

  const features = plan.features.map(f =>
    `<tr><td style="padding:6px 0; font-family:${fontStack(p.featureFontFamily)}; font-size:14px; color:${highlight ? '#d1d5db' : p.featureColor};">
      <span style="color:#10b981; margin-right:8px;">✓</span>${f}
    </td></tr>`
  ).join('\n')

  return `<table role="presentation" class="mobile-full" width="${width}" cellpadding="0" cellspacing="0" border="0"
    style="background-color:${plan.cardBackgroundColor}; border-radius:${plan.borderRadius}px; overflow:hidden; width:${width}px;">
    <tr><td style="padding:28px 24px 24px;">
      ${highlight}
      <div style="font-family:${fontStack(p.titleFontFamily)}; font-size:20px; font-weight:800; color:${plan.isHighlight ? '#ffffff' : p.titleColor}; margin-bottom:4px;">${plan.name}</div>
      <div style="font-family:${fontStack(p.featureFontFamily)}; font-size:13px; color:${plan.isHighlight ? '#a5b4fc' : '#9ca3af'}; margin-bottom:20px;">${plan.description}</div>
      <div style="margin-bottom:20px;">
        <span style="font-family:${fontStack(p.priceFontFamily)}; font-size:42px; font-weight:900; color:${plan.isHighlight ? '#ffffff' : p.priceColor};">${plan.price}</span>
        <span style="font-family:${fontStack(p.featureFontFamily)}; font-size:14px; color:${plan.isHighlight ? '#a5b4fc' : '#9ca3af'};">${plan.priceUnit}</span>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
        ${features}
      </table>
      <a href="${plan.ctaUrl}" style="display:block; text-align:center; background-color:${plan.ctaBackgroundColor}; color:${plan.ctaTextColor}; font-family:${fontStack(p.titleFontFamily)}; font-size:15px; font-weight:700; padding:13px 24px; border-radius:${plan.borderRadius}px; text-decoration:none;">${plan.ctaText}</a>
    </td></tr>
  </table>`
}

export function pricingHtml(p: PricingProps): string {
  const cols = p.plans.length
  const gap = 16
  const cardWidth = Math.floor((520 - gap * (cols - 1)) / cols)

  const cells = p.plans.map((plan, i) => {
    const spacer = i < p.plans.length - 1 ? `<td class="mobile-spacer" width="${gap}" style="width:${gap}px;"></td>` : ''
    return `<td class="mobile-col" width="${cardWidth}" valign="top" style="width:${cardWidth}px; padding-bottom:16px;">${planCard(plan, p, cardWidth)}</td>${spacer}`
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
