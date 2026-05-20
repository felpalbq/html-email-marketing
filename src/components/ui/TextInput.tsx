interface TextInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}

export function TextInput({ label, value, onChange, placeholder, type = 'text' }: TextInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
      />
    </div>
  )
}
