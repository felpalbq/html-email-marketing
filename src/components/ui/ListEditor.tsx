import { useState } from 'react'
import type { ReactNode } from 'react'
import { nanoid } from '../../utils/nanoid'

interface ListEditorProps<T extends { id: string }> {
  label: string
  items: T[]
  onChange: (items: T[]) => void
  defaultItem: Omit<T, 'id'>
  renderItem: (item: T, onChange: (item: T) => void) => ReactNode
  maxItems?: number
}

export function ListEditor<T extends { id: string }>({
  label, items, onChange, defaultItem, renderItem, maxItems = 20,
}: ListEditorProps<T>) {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id ?? null)

  const add = () => {
    if (items.length >= maxItems) return
    const item = { ...defaultItem, id: nanoid() } as T
    onChange([...items, item])
    setExpandedId(item.id)
  }

  const remove = (id: string) => {
    onChange(items.filter(i => i.id !== id))
    if (expandedId === id) setExpandedId(items[0]?.id ?? null)
  }

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  const update = (id: string, updated: T) => {
    onChange(items.map(i => i.id === id ? updated : i))
  }

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{label} ({items.length})</span>
        {items.length < maxItems && (
          <button type="button" onClick={add} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded">+ Adicionar</button>
        )}
      </div>
      <div className="space-y-1">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-gray-700 rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-650" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
              <span className="text-xs text-gray-300 truncate">Item {idx + 1}</span>

              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <button type="button" onClick={() => move(idx, -1)} className="text-gray-500 hover:text-gray-300 text-xs px-1" disabled={idx === 0}>↑</button>
                <button type="button" onClick={() => move(idx, 1)} className="text-gray-500 hover:text-gray-300 text-xs px-1" disabled={idx === items.length - 1}>↓</button>
                <button type="button" onClick={() => remove(item.id)} className="text-red-500 hover:text-red-400 text-xs px-1">✕</button>
              </div>
            </div>
            {expandedId === item.id && (
              <div className="px-3 pb-3 pt-1 border-t border-gray-600">
                {renderItem(item, (updated) => update(item.id, updated))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
