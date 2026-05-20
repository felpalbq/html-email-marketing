import type { LogoBarProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function LogoBarBlock({ props: p }: { props: LogoBarProps }) {
  return (
    <div style={{ backgroundColor: p.backgroundColor, padding: `${p.paddingTop}px 40px ${p.paddingBottom}px`, textAlign: p.alignment }}>
      {p.title && <p style={{ margin: '0 0 16px', fontFamily: fontStack('Inter'), fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: 1, textTransform: 'uppercase' }}>{p.title}</p>}
      <div style={{ display: 'flex', justifyContent: p.alignment === 'center' ? 'center' : p.alignment === 'right' ? 'flex-end' : 'flex-start', gap: p.gap, flexWrap: 'wrap', alignItems: 'center' }}>
        {p.logos.map(logo =>
          logo.image
            ? <img key={logo.id} src={logo.image} alt={logo.alt} style={{ maxHeight: logo.maxHeight, opacity: p.opacity / 100, filter: `grayscale(${p.opacity < 100 ? 80 : 0}%)` }} />
            : <div key={logo.id} style={{ height: logo.maxHeight, width: 80, backgroundColor: '#d1d5db', borderRadius: 4, opacity: p.opacity / 100 }} />
        )}
      </div>
    </div>
  )
}
