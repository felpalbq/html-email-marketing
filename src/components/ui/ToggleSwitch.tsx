interface ToggleSwitchProps {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}

export function ToggleSwitch({ label, value, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <label className="text-xs text-gray-400">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${value ? 'bg-indigo-500' : 'bg-gray-600'}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}
