import { FONTS } from '../../utils/fonts'

interface FontSelectorProps {
  label: string
  value: string
  onChange: (v: string) => void
}

export function FontSelector({ label, value, onChange }: FontSelectorProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
      >
        {FONTS.map(f => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
    </div>
  )
}
