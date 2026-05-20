import type { PricingProps, PricingPlan } from '../types'
import { fontStack } from '../../utils/fonts'

function PlanCard({ plan, p }: { plan: PricingPlan, p: PricingProps }) {
  return (
    <div style={{ backgroundColor: plan.cardBackgroundColor, borderRadius: plan.borderRadius, padding: '24px 20px', flex: 1, position: 'relative' }}>
      {plan.isHighlight && plan.highlightLabel && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ display: 'inline-block', backgroundColor: plan.highlightColor, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '3px 12px', borderRadius: 20 }}>{plan.highlightLabel}</span>
        </div>
      )}
      <div style={{ fontFamily: fontStack(p.titleFontFamily), fontSize: 18, fontWeight: 800, color: plan.isHighlight ? '#fff' : p.titleColor, marginBottom: 4 }}>{plan.name}</div>
      <div style={{ fontFamily: fontStack(p.featureFontFamily), fontSize: 12, color: plan.isHighlight ? '#a5b4fc' : '#9ca3af', marginBottom: 16 }}>{plan.description}</div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontFamily: fontStack(p.priceFontFamily), fontSize: 36, fontWeight: 900, color: plan.isHighlight ? '#fff' : p.priceColor }}>{plan.price}</span>
        <span style={{ fontFamily: fontStack(p.featureFontFamily), fontSize: 13, color: plan.isHighlight ? '#a5b4fc' : '#9ca3af' }}>{plan.priceUnit}</span>
      </div>
      <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ fontFamily: fontStack(p.featureFontFamily), fontSize: 13, color: plan.isHighlight ? '#d1d5db' : p.featureColor, padding: '5px 0' }}>
            <span style={{ color: '#10b981', marginRight: 8 }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <a href="#" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.ctaBackgroundColor, color: plan.ctaTextColor, fontFamily: fontStack(p.titleFontFamily), fontSize: 14, fontWeight: 700, padding: '12px', borderRadius: plan.borderRadius, textDecoration: 'none' }}>{plan.ctaText}</a>
    </div>
  )
}

export function PricingBlock({ props: p }: { props: PricingProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, display: 'flex', gap: 16 }}>
      {p.plans.map(plan => <PlanCard key={plan.id} plan={plan} p={p} />)}
    </div>
  )
}
