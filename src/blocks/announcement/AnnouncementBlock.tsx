import type { AnnouncementProps } from '../types'
import { fontStack } from '../../utils/fonts'

export function AnnouncementBlock({ props: p }: { props: AnnouncementProps }) {
  return (
    <div style={{
      backgroundColor: p.backgroundColor,
      padding: `${p.paddingTop}px 24px ${p.paddingBottom}px`,
      textAlign: p.alignment,
      fontFamily: fontStack(p.fontFamily),
      fontSize: p.fontSize,
      fontWeight: p.fontWeight,
      color: p.textColor,
      lineHeight: 1.5,
    }}>
      {p.showIcon && <span style={{ marginRight: 6 }}>{p.iconEmoji}</span>}
      {p.text}
    </div>
  )
}
