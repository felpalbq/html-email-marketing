import type { TestimonialProps, TestimonialItem } from '../types'
import { fontStack } from '../../utils/fonts'

function TestimonialCard({ t, p }: { t: TestimonialItem, p: TestimonialProps }) {
  const quoteFontSize = p.quoteFontSize ?? 14
  const quoteLineHeight = p.quoteLineHeight ?? 1.6
  const nameFontSize = p.nameFontSize ?? 13
  const nameLineHeight = p.nameLineHeight ?? 1.4

  return (
    <div style={{ backgroundColor: t.cardBackgroundColor, borderRadius: t.borderRadius, padding: '20px', flex: 1 }}>
      <div style={{ marginBottom: 10 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{ color: i < t.stars ? '#fbbf24' : '#d1d5db', fontSize: 16 }}>★</span>
        ))}
      </div>
      <p style={{ margin: '0 0 16px', fontFamily: fontStack(p.quoteFontFamily), fontSize: quoteFontSize, color: p.quoteColor, lineHeight: quoteLineHeight, fontStyle: 'italic' }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {t.avatar
          ? <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
          : <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e5e7eb', flexShrink: 0 }} />}
        <div>
          <div style={{ fontFamily: fontStack(p.nameFontFamily), fontSize: nameFontSize, fontWeight: 700, color: p.nameColor, lineHeight: nameLineHeight }}>{t.name}</div>
          <div style={{ fontFamily: fontStack(p.nameFontFamily), fontSize: Math.max(11, nameFontSize - 1), color: '#9ca3af' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialBlock({ props: p }: { props: TestimonialProps }) {
  const items = p.layout === 'single' ? p.testimonials.slice(0, 1) : p.testimonials.slice(0, 3)
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, display: 'flex', gap: 16 }}>
      {items.map(t => <TestimonialCard key={t.id} t={t} p={p} />)}
    </div>
  )
}
