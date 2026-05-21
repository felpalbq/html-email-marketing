import { useState } from 'react'
import { AssetBrowser } from './AssetBrowser'

type Tab = 'url' | 'local' | 'library'

interface ImageInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  assetType?: 'images' | 'icons'
}

export function ImageInput({ label, value, onChange, assetType = 'images' }: ImageInputProps) {
  const [tab, setTab] = useState<Tab>('url')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'url', label: 'URL' },
    { key: 'local', label: 'Local' },
    { key: 'library', label: assetType === 'icons' ? 'Ícones' : 'Biblioteca' },
  ]

  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>

      <div className="flex gap-1 mb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`text-xs px-2 py-0.5 rounded ${
              tab === t.key ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'url' && (
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
        />
      )}

      {tab === 'local' && (
        <div>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={assetType === 'icons' ? '/icons/icon.png' : '/images/banner.jpg'}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2.5 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 mb-1"
          />
          <p className="text-xs text-gray-500">
            Coloque arquivos em{' '}
            <code className="text-gray-400">
              public/{assetType === 'icons' ? 'icons' : 'images'}/
            </code>
          </p>
        </div>
      )}

      {tab === 'library' && (
        <AssetBrowser
          type={assetType}
          onSelect={url => { onChange(url); setTab('url') }}
          selectedUrl={value}
        />
      )}

      {value && tab !== 'library' && (
        <div className="mt-2 h-16 rounded overflow-hidden bg-gray-700 border border-gray-600 flex items-center justify-center">
          <img
            src={value}
            alt="preview"
            className="h-full w-full object-contain"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}
    </div>
  )
}
