import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useEditorStore } from '../../store/editorStore'
import { SortableBlock } from './SortableBlock'
import { BlockItem } from './BlockItem'

export function Canvas() {
  const { document, selectedBlockId, selectBlock, reorderBlocks } = useEditorStore()
  const { blocks, globalSettings: gs } = document

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = blocks.findIndex(b => b.id === active.id)
    const to = blocks.findIndex(b => b.id === over.id)
    if (from !== -1 && to !== -1) reorderBlocks(from, to)
  }

  return (
    <div
      className="flex-1 overflow-y-auto bg-gray-950"
      onClick={() => selectBlock(null)}
    >
      <div className="py-8 px-4 min-h-full">
        <div
          style={{ width: gs.emailWidth, margin: '0 auto' }}
          className="shadow-2xl shadow-black/50"
        >
          {blocks.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-32 text-center"
              style={{ backgroundColor: '#ffffff', minHeight: 400 }}
            >
              <div className="text-5xl mb-4">📧</div>
              <div className="text-gray-400 text-lg font-medium mb-2">Seu email está vazio</div>
              <div className="text-gray-500 text-sm">Adicione blocos pelo painel esquerdo para começar</div>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <div className="mt-8">
                  {blocks.map(block => (
                    <SortableBlock key={block.id} id={block.id}>
                      <BlockItem block={block} isSelected={selectedBlockId === block.id} />
                    </SortableBlock>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  )
}
