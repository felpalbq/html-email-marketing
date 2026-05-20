interface SelectOption {
  label: string
  value: string
}

interface SelectInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: SelectOption[]
}

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
