import { useState, useEffect } from 'react'
import { ensureHex, isValidHex } from '../../utils/colorUtils'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (v: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [hex, setHex] = useState(ensureHex(value))

  useEffect(() => {
    setHex(ensureHex(value))
  }, [value])

  const handleHexChange = (v: string) => {
    setHex(v)
    if (isValidHex(v)) onChange(v)
  }

  const handleColorInput = (v: string) => {
    setHex(v)
    onChange(v)
  }

  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-600 flex-shrink-0">
          <input
            type="color"
            value={hex}
            onChange={e => handleColorInput(e.target.value)}
            className="absolute inset-0 w-10 h-10 -translate-x-1 -translate-y-1 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={hex}
          onChange={e => handleHexChange(e.target.value)}
          maxLength={7}
          className="flex-1 bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 font-mono focus:outline-none focus:border-indigo-500"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
