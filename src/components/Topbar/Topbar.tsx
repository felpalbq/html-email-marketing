import { useEditorStore } from '../../store/editorStore'

export function Topbar() {
  const { document, updateDocumentName, setShowPreview, setShowSettings, newDocument, saveToLocalStorage } = useEditorStore()

  return (
    <div className="h-12 bg-gray-900 border-b border-gray-700 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-lg">📧</div>
        <span className="text-sm font-bold text-white hidden sm:block">Editor de Email</span>
      </div>

      <div className="w-px h-6 bg-gray-700" />

      {/* Email name */}
      <input
        type="text"
        value={document.name}
        onChange={e => updateDocumentName(e.target.value)}
        className="flex-1 max-w-xs bg-transparent text-sm text-gray-200 border border-transparent hover:border-gray-600 focus:border-indigo-500 focus:outline-none rounded px-2 py-1 transition-colors"
      />

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={newDocument}
          className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
        >
          Novo
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
          title="Configurações Globais"
        >
          ⚙ Configurações
        </button>

        <button
          onClick={() => { saveToLocalStorage(); alert('Salvo!') }}
          className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
        >
          💾 Salvar
        </button>

        <button
          onClick={() => setShowPreview(true)}
          className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <span>👁</span> Prévia & Exportar
        </button>
      </div>
    </div>
  )
}
