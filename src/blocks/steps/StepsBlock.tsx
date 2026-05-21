import type { StepsProps, StepItem } from '../types'
import { fontStack } from '../../utils/fonts'

const isImageUrl = (s: string) => s.startsWith('http') || s.startsWith('/')

function StepIcon({ step, index, bgColor, fgColor, fontFamily }: {
  step: StepItem, index: number, bgColor: string, fgColor: string, fontFamily: string
}) {
  if (step.icon && isImageUrl(step.icon)) {
    return <img src={step.icon} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
  }
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      backgroundColor: bgColor, color: fgColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, fontWeight: 800, fontFamily: fontStack(fontFamily),
    }}>
      {step.icon || String(index + 1).padStart(2, '0')}
    </div>
  )
}

export function StepsBlock({ props: p }: { props: StepsProps }) {
  const isHorizontal = (p.layout ?? 'horizontal') === 'horizontal'

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      {p.showSectionTitle && p.sectionTitle && (
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ margin: 0, fontFamily: fontStack(p.sectionTitleFontFamily), fontSize: p.sectionTitleFontSize, fontWeight: 700, color: p.sectionTitleColor }}>{p.sectionTitle}</h2>
        </div>
      )}

      {isHorizontal ? (
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
          {p.steps.map((step, i) => (
            <div key={step.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
              {p.showConnector && i < p.steps.length - 1 && (
                <div style={{ position: 'absolute', top: 20, left: '50%', right: '-50%', height: 2, backgroundColor: p.connectorColor ?? '#e5e7eb', zIndex: 0 }} />
              )}
              <div style={{ marginBottom: 14, flexShrink: 0, zIndex: 1, position: 'relative' }}>
                <StepIcon step={step} index={i} bgColor={p.numberBackgroundColor} fgColor={p.numberColor} fontFamily={p.stepTitleFontFamily} />
              </div>
              <div style={{ padding: '0 12px' }}>
                <div style={{ fontFamily: fontStack(p.stepTitleFontFamily), fontSize: p.stepTitleFontSize, fontWeight: 700, color: p.stepTitleColor, marginBottom: 6, lineHeight: p.stepTitleLineHeight ?? 1.3 }}>{step.title}</div>
                <div style={{ fontFamily: fontStack(p.descriptionFontFamily), fontSize: p.descriptionFontSize, color: p.descriptionColor, lineHeight: p.descriptionLineHeight ?? 1.55 }}>{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {p.steps.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: i < p.steps.length - 1 ? 28 : 0, position: 'relative' }}>
              {p.showConnector && i < p.steps.length - 1 && (
                <div style={{ position: 'absolute', left: 20, top: 44, bottom: -28, width: 2, backgroundColor: p.connectorColor ?? '#e5e7eb' }} />
              )}
              <div style={{ flexShrink: 0, zIndex: 1, position: 'relative' }}>
                <StepIcon step={step} index={i} bgColor={p.numberBackgroundColor} fgColor={p.numberColor} fontFamily={p.stepTitleFontFamily} />
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontFamily: fontStack(p.stepTitleFontFamily), fontSize: p.stepTitleFontSize, fontWeight: 700, color: p.stepTitleColor, marginBottom: 4, lineHeight: p.stepTitleLineHeight ?? 1.3 }}>{step.title}</div>
                <div style={{ fontFamily: fontStack(p.descriptionFontFamily), fontSize: p.descriptionFontSize, color: p.descriptionColor, lineHeight: p.descriptionLineHeight ?? 1.55 }}>{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
