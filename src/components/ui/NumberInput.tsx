interface NumberInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function NumberInput({ label, value, onChange, min, max, step = 1, unit }: NumberInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}{unit ? ` (${unit})` : ''}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
      />
    </div>
  )
}
