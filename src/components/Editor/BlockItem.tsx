import type { Block } from '../../blocks/types'
import { BLOCK_LABELS } from '../../blocks/index'
import { HeroBlock } from '../../blocks/hero/HeroBlock'
import { AnnouncementBlock } from '../../blocks/announcement/AnnouncementBlock'
import { SectionHeaderBlock } from '../../blocks/sectionHeader/SectionHeaderBlock'
import { CardGridBlock } from '../../blocks/cardGrid/CardGridBlock'
import { TestimonialBlock } from '../../blocks/testimonial/TestimonialBlock'
import { LogoBarBlock } from '../../blocks/logoBar/LogoBarBlock'
import { FeatureListBlock } from '../../blocks/featureList/FeatureListBlock'
import { CtaBannerBlock } from '../../blocks/ctaBanner/CtaBannerBlock'
import { ComparisonTableBlock } from '../../blocks/comparisonTable/ComparisonTableBlock'
import { PricingBlock } from '../../blocks/pricing/PricingBlock'
import { FaqBlock } from '../../blocks/faq/FaqBlock'
import { SocialProofBlock } from '../../blocks/socialProof/SocialProofBlock'
import { FooterBlock } from '../../blocks/footer/FooterBlock'
import { useEditorStore } from '../../store/editorStore'

function renderBlock(block: Block) {
  const p = block.props as never
  switch (block.type) {
    case 'hero': return <HeroBlock props={p} />
    case 'announcement': return <AnnouncementBlock props={p} />
    case 'sectionHeader': return <SectionHeaderBlock props={p} />
    case 'cardGrid': return <CardGridBlock props={p} />
    case 'testimonial': return <TestimonialBlock props={p} />
    case 'logoBar': return <LogoBarBlock props={p} />
    case 'featureList': return <FeatureListBlock props={p} />
    case 'ctaBanner': return <CtaBannerBlock props={p} />
    case 'comparisonTable': return <ComparisonTableBlock props={p} />
    case 'pricing': return <PricingBlock props={p} />
    case 'faq': return <FaqBlock props={p} />
    case 'socialProof': return <SocialProofBlock props={p} />
    case 'footer': return <FooterBlock props={p} />
    default: return <div className="p-4 text-gray-500">Bloco desconhecido</div>
  }
}

interface BlockItemProps {
  block: Block
  isSelected: boolean
}

export function BlockItem({ block, isSelected }: BlockItemProps) {
  const { selectBlock, removeBlock, duplicateBlock, toggleBlockVisibility } = useEditorStore()

  return (
    <div
      className={`relative group cursor-pointer ${!block.visible ? 'opacity-40' : ''}`}
      onClick={e => { e.stopPropagation(); selectBlock(block.id) }}
    >
      {/* Selection outline */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-all ${isSelected ? 'ring-2 ring-indigo-500' : 'group-hover:ring-1 group-hover:ring-indigo-400/50'}`} />

      {/* Toolbar */}
      {isSelected && (
        <div
          className="absolute -top-8 left-0 flex items-center gap-1 bg-indigo-600 text-white text-xs rounded-t px-2 py-1 z-20"
          onClick={e => e.stopPropagation()}
        >
          <span className="font-medium mr-1">{BLOCK_LABELS[block.type]}</span>
          <button onClick={() => toggleBlockVisibility(block.id)} className="hover:text-indigo-200 px-1" title={block.visible ? 'Ocultar' : 'Mostrar'}>
            {block.visible ? '👁' : '👁‍🗨'}
          </button>
          <button onClick={() => duplicateBlock(block.id)} className="hover:text-indigo-200 px-1" title="Duplicar">⧉</button>
          <button onClick={() => { if (confirm('Remover este bloco?')) removeBlock(block.id) }} className="hover:text-red-300 px-1" title="Excluir">✕</button>
        </div>
      )}

      {/* Drag handle */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-indigo-600/0 group-hover:bg-indigo-600/20 flex items-center justify-center cursor-grab active:cursor-grabbing z-10">
        <div className="opacity-0 group-hover:opacity-100 text-indigo-400 text-xs">⠿</div>
      </div>

      <div className="overflow-hidden">
        {renderBlock(block)}
      </div>
    </div>
  )
}
