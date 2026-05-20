interface TextAreaProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }: TextAreaProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 resize-y"
      />
    </div>
  )
}
