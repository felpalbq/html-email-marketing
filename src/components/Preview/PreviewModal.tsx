import { useEffect } from 'react'
import { useEditorStore } from '../../store/editorStore'
import { generateEmailHtml } from '../../generator/htmlGenerator'
import { PreviewFrame } from './PreviewFrame'

export function PreviewModal() {
  const { document, previewMode, setPreviewMode, setShowPreview } = useEditorStore()
  const html = generateEmailHtml(document)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowPreview(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setShowPreview])

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-800 rounded-lg p-0.5">
            {(['desktop', 'mobile'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${previewMode === mode ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {mode === 'desktop' ? '🖥' : '📱'}
                <span>{mode === 'desktop' ? 'Desktop' : 'Celular'}</span>
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">{previewMode === 'mobile' ? '360px' : '600px'}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(html)
              alert('HTML copiado para a área de transferência!\n\n⚠️ Substitua os caminhos /images/ por URLs absolutas antes de enviar.')
            }}
            className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            📋 Copiar HTML
          </button>
          <button
            onClick={() => {
              const blob = new Blob([html], { type: 'text/html' })
              const url = URL.createObjectURL(blob)
              const a = window.document.createElement('a')
              a.href = url
              a.download = `${useEditorStore.getState().document.name || 'email'}.html`
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            ⬇️ Baixar HTML
          </button>
          <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white text-lg ml-2">✕</button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-y-auto bg-gray-950">
        <PreviewFrame html={html} mode={previewMode} />
      </div>
    </div>
  )
}
