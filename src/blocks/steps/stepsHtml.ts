import type { StepsProps, StepItem } from '../types'
import { fontStack } from '../../utils/fonts'

function renderStepIcon(step: StepItem, index: number, p: StepsProps): string {
  if (step.icon && (step.icon.startsWith('http') || step.icon.startsWith('/'))) {
    return `<img src="${step.icon}" alt="" width="40" height="40" border="0" style="display:block;width:40px;height:40px;border-radius:50%;">`
  }
  const content = step.icon || String(index + 1).padStart(2, '0')
  return `<div style="display:inline-block; width:40px; height:40px; border-radius:50%; background-color:${p.numberBackgroundColor}; color:${p.numberColor}; font-family:${fontStack(p.stepTitleFontFamily)}; font-size:16px; font-weight:800; line-height:40px; text-align:center; mso-padding-alt:0;">${content}</div>`
}

function stepCell(step: StepItem, index: number, p: StepsProps, cellWidth: number, isLast: boolean): string {
  const iconHtml = renderStepIcon(step, index, p)
  const connectorSpacer = !isLast && p.showConnector
    ? `<td class="mobile-hide" valign="top" style="padding-top:20px;"><div style="height:2px; width:100%; background-color:${p.connectorColor ?? '#e5e7eb'};"></div></td>`
    : ''

  return `<td class="mobile-col" width="${cellWidth}" valign="top" style="width:${cellWidth}px; text-align:center; padding-bottom:16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
      <tr>
        <td align="center" style="padding-bottom:14px;">${iconHtml}</td>
      </tr>
      <tr>
        <td align="center" style="padding:0 8px;">
          <div style="font-family:${fontStack(p.stepTitleFontFamily)}; font-size:${p.stepTitleFontSize}px; font-weight:700; color:${p.stepTitleColor}; margin-bottom:6px; line-height:${p.stepTitleLineHeight ?? 1.3}; mso-line-height-rule:exactly;">${step.title}</div>
          <div style="font-family:${fontStack(p.descriptionFontFamily)}; font-size:${p.descriptionFontSize}px; color:${p.descriptionColor}; line-height:${p.descriptionLineHeight ?? 1.55}; mso-line-height-rule:exactly;">${step.description}</div>
        </td>
      </tr>
    </table>
  </td>
  ${connectorSpacer}`
}

function verticalStep(step: StepItem, index: number, p: StepsProps, isLast: boolean): string {
  const iconHtml = renderStepIcon(step, index, p)
  return `<tr>
    <td valign="top" style="padding-bottom:${isLast ? 0 : 28}px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td valign="top" width="48" style="width:48px; padding-right:20px;">
            ${iconHtml}
            ${!isLast && p.showConnector ? `<div style="width:2px; height:${28}px; background-color:${p.connectorColor ?? '#e5e7eb'}; margin:4px auto 0;"></div>` : ''}
          </td>
          <td valign="top" style="padding-top:8px;">
            <div style="font-family:${fontStack(p.stepTitleFontFamily)}; font-size:${p.stepTitleFontSize}px; font-weight:700; color:${p.stepTitleColor}; margin-bottom:4px; line-height:${p.stepTitleLineHeight ?? 1.3}; mso-line-height-rule:exactly;">${step.title}</div>
            <div style="font-family:${fontStack(p.descriptionFontFamily)}; font-size:${p.descriptionFontSize}px; color:${p.descriptionColor}; line-height:${p.descriptionLineHeight ?? 1.55}; mso-line-height-rule:exactly;">${step.description}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`
}

export function stepsHtml(p: StepsProps): string {
  const isHorizontal = (p.layout ?? 'horizontal') === 'horizontal'

  const titleRow = p.showSectionTitle && p.sectionTitle
    ? `<tr>
        <td align="center" style="padding-bottom:32px;">
          <h2 style="margin:0; font-family:${fontStack(p.sectionTitleFontFamily)}; font-size:${p.sectionTitleFontSize}px; font-weight:700; color:${p.sectionTitleColor};">${p.sectionTitle}</h2>
        </td>
       </tr>`
    : ''

  let stepsContent = ''
  if (isHorizontal) {
    const count = p.steps.length
    const cellWidth = Math.floor(520 / count)
    const cells = p.steps.map((step, i) => stepCell(step, i, p, cellWidth, i === count - 1)).join('\n')
    stepsContent = `<tr>${cells}</tr>`
  } else {
    stepsContent = p.steps.map((step, i) => verticalStep(step, i, p, i === p.steps.length - 1)).join('\n')
  }

  return `
<tr>
  <td class="mobile-padding" bgcolor="${p.backgroundColor}" style="background-color:${p.backgroundColor}; padding:${p.paddingTop}px 40px ${p.paddingBottom}px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${titleRow}
      ${stepsContent}
    </table>
  </td>
</tr>`
}
