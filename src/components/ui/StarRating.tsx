interface StarRatingProps {
  label: string
  value: number
  onChange: (v: number) => void
}

export function StarRating({ label, value, onChange }: StarRatingProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`text-xl leading-none ${n <= value ? 'text-yellow-400' : 'text-gray-600'} hover:text-yellow-300 transition-colors`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}
