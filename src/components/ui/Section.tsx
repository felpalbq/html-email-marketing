import { useState } from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-700">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-gray-300 uppercase tracking-wider hover:bg-gray-750 transition-colors"
      >
        {title}
        <span className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <div className="px-4 pt-2 pb-3">{children}</div>}
    </div>
  )
}
