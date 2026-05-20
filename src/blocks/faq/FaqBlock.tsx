import type { FaqProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function FaqBlock({ props: p }: { props: FaqProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      <h3 style={{ margin: '0 0 24px', fontFamily: fontStack(p.titleFontFamily), fontSize: 26, fontWeight: 700, color: p.titleColor, textAlign: 'center' }}>{p.title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {p.faqs.map(faq => (
          <div key={faq.id} style={{ backgroundColor: faq.backgroundColor, border: `1px solid ${faq.borderColor}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontFamily: fontStack(p.questionFontFamily), fontSize: 14, fontWeight: 700, color: p.questionColor, marginBottom: 8 }}>{faq.question}</div>
            <div style={{ fontFamily: fontStack(p.answerFontFamily), fontSize: 13, color: p.answerColor, lineHeight: 1.65 }}>{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
