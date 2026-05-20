import { useEditorStore } from '../../store/editorStore'
import { BLOCK_LABELS, BLOCK_ICONS } from '../../blocks/index'
import type { BlockType } from '../../blocks/types'

const BLOCK_TYPES: BlockType[] = [
  'announcement', 'hero', 'sectionHeader', 'cardGrid', 'ctaBanner',
  'featureList', 'testimonial', 'logoBar', 'comparisonTable', 'pricing',
  'faq', 'socialProof', 'footer',
]

export function BlockLibrary() {
  const { addBlock } = useEditorStore()

  return (
    <div className="w-60 bg-gray-800 border-r border-gray-700 flex flex-col flex-shrink-0">
      <div className="px-4 py-3 border-b border-gray-700">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Blocos</h2>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {BLOCK_TYPES.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-700 transition-colors group"
          >
            <span className="text-lg w-6 text-center flex-shrink-0">{BLOCK_ICONS[type]}</span>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{BLOCK_LABELS[type]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
