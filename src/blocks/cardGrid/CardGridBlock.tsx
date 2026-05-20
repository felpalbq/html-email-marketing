import type { CardGridProps, CardItem } from '../types'
import { fontStack } from '../../utils/fonts'

function Card({ card, props: p }: { card: CardItem, props: CardGridProps }) {
  return (
    <div style={{ backgroundColor: card.cardBackgroundColor, borderRadius: card.borderRadius, overflow: 'hidden', flex: 1 }}>
      {card.image
        ? <img src={card.image} alt={card.imageAlt} style={{ display: 'block', width: '100%', height: 160, objectFit: 'cover' }} />
        : <div style={{ height: 160, backgroundColor: '#e5e7eb' }} />}
      <div style={{ padding: '14px 14px 18px' }}>
        {card.badge && (
          <div style={{ marginBottom: 8 }}>
            <span style={{ display: 'inline-block', backgroundColor: card.badgeColor, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20 }}>{card.badge}</span>
          </div>
        )}
        <div style={{ fontFamily: fontStack(p.titleFontFamily), fontSize: p.titleFontSize, fontWeight: 700, color: p.titleColor, marginBottom: 6 }}>{card.title}</div>
        <div style={{ fontFamily: fontStack(p.descriptionFontFamily), fontSize: p.descriptionFontSize, color: p.descriptionColor, lineHeight: 1.5 }}>{card.description}</div>
        {card.ctaText && (
          <a href="#" style={{ display: 'inline-block', marginTop: 12, backgroundColor: card.ctaBackgroundColor, color: card.ctaTextColor, fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 4, textDecoration: 'none' }}>{card.ctaText}</a>
        )}
      </div>
    </div>
  )
}

export function CardGridBlock({ props: p }: { props: CardGridProps }) {
  const rows: CardItem[][] = []
  for (let i = 0; i < p.cards.length; i += p.columns) {
    rows.push(p.cards.slice(i, i + p.columns))
  }

  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px` }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: p.columnGap, marginBottom: ri < rows.length - 1 ? p.columnGap : 0 }}>
          {row.map(card => <Card key={card.id} card={card} props={p} />)}
        </div>
      ))}
    </div>
  )
}
