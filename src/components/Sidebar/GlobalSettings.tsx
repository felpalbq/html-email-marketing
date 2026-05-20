import { useEditorStore } from '../../store/editorStore'
import { TextInput } from '../ui/TextInput'
import { TextArea } from '../ui/TextArea'
import { ColorPicker } from '../ui/ColorPicker'
import { FontSelector } from '../ui/FontSelector'

export function GlobalSettings() {
  const { document, updateGlobalSettings, setShowSettings } = useEditorStore()
  const { globalSettings: gs } = document

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-96 max-h-[80vh] flex flex-col border border-gray-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-base font-semibold text-white">Configurações Globais</h2>
          <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          <TextInput label="Nome do Email" value={gs.emailName} onChange={v => updateGlobalSettings({ emailName: v })} />
          <TextArea label="Texto de Pré-visualização (oculto)" value={gs.previewText} onChange={v => updateGlobalSettings({ previewText: v })} rows={2} placeholder="Aparece no preview da caixa de entrada..." />
          <ColorPicker label="Cor de Fundo da Página" value={gs.backgroundColor} onChange={v => updateGlobalSettings({ backgroundColor: v })} />
          <FontSelector label="Fonte Padrão" value={gs.defaultFontFamily} onChange={v => updateGlobalSettings({ defaultFontFamily: v })} />
          <ColorPicker label="Cor de Texto Padrão" value={gs.defaultTextColor} onChange={v => updateGlobalSettings({ defaultTextColor: v })} />
          <ColorPicker label="Cor de Link Padrão" value={gs.defaultLinkColor} onChange={v => updateGlobalSettings({ defaultLinkColor: v })} />
        </div>
        <div className="px-6 py-4 border-t border-gray-700">
          <button onClick={() => setShowSettings(false)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">Fechar</button>
        </div>
      </div>
    </div>
  )
}
