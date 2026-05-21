import { useState, useEffect, useCallback } from 'react'

interface AssetBrowserProps {
  type: 'images' | 'icons'
  onSelect: (url: string) => void
  selectedUrl?: string
}

interface UploadState {
  [path: string]: 'idle' | 'uploading' | 'done' | 'error'
}

interface CloudinaryUrls {
  [path: string]: string
}

export function AssetBrowser({ type, onSelect, selectedUrl }: AssetBrowserProps) {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadState, setUploadState] = useState<UploadState>({})
  const [cloudinaryUrls, setCloudinaryUrls] = useState<CloudinaryUrls>({})
  const [error, setError] = useState('')

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/local-assets?type=${type}`)
      const data = await res.json() as string[]
      setFiles(data)
    } catch {
      setError('Erro ao listar arquivos locais')
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => { fetchFiles() }, [fetchFiles])

  const uploadToCloudinary = async (localPath: string) => {
    setUploadState(s => ({ ...s, [localPath]: 'uploading' }))
    try {
      // Read the file as base64 via the browser
      const imgRes = await fetch(localPath)
      const blob = await imgRes.blob()
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })

      const res = await fetch('/api/cloudinary-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64, folder: `email-assets/${type}` }),
      })
      const data = await res.json() as { url?: string; error?: string }

      if (!res.ok || !data.url) throw new Error(data.error ?? 'Falha no upload')

      setCloudinaryUrls(u => ({ ...u, [localPath]: data.url! }))
      setUploadState(s => ({ ...s, [localPath]: 'done' }))
      onSelect(data.url!)
    } catch (e) {
      setUploadState(s => ({ ...s, [localPath]: 'error' }))
      setError(String(e))
    }
  }

  const label = type === 'images' ? 'imagens' : 'ícones'
  const folder = type === 'images' ? 'public/images/' : 'public/icons/'

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{files.length} {label} locais</span>
        <button
          type="button"
          onClick={fetchFiles}
          className="text-xs text-indigo-400 hover:text-indigo-300"
        >
          ↻ Atualizar
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-400 mb-2 bg-red-900/20 rounded p-1.5">{error}</p>
      )}

      {loading ? (
        <div className="text-xs text-gray-500 text-center py-4">Carregando...</div>
      ) : files.length === 0 ? (
        <div className="text-xs text-gray-500 text-center py-4 bg-gray-750 rounded border border-dashed border-gray-600">
          <div className="mb-1">Nenhum arquivo encontrado</div>
          <div className="text-gray-600">Adicione arquivos em <code className="text-gray-500">{folder}</code></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
          {files.map(filePath => {
            const cloudUrl = cloudinaryUrls[filePath]
            const state = uploadState[filePath] ?? 'idle'
            const isSelected = selectedUrl === filePath || selectedUrl === cloudUrl
            return (
              <div
                key={filePath}
                className={`relative group rounded overflow-hidden border-2 cursor-pointer ${
                  isSelected ? 'border-indigo-500' : 'border-transparent hover:border-gray-500'
                } bg-gray-700`}
              >
                <button
                  type="button"
                  className="w-full"
                  onClick={() => onSelect(cloudUrl ?? filePath)}
                >
                  <img
                    src={filePath}
                    alt=""
                    className="w-full h-16 object-contain p-1"
                    onError={e => { e.currentTarget.style.opacity = '0.3' }}
                  />
                </button>

                {/* Cloudinary upload button */}
                <div className="absolute inset-x-0 bottom-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex">
                  {state === 'done' && cloudUrl ? (
                    <button
                      type="button"
                      title="URL Cloudinary copiada — clique para usar"
                      onClick={() => onSelect(cloudUrl)}
                      className="w-full text-[9px] text-emerald-400 text-center py-0.5 truncate px-1"
                    >
                      ✓ Cloudinary
                    </button>
                  ) : state === 'uploading' ? (
                    <span className="w-full text-[9px] text-yellow-400 text-center py-0.5">Enviando…</span>
                  ) : state === 'error' ? (
                    <button
                      type="button"
                      onClick={() => uploadToCloudinary(filePath)}
                      className="w-full text-[9px] text-red-400 text-center py-0.5"
                    >
                      ✕ Tentar novamente
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => uploadToCloudinary(filePath)}
                      className="w-full text-[9px] text-indigo-300 text-center py-0.5 hover:text-white"
                    >
                      ↑ Cloudinary
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="text-[10px] text-gray-600 mt-1.5">
        Clique para usar local · Passe o mouse e clique "↑ Cloudinary" para gerar URL pública
      </p>
    </div>
  )
}
