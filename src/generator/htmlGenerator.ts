import type { EmailDocument, Block } from '../blocks/types'
import { buildGoogleFontsUrl } from '../utils/fonts'
import { heroHtml } from '../blocks/hero/heroHtml'
import { announcementHtml } from '../blocks/announcement/announcementHtml'
import { sectionHeaderHtml } from '../blocks/sectionHeader/sectionHeaderHtml'
import { cardGridHtml } from '../blocks/cardGrid/cardGridHtml'
import { testimonialHtml } from '../blocks/testimonial/testimonialHtml'
import { logoBarHtml } from '../blocks/logoBar/logoBarHtml'
import { featureListHtml } from '../blocks/featureList/featureListHtml'
import { ctaBannerHtml } from '../blocks/ctaBanner/ctaBannerHtml'
import { comparisonTableHtml } from '../blocks/comparisonTable/comparisonTableHtml'
import { pricingHtml } from '../blocks/pricing/pricingHtml'
import { faqHtml } from '../blocks/faq/faqHtml'
import { socialProofHtml } from '../blocks/socialProof/socialProofHtml'
import { stepsHtml } from '../blocks/steps/stepsHtml'
import { statsHtml } from '../blocks/stats/statsHtml'
import { trustBadgesHtml } from '../blocks/trustBadges/trustBadgesHtml'
import { twoColumnHtml } from '../blocks/twoColumn/twoColumnHtml'
import { footerHtml } from '../blocks/footer/footerHtml'

function collectUsedFonts(doc: EmailDocument): string[] {
  const fonts = new Set<string>()
  fonts.add(doc.globalSettings.defaultFontFamily)

  const traverse = (obj: unknown) => {
    if (!obj || typeof obj !== 'object') return
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      if (key.toLowerCase().includes('font') && key.toLowerCase().includes('family') && typeof val === 'string') {
        fonts.add(val)
      } else if (typeof val === 'object') {
        traverse(val)
      }
    }
  }
  doc.blocks.forEach(b => traverse(b.props))
  return [...fonts]
}

function generateBlockHtml(block: Block): string {
  const p = block.props
  switch (block.type) {
    case 'hero': return heroHtml(p as never)
    case 'announcement': return announcementHtml(p as never)
    case 'sectionHeader': return sectionHeaderHtml(p as never)
    case 'cardGrid': return cardGridHtml(p as never)
    case 'testimonial': return testimonialHtml(p as never)
    case 'logoBar': return logoBarHtml(p as never)
    case 'featureList': return featureListHtml(p as never)
    case 'ctaBanner': return ctaBannerHtml(p as never)
    case 'comparisonTable': return comparisonTableHtml(p as never)
    case 'pricing': return pricingHtml(p as never)
    case 'faq': return faqHtml(p as never)
    case 'socialProof': return socialProofHtml(p as never)
    case 'steps': return stepsHtml(p as never)
    case 'stats': return statsHtml(p as never)
    case 'trustBadges': return trustBadgesHtml(p as never)
    case 'twoColumn': return twoColumnHtml(p as never)
    case 'footer': return footerHtml(p as never)
    default: return ''
  }
}

export function generateEmailHtml(doc: EmailDocument): string {
  const usedFonts = collectUsedFonts(doc)
  const fontsUrl = buildGoogleFontsUrl(usedFonts)
  const { globalSettings: gs } = doc

  const blocksHtml = doc.blocks
    .filter(b => b.visible)
    .map(generateBlockHtml)
    .join('\n')

  const fontLink = fontsUrl
    ? `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${fontsUrl}" rel="stylesheet">`
    : ''

  const previewText = gs.previewText
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${gs.previewText}${'&nbsp;'.repeat(140)}</div>`
    : ''

  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${doc.name}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  ${fontLink}
  <style>
    :root{color-scheme:light}
    body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
    table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
    img{-ms-interpolation-mode:bicubic}
    a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
    u+.u-body{background-color:${gs.backgroundColor}!important}
    u+.u-body .email-wrapper{background-color:${gs.backgroundColor}!important}
    [data-ogsc] body,[data-ogsc] .email-wrapper{background-color:${gs.backgroundColor}!important}
    @media (prefers-color-scheme:dark){
      .dm-invert{filter:none!important}
      body,.email-wrapper{background-color:${gs.backgroundColor}!important;color:inherit!important}
    }
    @media only screen and (max-width:620px){
      body{overflow-x:hidden!important;}
      .email-container{width:100%!important;max-width:100%!important;overflow:hidden!important}
      .mobile-full{width:100%!important;display:block!important;max-width:100%!important}
      .mobile-center{text-align:center!important}
      .mobile-hide{display:none!important}
      .mobile-padding{padding-left:16px!important;padding-right:16px!important}
      .mobile-font-lg{font-size:28px!important;line-height:1.2!important}
      .mobile-stack{display:block!important;width:100%!important}
      .mobile-img{width:100%!important;height:auto!important;max-width:100%!important;display:block!important;margin-left:auto!important;margin-right:auto!important}
      .mobile-col{display:block!important;width:100%!important;max-width:100%!important;padding-left:0!important;padding-right:0!important;text-align:center!important;box-sizing:border-box!important}
      .mobile-col table{width:100%!important;}
      .mobile-col img{max-width:100%!important;}
      .mobile-spacer{display:none!important;width:0!important;overflow:hidden!important}
    }
  </style>
</head>
<body class="u-body" style="margin:0;padding:0;background-color:${gs.backgroundColor};">
  ${previewText}
  <table role="presentation" class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" border="0"
    bgcolor="${gs.backgroundColor}" style="background-color:${gs.backgroundColor};">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:${gs.emailWidth}px;width:100%;">
          ${blocksHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
