import type { TestimonialProps, TestimonialItem } from '../types'
import { fontStack } from '../../utils/fonts'

function TestimonialCard({ t, p }: { t: TestimonialItem, p: TestimonialProps }) {
  return (
    <div style={{ backgroundColor: t.cardBackgroundColor, borderRadius: t.borderRadius, padding: '20px', flex: 1 }}>
      <div style={{ marginBottom: 10 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{ color: i < t.stars ? '#fbbf24' : '#d1d5db', fontSize: 16 }}>★</span>
        ))}
      </div>
      <p style={{ margin: '0 0 16px', fontFamily: fontStack(p.quoteFontFamily), fontSize: 14, color: p.quoteColor, lineHeight: 1.6, fontStyle: 'italic' }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {t.avatar
          ? <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
          : <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e5e7eb', flexShrink: 0 }} />}
        <div>
          <div style={{ fontFamily: fontStack(p.nameFontFamily), fontSize: 13, fontWeight: 700, color: p.nameColor }}>{t.name}</div>
          <div style={{ fontFamily: fontStack(p.nameFontFamily), fontSize: 12, color: '#9ca3af' }}>{t.role}</div>
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
