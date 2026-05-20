interface SliderInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

export function SliderInput({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }: SliderInputProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs text-gray-400">{label}</label>
        <span className="text-xs text-gray-300 font-mono">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer accent-indigo-500"
      />
    </div>
  )
}
