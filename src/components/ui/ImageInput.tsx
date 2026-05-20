import { useState } from 'react'

interface ImageInputProps {
  label: string
  value: string
  onChange: (v: string) => void
}

export function ImageInput({ label, value, onChange }: ImageInputProps) {
  const [tab, setTab] = useState<'url' | 'local'>('url')

  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex gap-1 mb-2">
        {(['url', 'local'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`text-xs px-2 py-0.5 rounded ${tab === t ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            {t === 'url' ? 'URL Externa' : 'Local'}
          </button>
        ))}
      </div>
      {tab === 'url' ? (
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
        />
      ) : (
        <div>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="/images/banner.jpg"
            className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 mb-1"
          />
          <p className="text-xs text-gray-500">Coloque imagens em <code className="text-gray-400">public/images/</code> — acessível em <code className="text-gray-400">/images/arquivo.jpg</code></p>
        </div>
      )}
      {value && (
        <div className="mt-2 h-16 rounded overflow-hidden bg-gray-700 border border-gray-600 flex items-center justify-center">
          <img src={value} alt="preview" className="h-full w-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
        </div>
      )}
    </div>
  )
}
