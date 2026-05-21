import { useEditorStore } from '../../store/editorStore'
import { Section } from '../ui/Section'
import { TextInput } from '../ui/TextInput'
import { TextArea } from '../ui/TextArea'
import { ColorPicker } from '../ui/ColorPicker'
import { FontSelector } from '../ui/FontSelector'
import { SliderInput } from '../ui/SliderInput'
import { NumberInput } from '../ui/NumberInput'
import { ToggleSwitch } from '../ui/ToggleSwitch'
import { SelectInput } from '../ui/SelectInput'
import { ImageInput } from '../ui/ImageInput'
import { ListEditor } from '../ui/ListEditor'
import { StarRating } from '../ui/StarRating'
import { BLOCK_LABELS } from '../../blocks/index'
import { nanoid } from '../../utils/nanoid'
import type {
  HeroProps, AnnouncementProps, SectionHeaderProps, CardGridProps, CardItem,
  TestimonialProps, TestimonialItem, LogoBarProps, LogoItem, FeatureListProps, FeatureItem,
  CtaBannerProps, ComparisonTableProps, PricingProps, PricingPlan,
  FaqProps, FaqItem, SocialProofProps, FooterProps, FooterLink, SocialLink,
  StepsProps, StepItem, StatsProps, StatItem, TrustBadgesProps, TrustBadgeItem, TwoColumnProps,
} from '../../blocks/types'

const ALIGNMENT_OPTIONS = [{ label: 'Esquerda', value: 'left' }, { label: 'Centro', value: 'center' }, { label: 'Direita', value: 'right' }]
const FONT_WEIGHT_OPTIONS = [{ label: 'Normal', value: '400' }, { label: 'Médio', value: '500' }, { label: 'Seminegrito', value: '600' }, { label: 'Negrito', value: '700' }, { label: 'Extra Negrito', value: '800' }, { label: 'Preto', value: '900' }]
const VALIGN_OPTIONS = [{ label: 'Topo', value: 'top' }, { label: 'Centro', value: 'middle' }, { label: 'Base', value: 'bottom' }]
const BG_POSITION_OPTIONS = [
  { label: 'Centro', value: 'center center' },
  { label: 'Topo', value: 'center top' },
  { label: 'Base', value: 'center bottom' },
  { label: 'Esquerda', value: 'left center' },
  { label: 'Direita', value: 'right center' },
  { label: 'Topo Esquerda', value: 'left top' },
  { label: 'Topo Direita', value: 'right top' },
]
function HeroControls({ props: p, update }: { props: HeroProps, update: (p: Partial<HeroProps>) => void }) {
  return (
    <>
      <Section title="Fundo">
        <ImageInput label="Imagem de Fundo" value={p.backgroundImage} onChange={v => update({ backgroundImage: v })} assetType="images" />
        <TextInput label="Texto Alt da Imagem" value={p.backgroundImageAlt} onChange={v => update({ backgroundImageAlt: v })} />
        <SelectInput label="Posição da Imagem" value={p.backgroundPosition ?? 'center center'} onChange={v => update({ backgroundPosition: v })} options={BG_POSITION_OPTIONS} />
      </Section>
      <Section title="Badge / Etiqueta" defaultOpen={false}>
        <TextInput label="Texto do Badge" value={p.badge} onChange={v => update({ badge: v })} placeholder="Opcional" />
        <ColorPicker label="Cor do Badge" value={p.badgeColor} onChange={v => update({ badgeColor: v })} />
      </Section>
      <Section title="Título Principal">
        <TextArea label="Título (Enter = quebra de linha)" value={p.headline} onChange={v => update({ headline: v })} rows={3} />
        <FontSelector label="Fonte" value={p.headlineFontFamily} onChange={v => update({ headlineFontFamily: v })} />
        <SliderInput label="Tamanho" value={p.headlineFontSize} onChange={v => update({ headlineFontSize: v })} min={20} max={80} unit="px" />
        <SelectInput label="Peso" value={p.headlineFontWeight} onChange={v => update({ headlineFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <ColorPicker label="Cor" value={p.headlineColor} onChange={v => update({ headlineColor: v })} />
        <SliderInput label="Entrelinha" value={p.headlineLineHeight ?? 1.15} onChange={v => update({ headlineLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaçamento entre Letras" value={p.headlineLetterSpacing ?? 0} onChange={v => update({ headlineLetterSpacing: v })} min={0} max={12} unit="px" />
      </Section>
      <Section title="Subtítulo" defaultOpen={false}>
        <TextArea label="Subtítulo (Enter = quebra de linha)" value={p.subtitle} onChange={v => update({ subtitle: v })} rows={3} />
        <FontSelector label="Fonte" value={p.subtitleFontFamily} onChange={v => update({ subtitleFontFamily: v })} />
        <SliderInput label="Tamanho" value={p.subtitleFontSize} onChange={v => update({ subtitleFontSize: v })} min={12} max={32} unit="px" />
        <ColorPicker label="Cor" value={p.subtitleColor} onChange={v => update({ subtitleColor: v })} />
        <SliderInput label="Entrelinha" value={p.subtitleLineHeight ?? 1.6} onChange={v => update({ subtitleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaçamento entre Letras" value={p.subtitleLetterSpacing ?? 0} onChange={v => update({ subtitleLetterSpacing: v })} min={0} max={12} unit="px" />
      </Section>
      <Section title="Botão CTA" defaultOpen={false}>
        <TextInput label="Texto do Botão" value={p.ctaText} onChange={v => update({ ctaText: v })} />
        <TextInput label="URL do Botão" value={p.ctaUrl} onChange={v => update({ ctaUrl: v })} placeholder="https://" />
        <ColorPicker label="Fundo" value={p.ctaBackgroundColor} onChange={v => update({ ctaBackgroundColor: v })} />
        <ColorPicker label="Cor do Texto" value={p.ctaTextColor} onChange={v => update({ ctaTextColor: v })} />
        <SliderInput label="Tamanho da Fonte" value={p.ctaFontSize ?? 16} onChange={v => update({ ctaFontSize: v })} min={11} max={28} unit="px" />
        <SelectInput label="Peso da Fonte" value={p.ctaFontWeight ?? '700'} onChange={v => update({ ctaFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <SliderInput label="Padding Vertical" value={p.ctaPaddingV ?? 14} onChange={v => update({ ctaPaddingV: v })} min={6} max={32} unit="px" />
        <SliderInput label="Padding Horizontal" value={p.ctaPaddingH ?? 36} onChange={v => update({ ctaPaddingH: v })} min={12} max={80} unit="px" />
        <SliderInput label="Arredondamento" value={p.ctaBorderRadius} onChange={v => update({ ctaBorderRadius: v })} min={0} max={40} unit="px" />
        <SelectInput label="Alinhamento do Botão" value={p.ctaAlignment ?? p.contentAlignment} onChange={v => update({ ctaAlignment: v as HeroProps['ctaAlignment'] })} options={ALIGNMENT_OPTIONS} />
      </Section>
      <Section title="Layout" defaultOpen={false}>
        <SelectInput label="Alinhamento do Conteúdo" value={p.contentAlignment} onChange={v => update({ contentAlignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
        <SliderInput label="Altura Mínima" value={p.minHeight} onChange={v => update({ minHeight: v })} min={200} max={800} unit="px" />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={160} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={160} unit="px" />
      </Section>
    </>
  )
}

function AnnouncementControls({ props: p, update }: { props: AnnouncementProps, update: (p: Partial<AnnouncementProps>) => void }) {
  return (
    <>
      <Section title="Conteúdo">
        <TextArea label="Texto" value={p.text} onChange={v => update({ text: v })} rows={2} />
        <ToggleSwitch label="Mostrar Ícone" value={p.showIcon} onChange={v => update({ showIcon: v })} />
        {p.showIcon && <TextInput label="Emoji" value={p.iconEmoji} onChange={v => update({ iconEmoji: v })} />}
        <SelectInput label="Alinhamento" value={p.alignment} onChange={v => update({ alignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
      </Section>
      <Section title="Tipografia">
        <FontSelector label="Fonte" value={p.fontFamily} onChange={v => update({ fontFamily: v })} />
        <SliderInput label="Tamanho" value={p.fontSize} onChange={v => update({ fontSize: v })} min={10} max={24} unit="px" />
        <SelectInput label="Peso" value={p.fontWeight} onChange={v => update({ fontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <ColorPicker label="Cor do Texto" value={p.textColor} onChange={v => update({ textColor: v })} />
        <SliderInput label="Entrelinha" value={p.lineHeight ?? 1.5} onChange={v => update({ lineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaçamento entre Letras" value={p.letterSpacing ?? 0} onChange={v => update({ letterSpacing: v })} min={0} max={8} unit="px" />
      </Section>
      <Section title="Cores & Espaçamento" defaultOpen={false}>
        <ColorPicker label="Cor de Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={60} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={60} unit="px" />
      </Section>
    </>
  )
}

function SectionHeaderControls({ props: p, update }: { props: SectionHeaderProps, update: (p: Partial<SectionHeaderProps>) => void }) {
  return (
    <>
      <Section title="Título">
        <TextArea label="Título (Enter = quebra de linha)" value={p.title} onChange={v => update({ title: v })} rows={2} />
        <FontSelector label="Fonte" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <SliderInput label="Tamanho" value={p.titleFontSize} onChange={v => update({ titleFontSize: v })} min={20} max={72} unit="px" />
        <SelectInput label="Peso" value={p.titleFontWeight} onChange={v => update({ titleFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <ColorPicker label="Cor" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <SliderInput label="Entrelinha" value={p.titleLineHeight ?? 1.2} onChange={v => update({ titleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaçamento entre Letras" value={p.titleLetterSpacing ?? 0} onChange={v => update({ titleLetterSpacing: v })} min={0} max={12} unit="px" />
      </Section>
      <Section title="Subtítulo" defaultOpen={false}>
        <TextArea label="Subtítulo (Enter = quebra de linha)" value={p.subtitle} onChange={v => update({ subtitle: v })} rows={2} />
        <FontSelector label="Fonte" value={p.subtitleFontFamily} onChange={v => update({ subtitleFontFamily: v })} />
        <SliderInput label="Tamanho" value={p.subtitleFontSize} onChange={v => update({ subtitleFontSize: v })} min={12} max={36} unit="px" />
        <ColorPicker label="Cor" value={p.subtitleColor} onChange={v => update({ subtitleColor: v })} />
        <SliderInput label="Entrelinha" value={p.subtitleLineHeight ?? 1.4} onChange={v => update({ subtitleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaçamento entre Letras" value={p.subtitleLetterSpacing ?? 0} onChange={v => update({ subtitleLetterSpacing: v })} min={0} max={12} unit="px" />
      </Section>
      <Section title="Layout" defaultOpen={false}>
        <SelectInput label="Alinhamento" value={p.alignment} onChange={v => update({ alignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
        <ColorPicker label="Cor de Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
    </>
  )
}

function CardGridControls({ props: p, update }: { props: CardGridProps, update: (p: Partial<CardGridProps>) => void }) {
  const defaultCard: Omit<CardItem, 'id'> = {
    image: '', imageAlt: '', imageHeight: 180, badge: '', badgeColor: '#f97316', title: 'Novo Card',
    description: 'Descrição do card.', ctaText: 'Saiba Mais', ctaUrl: '#',
    ctaBackgroundColor: '#111827', ctaTextColor: '#ffffff', cardBackgroundColor: '#ffffff', borderRadius: 8,
  }
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Colunas" value={String(p.columns)} onChange={v => update({ columns: Number(v) as 2|3|4 })} options={[{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }]} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço entre Colunas" value={p.columnGap} onChange={v => update({ columnGap: v })} min={0} max={40} unit="px" />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <SliderInput label="Tamanho do Título" value={p.titleFontSize} onChange={v => update({ titleFontSize: v })} min={12} max={24} unit="px" />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <SliderInput label="Entrelinha do Título" value={p.titleLineHeight ?? 1.3} onChange={v => update({ titleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Título" value={p.titleLetterSpacing ?? 0} onChange={v => update({ titleLetterSpacing: v })} min={0} max={8} unit="px" />
        <FontSelector label="Fonte da Descrição" value={p.descriptionFontFamily} onChange={v => update({ descriptionFontFamily: v })} />
        <SliderInput label="Tamanho da Descrição" value={p.descriptionFontSize} onChange={v => update({ descriptionFontSize: v })} min={10} max={20} unit="px" />
        <ColorPicker label="Cor da Descrição" value={p.descriptionColor} onChange={v => update({ descriptionColor: v })} />
        <SliderInput label="Entrelinha da Descrição" value={p.descriptionLineHeight ?? 1.5} onChange={v => update({ descriptionLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Descrição" value={p.descriptionLetterSpacing ?? 0} onChange={v => update({ descriptionLetterSpacing: v })} min={0} max={8} unit="px" />
      </Section>
      <Section title="Cards">
        <ListEditor<CardItem>
          label="Cards"
          items={p.cards}
          onChange={cards => update({ cards })}
          defaultItem={defaultCard}
          renderItem={(card, onChange) => (
            <>
              <ImageInput label="Imagem" value={card.image} onChange={v => onChange({ ...card, image: v })} assetType="images" />
              <TextInput label="Texto Alt" value={card.imageAlt} onChange={v => onChange({ ...card, imageAlt: v })} />
              <SliderInput label="Altura da Imagem" value={card.imageHeight ?? 180} onChange={v => onChange({ ...card, imageHeight: v })} min={80} max={400} unit="px" />
              <TextInput label="Badge" value={card.badge} onChange={v => onChange({ ...card, badge: v })} />
              <ColorPicker label="Cor do Badge" value={card.badgeColor} onChange={v => onChange({ ...card, badgeColor: v })} />
              <TextInput label="Título" value={card.title} onChange={v => onChange({ ...card, title: v })} />
              <TextArea label="Descrição" value={card.description} onChange={v => onChange({ ...card, description: v })} rows={2} />
              <TextInput label="Texto do CTA" value={card.ctaText} onChange={v => onChange({ ...card, ctaText: v })} />
              <TextInput label="URL do CTA" value={card.ctaUrl} onChange={v => onChange({ ...card, ctaUrl: v })} />
              <ColorPicker label="Fundo do CTA" value={card.ctaBackgroundColor} onChange={v => onChange({ ...card, ctaBackgroundColor: v })} />
              <ColorPicker label="Cor do Texto CTA" value={card.ctaTextColor} onChange={v => onChange({ ...card, ctaTextColor: v })} />
              <ColorPicker label="Fundo do Card" value={card.cardBackgroundColor} onChange={v => onChange({ ...card, cardBackgroundColor: v })} />
              <SliderInput label="Arredondamento" value={card.borderRadius} onChange={v => onChange({ ...card, borderRadius: v })} min={0} max={24} unit="px" />
            </>
          )}
        />
      </Section>
    </>
  )
}

function TestimonialControls({ props: p, update }: { props: TestimonialProps, update: (p: Partial<TestimonialProps>) => void }) {
  const defaultItem: Omit<TestimonialItem, 'id'> = {
    avatar: '', name: 'Nome', role: 'Cargo', quote: '"Texto do depoimento aqui."',
    ctaText: '', ctaUrl: '#', ctaBackgroundColor: '#111827', ctaTextColor: '#ffffff',
    cardBackgroundColor: '#f9fafb', borderRadius: 8, stars: 5,
  }
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Layout" value={p.layout} onChange={v => update({ layout: v as 'single' | 'carousel-static' })} options={[{ label: 'Individual', value: 'single' }, { label: 'Lado a Lado (3)', value: 'carousel-static' }]} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte do Nome" value={p.nameFontFamily} onChange={v => update({ nameFontFamily: v })} />
        <SliderInput label="Tamanho do Nome" value={p.nameFontSize ?? 13} onChange={v => update({ nameFontSize: v })} min={10} max={20} unit="px" />
        <SliderInput label="Entrelinha do Nome" value={p.nameLineHeight ?? 1.4} onChange={v => update({ nameLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <ColorPicker label="Cor do Nome" value={p.nameColor} onChange={v => update({ nameColor: v })} />
        <FontSelector label="Fonte da Citação" value={p.quoteFontFamily} onChange={v => update({ quoteFontFamily: v })} />
        <SliderInput label="Tamanho da Citação" value={p.quoteFontSize ?? 14} onChange={v => update({ quoteFontSize: v })} min={10} max={20} unit="px" />
        <SliderInput label="Entrelinha da Citação" value={p.quoteLineHeight ?? 1.6} onChange={v => update({ quoteLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <ColorPicker label="Cor da Citação" value={p.quoteColor} onChange={v => update({ quoteColor: v })} />
      </Section>
      <Section title="Depoimentos">
        <ListEditor<TestimonialItem>
          label="Depoimentos"
          items={p.testimonials}
          onChange={testimonials => update({ testimonials })}
          defaultItem={defaultItem}
          renderItem={(item, onChange) => (
            <>
              <ImageInput label="Avatar" value={item.avatar} onChange={v => onChange({ ...item, avatar: v })} assetType="images" />
              <TextInput label="Nome" value={item.name} onChange={v => onChange({ ...item, name: v })} />
              <TextInput label="Cargo" value={item.role} onChange={v => onChange({ ...item, role: v })} />
              <TextArea label="Citação" value={item.quote} onChange={v => onChange({ ...item, quote: v })} rows={3} />
              <StarRating label="Estrelas" value={item.stars} onChange={v => onChange({ ...item, stars: v })} />
              <ColorPicker label="Fundo do Card" value={item.cardBackgroundColor} onChange={v => onChange({ ...item, cardBackgroundColor: v })} />
              <SliderInput label="Arredondamento" value={item.borderRadius} onChange={v => onChange({ ...item, borderRadius: v })} min={0} max={24} unit="px" />
              <TextInput label="Texto do CTA" value={item.ctaText} onChange={v => onChange({ ...item, ctaText: v })} />
              <TextInput label="URL do CTA" value={item.ctaUrl} onChange={v => onChange({ ...item, ctaUrl: v })} />
            </>
          )}
        />
      </Section>
    </>
  )
}

function LogoBarControls({ props: p, update }: { props: LogoBarProps, update: (p: Partial<LogoBarProps>) => void }) {
  const defaultLogo: Omit<LogoItem, 'id'> = { image: '', alt: 'Logo', url: '#', maxHeight: 32 }
  return (
    <>
      <Section title="Conteúdo">
        <TextInput label="Título" value={p.title} onChange={v => update({ title: v })} placeholder="Como visto em" />
        <SelectInput label="Alinhamento" value={p.alignment} onChange={v => update({ alignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
        <SliderInput label="Opacidade" value={p.opacity} onChange={v => update({ opacity: v })} unit="%" />
        <SliderInput label="Espaçamento" value={p.gap} onChange={v => update({ gap: v })} min={8} max={80} unit="px" />
      </Section>
      <Section title="Cores & Espaçamento" defaultOpen={false}>
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={80} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={80} unit="px" />
      </Section>
      <Section title="Logos">
        <ListEditor<LogoItem>
          label="Logos"
          items={p.logos}
          onChange={logos => update({ logos })}
          defaultItem={defaultLogo}
          renderItem={(logo, onChange) => (
            <>
              <ImageInput label="Imagem do Logo" value={logo.image} onChange={v => onChange({ ...logo, image: v })} assetType="images" />
              <TextInput label="Texto Alt" value={logo.alt} onChange={v => onChange({ ...logo, alt: v })} />
              <TextInput label="URL" value={logo.url} onChange={v => onChange({ ...logo, url: v })} />
              <SliderInput label="Altura Máxima" value={logo.maxHeight} onChange={v => onChange({ ...logo, maxHeight: v })} min={16} max={80} unit="px" />
            </>
          )}
        />
      </Section>
    </>
  )
}

function FeatureListControls({ props: p, update }: { props: FeatureListProps, update: (p: Partial<FeatureListProps>) => void }) {
  const defaultFeature: Omit<FeatureItem, 'id'> = { icon: '⭐', title: 'Diferencial', description: 'Descrição do diferencial.' }
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Colunas" value={String(p.columns)} onChange={v => update({ columns: Number(v) as 1|2 })} options={[{ label: '1 Coluna', value: '1' }, { label: '2 Colunas', value: '2' }]} />
        <SelectInput label="Posição do Ícone" value={p.iconPosition ?? 'left'} onChange={v => update({ iconPosition: v as 'left' | 'top' })} options={[{ label: 'Esquerda', value: 'left' }, { label: 'Acima', value: 'top' }]} />
        {(p.iconPosition ?? 'left') === 'left' && (
          <SelectInput label="Alinhamento Vertical do Ícone" value={p.iconVerticalAlign ?? 'top'} onChange={v => update({ iconVerticalAlign: v as 'top' | 'middle' | 'bottom' })} options={VALIGN_OPTIONS} />
        )}
        <SliderInput label="Tamanho do Ícone" value={p.iconSize} onChange={v => update({ iconSize: v })} min={16} max={64} unit="px" />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <SliderInput label="Tamanho do Título" value={p.titleFontSize} onChange={v => update({ titleFontSize: v })} min={12} max={24} unit="px" />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <SliderInput label="Entrelinha do Título" value={p.titleLineHeight ?? 1.3} onChange={v => update({ titleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Título" value={p.titleLetterSpacing ?? 0} onChange={v => update({ titleLetterSpacing: v })} min={0} max={8} unit="px" />
        <FontSelector label="Fonte da Descrição" value={p.descriptionFontFamily} onChange={v => update({ descriptionFontFamily: v })} />
        <SliderInput label="Tamanho da Descrição" value={p.descriptionFontSize} onChange={v => update({ descriptionFontSize: v })} min={10} max={20} unit="px" />
        <ColorPicker label="Cor da Descrição" value={p.descriptionColor} onChange={v => update({ descriptionColor: v })} />
        <SliderInput label="Entrelinha da Descrição" value={p.descriptionLineHeight ?? 1.55} onChange={v => update({ descriptionLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Descrição" value={p.descriptionLetterSpacing ?? 0} onChange={v => update({ descriptionLetterSpacing: v })} min={0} max={8} unit="px" />
      </Section>
      <Section title="Diferenciais">
        <ListEditor<FeatureItem>
          label="Diferenciais"
          items={p.features}
          onChange={features => update({ features })}
          defaultItem={defaultFeature}
          renderItem={(f, onChange) => (
            <>
              <ImageInput label="Ícone (emoji, URL ou biblioteca)" value={f.icon} onChange={v => onChange({ ...f, icon: v })} assetType="icons" />
              <TextInput label="Título" value={f.title} onChange={v => onChange({ ...f, title: v })} />
              <TextArea label="Descrição" value={f.description} onChange={v => onChange({ ...f, description: v })} rows={2} />
            </>
          )}
        />
      </Section>
    </>
  )
}

function CtaBannerControls({ props: p, update }: { props: CtaBannerProps, update: (p: Partial<CtaBannerProps>) => void }) {
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Layout" value={p.layout} onChange={v => update({ layout: v as CtaBannerProps['layout'] })} options={[{ label: 'Imagem à Direita', value: 'image-right' }, { label: 'Imagem à Esquerda', value: 'image-left' }, { label: 'Centralizado', value: 'centered' }]} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Conteúdo">
        <TextInput label="Badge" value={p.badge} onChange={v => update({ badge: v })} />
        <ColorPicker label="Fundo do Badge" value={p.badgeColor} onChange={v => update({ badgeColor: v })} />
        <ColorPicker label="Texto do Badge" value={p.badgeTextColor} onChange={v => update({ badgeTextColor: v })} />
        <TextArea label="Título (Enter = quebra de linha)" value={p.headline} onChange={v => update({ headline: v })} rows={2} />
        <FontSelector label="Fonte do Título" value={p.headlineFontFamily} onChange={v => update({ headlineFontFamily: v })} />
        <SliderInput label="Tamanho do Título" value={p.headlineFontSize} onChange={v => update({ headlineFontSize: v })} min={18} max={56} unit="px" />
        <ColorPicker label="Cor do Título" value={p.headlineColor} onChange={v => update({ headlineColor: v })} />
        <SliderInput label="Entrelinha do Título" value={p.headlineLineHeight ?? 1.2} onChange={v => update({ headlineLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Título" value={p.headlineLetterSpacing ?? 0} onChange={v => update({ headlineLetterSpacing: v })} min={0} max={12} unit="px" />
        <TextArea label="Texto do Corpo (Enter = quebra)" value={p.bodyText} onChange={v => update({ bodyText: v })} rows={2} />
        <FontSelector label="Fonte do Corpo" value={p.bodyFontFamily} onChange={v => update({ bodyFontFamily: v })} />
        <SliderInput label="Tamanho do Corpo" value={p.bodyFontSize ?? 16} onChange={v => update({ bodyFontSize: v })} min={12} max={24} unit="px" />
        <ColorPicker label="Cor do Corpo" value={p.bodyColor} onChange={v => update({ bodyColor: v })} />
        <SliderInput label="Entrelinha do Corpo" value={p.bodyLineHeight ?? 1.6} onChange={v => update({ bodyLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
      </Section>
      <Section title="Imagem" defaultOpen={false}>
        <ImageInput label="Imagem" value={p.image} onChange={v => update({ image: v })} assetType="images" />
        <TextInput label="Texto Alt" value={p.imageAlt} onChange={v => update({ imageAlt: v })} />
        <SliderInput label="Largura da Imagem" value={p.imageWidth ?? 220} onChange={v => update({ imageWidth: v })} min={80} max={400} unit="px" />
        <SelectInput label="Alinhamento da Imagem" value={p.imageAlignment ?? 'center'} onChange={v => update({ imageAlignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
      </Section>
      <Section title="Botão CTA" defaultOpen={false}>
        <TextInput label="Texto do Botão" value={p.ctaText} onChange={v => update({ ctaText: v })} />
        <TextInput label="URL do Botão" value={p.ctaUrl} onChange={v => update({ ctaUrl: v })} />
        <ColorPicker label="Fundo" value={p.ctaBackgroundColor} onChange={v => update({ ctaBackgroundColor: v })} />
        <ColorPicker label="Cor do Texto" value={p.ctaTextColor} onChange={v => update({ ctaTextColor: v })} />
        <SliderInput label="Tamanho da Fonte" value={p.ctaFontSize ?? 16} onChange={v => update({ ctaFontSize: v })} min={11} max={28} unit="px" />
        <SelectInput label="Peso da Fonte" value={p.ctaFontWeight ?? '700'} onChange={v => update({ ctaFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <SliderInput label="Padding Vertical" value={p.ctaPaddingV ?? 14} onChange={v => update({ ctaPaddingV: v })} min={6} max={32} unit="px" />
        <SliderInput label="Padding Horizontal" value={p.ctaPaddingH ?? 28} onChange={v => update({ ctaPaddingH: v })} min={12} max={80} unit="px" />
        <SliderInput label="Arredondamento" value={p.ctaBorderRadius} onChange={v => update({ ctaBorderRadius: v })} min={0} max={40} unit="px" />
      </Section>
    </>
  )
}

function ComparisonTableControls({ props: p, update }: { props: ComparisonTableProps, update: (p: Partial<ComparisonTableProps>) => void }) {
  return (
    <>
      <Section title="Cabeçalho">
        <TextInput label="Título" value={p.title} onChange={v => update({ title: v })} />
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <ColorPicker label="Cor do ✓" value={p.checkColor} onChange={v => update({ checkColor: v })} />
        <ColorPicker label="Cor do ✕" value={p.crossColor} onChange={v => update({ crossColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Colunas">
        <ListEditor
          label="Colunas"
          items={p.columns}
          onChange={columns => update({ columns })}
          defaultItem={{ label: 'Coluna', isHighlight: false, highlightColor: '#6366f1', logo: '' }}
          renderItem={(col, onChange) => (
            <>
              <TextInput label="Rótulo" value={col.label} onChange={v => onChange({ ...col, label: v })} />
              <ToggleSwitch label="Destaque" value={col.isHighlight} onChange={v => onChange({ ...col, isHighlight: v })} />
              {col.isHighlight && <ColorPicker label="Cor do Destaque" value={col.highlightColor} onChange={v => onChange({ ...col, highlightColor: v })} />}
            </>
          )}
        />
      </Section>
      <Section title="Linhas">
        <ListEditor
          label="Linhas de Funcionalidades"
          items={p.rows}
          onChange={rows => update({ rows })}
          defaultItem={{ feature: 'Nome da funcionalidade', values: {} }}
          renderItem={(row, onChange) => (
            <>
              <TextInput label="Funcionalidade" value={row.feature} onChange={v => onChange({ ...row, feature: v })} />
              {p.columns.map(col => (
                <SelectInput
                  key={col.id}
                  label={col.label}
                  value={String(row.values[col.id] ?? 'false')}
                  onChange={v => onChange({ ...row, values: { ...row.values, [col.id]: v === 'true' ? true : v === 'false' ? false : v } })}
                  options={[{ label: '✓ Sim', value: 'true' }, { label: '✕ Não', value: 'false' }]}
                />
              ))}
            </>
          )}
        />
      </Section>
    </>
  )
}

function PricingControls({ props: p, update }: { props: PricingProps, update: (p: Partial<PricingProps>) => void }) {
  const defaultPlan: Omit<PricingPlan, 'id'> = {
    name: 'Plano', description: 'Descrição do plano', price: 'R$0', priceUnit: '/mês',
    isHighlight: false, highlightLabel: '', highlightColor: '#6366f1', cardBackgroundColor: '#ffffff',
    features: ['Funcionalidade 1'], ctaText: 'Começar', ctaUrl: '#',
    ctaBackgroundColor: '#111827', ctaTextColor: '#ffffff', borderRadius: 8,
  }
  return (
    <>
      <Section title="Layout">
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <FontSelector label="Fonte do Preço" value={p.priceFontFamily} onChange={v => update({ priceFontFamily: v })} />
        <ColorPicker label="Cor do Preço" value={p.priceColor} onChange={v => update({ priceColor: v })} />
        <ColorPicker label="Cor dos Itens" value={p.featureColor} onChange={v => update({ featureColor: v })} />
      </Section>
      <Section title="Planos">
        <ListEditor<PricingPlan>
          label="Planos"
          items={p.plans}
          onChange={plans => update({ plans })}
          defaultItem={defaultPlan}
          maxItems={4}
          renderItem={(plan, onChange) => (
            <>
              <TextInput label="Nome" value={plan.name} onChange={v => onChange({ ...plan, name: v })} />
              <TextInput label="Descrição" value={plan.description} onChange={v => onChange({ ...plan, description: v })} />
              <TextInput label="Preço" value={plan.price} onChange={v => onChange({ ...plan, price: v })} placeholder="R$29" />
              <TextInput label="Unidade do Preço" value={plan.priceUnit} onChange={v => onChange({ ...plan, priceUnit: v })} placeholder="/mês" />
              <ToggleSwitch label="Destacado" value={plan.isHighlight} onChange={v => onChange({ ...plan, isHighlight: v })} />
              {plan.isHighlight && <TextInput label="Rótulo do Destaque" value={plan.highlightLabel} onChange={v => onChange({ ...plan, highlightLabel: v })} />}
              <ColorPicker label="Fundo do Card" value={plan.cardBackgroundColor} onChange={v => onChange({ ...plan, cardBackgroundColor: v })} />
              <TextArea label="Funcionalidades (uma por linha)" value={plan.features.join('\n')} onChange={v => onChange({ ...plan, features: v.split('\n').filter(Boolean) })} rows={4} />
              <TextInput label="Texto do CTA" value={plan.ctaText} onChange={v => onChange({ ...plan, ctaText: v })} />
              <TextInput label="URL do CTA" value={plan.ctaUrl} onChange={v => onChange({ ...plan, ctaUrl: v })} />
              <ColorPicker label="Fundo do CTA" value={plan.ctaBackgroundColor} onChange={v => onChange({ ...plan, ctaBackgroundColor: v })} />
              <ColorPicker label="Cor do Texto CTA" value={plan.ctaTextColor} onChange={v => onChange({ ...plan, ctaTextColor: v })} />
            </>
          )}
        />
      </Section>
    </>
  )
}

function FaqControls({ props: p, update }: { props: FaqProps, update: (p: Partial<FaqProps>) => void }) {
  const defaultFaq: Omit<FaqItem, 'id'> = { question: 'Pergunta?', answer: 'Resposta aqui.', backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }
  return (
    <>
      <Section title="Cabeçalho">
        <TextInput label="Título da Seção" value={p.title} onChange={v => update({ title: v })} />
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte da Pergunta" value={p.questionFontFamily} onChange={v => update({ questionFontFamily: v })} />
        <ColorPicker label="Cor da Pergunta" value={p.questionColor} onChange={v => update({ questionColor: v })} />
        <FontSelector label="Fonte da Resposta" value={p.answerFontFamily} onChange={v => update({ answerFontFamily: v })} />
        <ColorPicker label="Cor da Resposta" value={p.answerColor} onChange={v => update({ answerColor: v })} />
      </Section>
      <Section title="Perguntas">
        <ListEditor<FaqItem>
          label="Perguntas"
          items={p.faqs}
          onChange={faqs => update({ faqs })}
          defaultItem={defaultFaq}
          renderItem={(faq, onChange) => (
            <>
              <TextInput label="Pergunta" value={faq.question} onChange={v => onChange({ ...faq, question: v })} />
              <TextArea label="Resposta" value={faq.answer} onChange={v => onChange({ ...faq, answer: v })} rows={3} />
              <ColorPicker label="Fundo do Item" value={faq.backgroundColor} onChange={v => onChange({ ...faq, backgroundColor: v })} />
              <ColorPicker label="Cor da Borda" value={faq.borderColor} onChange={v => onChange({ ...faq, borderColor: v })} />
            </>
          )}
        />
      </Section>
    </>
  )
}

function SocialProofControls({ props: p, update }: { props: SocialProofProps, update: (p: Partial<SocialProofProps>) => void }) {
  return (
    <>
      <Section title="Conteúdo">
        <TextInput label="Título" value={p.title} onChange={v => update({ title: v })} />
        <TextInput label="Subtítulo" value={p.subtitle} onChange={v => update({ subtitle: v })} />
        <FontSelector label="Fonte" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <TextInput label="Arroba" value={p.handle} onChange={v => update({ handle: v })} placeholder="@suamarca" />
      </Section>
      <Section title="CTA">
        <TextInput label="Texto do CTA" value={p.ctaText} onChange={v => update({ ctaText: v })} />
        <TextInput label="URL do CTA" value={p.ctaUrl} onChange={v => update({ ctaUrl: v })} />
        <ColorPicker label="Fundo do CTA" value={p.ctaBackgroundColor} onChange={v => update({ ctaBackgroundColor: v })} />
        <ColorPicker label="Cor do Texto CTA" value={p.ctaTextColor} onChange={v => update({ ctaTextColor: v })} />
      </Section>
      <Section title="Layout" defaultOpen={false}>
        <SelectInput label="Colunas" value={String(p.columns)} onChange={v => update({ columns: Number(v) as 2|3 })} options={[{ label: '2 Colunas', value: '2' }, { label: '3 Colunas', value: '3' }]} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Imagens">
        <ListEditor
          label="Imagens dos Posts"
          items={p.images}
          onChange={images => update({ images })}
          defaultItem={{ url: '', alt: 'Post' }}
          renderItem={(img, onChange) => (
            <>
              <ImageInput label="Imagem" value={img.url} onChange={v => onChange({ ...img, url: v })} assetType="images" />
              <TextInput label="Texto Alt" value={img.alt} onChange={v => onChange({ ...img, alt: v })} />
            </>
          )}
        />
      </Section>
    </>
  )
}

function FooterControls({ props: p, update }: { props: FooterProps, update: (p: Partial<FooterProps>) => void }) {
  const PLATFORM_OPTIONS = ['instagram', 'facebook', 'twitter', 'tiktok', 'youtube', 'linkedin'].map(v => ({ label: v, value: v }))
  return (
    <>
      <Section title="Marca">
        <ImageInput label="Logo" value={p.logo} onChange={v => update({ logo: v })} assetType="images" />
        <TextInput label="Alt / Nome da Marca" value={p.logoAlt} onChange={v => update({ logoAlt: v })} />
        <SliderInput label="Largura Máxima do Logo" value={p.logoMaxWidth} onChange={v => update({ logoMaxWidth: v })} min={60} max={300} unit="px" />
        <TextArea label="Tagline" value={p.tagline} onChange={v => update({ tagline: v })} rows={2} />
      </Section>
      <Section title="Cores & Tipografia" defaultOpen={false}>
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <ColorPicker label="Cor do Texto" value={p.textColor} onChange={v => update({ textColor: v })} />
        <ColorPicker label="Cor dos Links" value={p.linkColor} onChange={v => update({ linkColor: v })} />
        <FontSelector label="Fonte" value={p.fontFamily} onChange={v => update({ fontFamily: v })} />
        <SliderInput label="Tamanho da Fonte" value={p.fontSize} onChange={v => update({ fontSize: v })} min={10} max={16} unit="px" />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Links">
        <ListEditor<FooterLink>
          label="Links"
          items={p.links}
          onChange={links => update({ links })}
          defaultItem={{ label: 'Link', url: '#' }}
          renderItem={(link, onChange) => (
            <>
              <TextInput label="Rótulo" value={link.label} onChange={v => onChange({ ...link, label: v })} />
              <TextInput label="URL" value={link.url} onChange={v => onChange({ ...link, url: v })} />
            </>
          )}
        />
      </Section>
      <Section title="Redes Sociais">
        <ColorPicker label="Fundo dos Ícones Sociais" value={p.socialIconBgColor ?? '#374151'} onChange={v => update({ socialIconBgColor: v })} />
        <ListEditor<SocialLink>
          label="Redes Sociais"
          items={p.socialLinks}
          onChange={socialLinks => update({ socialLinks })}
          defaultItem={{ platform: 'instagram', url: '#', icon: '', iconSize: 32 }}
          renderItem={(s, onChange) => (
            <>
              <SelectInput label="Plataforma" value={s.platform} onChange={v => onChange({ ...s, platform: v as SocialLink['platform'] })} options={PLATFORM_OPTIONS} />
              <TextInput label="URL" value={s.url} onChange={v => onChange({ ...s, url: v })} />
              <ImageInput label="Ícone personalizado (PNG)" value={s.icon ?? ''} onChange={v => onChange({ ...s, icon: v })} assetType="icons" />
              <SliderInput label="Tamanho do Ícone" value={s.iconSize ?? 32} onChange={v => onChange({ ...s, iconSize: v })} min={16} max={64} unit="px" />
            </>
          )}
        />
      </Section>
      <Section title="Informações Legais" defaultOpen={false}>
        <TextInput label="Texto de Cancelamento" value={p.unsubscribeText} onChange={v => update({ unsubscribeText: v })} />
        <TextInput label="URL de Cancelamento" value={p.unsubscribeUrl} onChange={v => update({ unsubscribeUrl: v })} />
        <TextInput label="Endereço" value={p.addressText} onChange={v => update({ addressText: v })} />
      </Section>
    </>
  )
}

// --- New block controls ---

function StepsControls({ props: p, update }: { props: StepsProps, update: (p: Partial<StepsProps>) => void }) {
  const defaultStep: Omit<StepItem, 'id'> = { icon: '', title: 'Passo', description: 'Descrição do passo.' }
  return (
    <>
      <Section title="Cabeçalho">
        <ToggleSwitch label="Mostrar Título da Seção" value={p.showSectionTitle} onChange={v => update({ showSectionTitle: v })} />
        {p.showSectionTitle && (
          <>
            <TextInput label="Título da Seção" value={p.sectionTitle} onChange={v => update({ sectionTitle: v })} />
            <FontSelector label="Fonte" value={p.sectionTitleFontFamily} onChange={v => update({ sectionTitleFontFamily: v })} />
            <SliderInput label="Tamanho" value={p.sectionTitleFontSize} onChange={v => update({ sectionTitleFontSize: v })} min={18} max={56} unit="px" />
            <ColorPicker label="Cor" value={p.sectionTitleColor} onChange={v => update({ sectionTitleColor: v })} />
          </>
        )}
      </Section>
      <Section title="Layout">
        <SelectInput label="Orientação" value={p.layout ?? 'horizontal'} onChange={v => update({ layout: v as 'horizontal' | 'vertical' })} options={[{ label: 'Horizontal', value: 'horizontal' }, { label: 'Vertical', value: 'vertical' }]} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <ToggleSwitch label="Mostrar Conector" value={p.showConnector} onChange={v => update({ showConnector: v })} />
        {p.showConnector && <ColorPicker label="Cor do Conector" value={p.connectorColor ?? '#e5e7eb'} onChange={v => update({ connectorColor: v })} />}
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Números / Ícones" defaultOpen={false}>
        <SliderInput label="Tamanho do Ícone" value={p.iconSize ?? 40} onChange={v => update({ iconSize: v })} min={24} max={80} unit="px" />
        <ColorPicker label="Fundo do Número" value={p.numberBackgroundColor} onChange={v => update({ numberBackgroundColor: v })} />
        <ColorPicker label="Cor do Número" value={p.numberColor} onChange={v => update({ numberColor: v })} />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte do Título" value={p.stepTitleFontFamily} onChange={v => update({ stepTitleFontFamily: v })} />
        <SliderInput label="Tamanho do Título" value={p.stepTitleFontSize} onChange={v => update({ stepTitleFontSize: v })} min={11} max={24} unit="px" />
        <ColorPicker label="Cor do Título" value={p.stepTitleColor} onChange={v => update({ stepTitleColor: v })} />
        <SliderInput label="Entrelinha Título" value={p.stepTitleLineHeight ?? 1.3} onChange={v => update({ stepTitleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <FontSelector label="Fonte da Descrição" value={p.descriptionFontFamily} onChange={v => update({ descriptionFontFamily: v })} />
        <SliderInput label="Tamanho da Descrição" value={p.descriptionFontSize} onChange={v => update({ descriptionFontSize: v })} min={10} max={20} unit="px" />
        <ColorPicker label="Cor da Descrição" value={p.descriptionColor} onChange={v => update({ descriptionColor: v })} />
        <SliderInput label="Entrelinha Descrição" value={p.descriptionLineHeight ?? 1.55} onChange={v => update({ descriptionLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
      </Section>
      <Section title="Passos">
        <ListEditor<StepItem>
          label="Passos"
          items={p.steps}
          onChange={steps => update({ steps })}
          defaultItem={defaultStep}
          renderItem={(step, onChange) => (
            <>
              <ImageInput label="Ícone (imagem, emoji ou vazio = número)" value={step.icon} onChange={v => onChange({ ...step, icon: v })} assetType="icons" />
              <TextInput label="Título" value={step.title} onChange={v => onChange({ ...step, title: v })} />
              <TextArea label="Descrição" value={step.description} onChange={v => onChange({ ...step, description: v })} rows={2} />
            </>
          )}
        />
      </Section>
    </>
  )
}

function StatsControls({ props: p, update }: { props: StatsProps, update: (p: Partial<StatsProps>) => void }) {
  const defaultStat: Omit<StatItem, 'id'> = { value: '0', label: 'Métrica', icon: '' }
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Colunas" value={String(p.columns)} onChange={v => update({ columns: Number(v) as 2|3|4 })} options={[{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }]} />
        <SelectInput label="Alinhamento" value={p.contentAlignment ?? 'center'} onChange={v => update({ contentAlignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <ToggleSwitch label="Mostrar Divisor" value={p.showDivider} onChange={v => update({ showDivider: v })} />
        {p.showDivider && <ColorPicker label="Cor do Divisor" value={p.dividerColor} onChange={v => update({ dividerColor: v })} />}
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <FontSelector label="Fonte do Valor" value={p.valueFontFamily} onChange={v => update({ valueFontFamily: v })} />
        <SliderInput label="Tamanho do Valor" value={p.valueFontSize} onChange={v => update({ valueFontSize: v })} min={20} max={72} unit="px" />
        <SelectInput label="Peso do Valor" value={p.valueFontWeight ?? '800'} onChange={v => update({ valueFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <ColorPicker label="Cor do Valor" value={p.valueColor} onChange={v => update({ valueColor: v })} />
        <FontSelector label="Fonte do Label" value={p.labelFontFamily} onChange={v => update({ labelFontFamily: v })} />
        <SliderInput label="Tamanho do Label" value={p.labelFontSize} onChange={v => update({ labelFontSize: v })} min={10} max={20} unit="px" />
        <ColorPicker label="Cor do Label" value={p.labelColor} onChange={v => update({ labelColor: v })} />
        <SliderInput label="Tamanho do Ícone" value={p.iconSize ?? 28} onChange={v => update({ iconSize: v })} min={16} max={56} unit="px" />
      </Section>
      <Section title="Métricas">
        <ListEditor<StatItem>
          label="Métricas"
          items={p.items}
          onChange={items => update({ items })}
          defaultItem={defaultStat}
          renderItem={(stat, onChange) => (
            <>
              <TextInput label="Valor (ex: 4.9★, 500+)" value={stat.value} onChange={v => onChange({ ...stat, value: v })} />
              <TextInput label="Label" value={stat.label} onChange={v => onChange({ ...stat, label: v })} />
              <ImageInput label="Ícone (imagem ou emoji, opcional)" value={stat.icon} onChange={v => onChange({ ...stat, icon: v })} assetType="icons" />
            </>
          )}
        />
      </Section>
    </>
  )
}

function TrustBadgesControls({ props: p, update }: { props: TrustBadgesProps, update: (p: Partial<TrustBadgesProps>) => void }) {
  const defaultBadge: Omit<TrustBadgeItem, 'id'> = { icon: '✅', title: 'Selo', subtitle: '' }
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Colunas" value={String(p.columns)} onChange={v => update({ columns: Number(v) as 2|3|4|5 })} options={[{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }]} />
        <SelectInput label="Alinhamento" value={p.alignment} onChange={v => update({ alignment: v as 'left' | 'center' | 'right' })} options={ALIGNMENT_OPTIONS} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Tipografia" defaultOpen={false}>
        <SliderInput label="Tamanho do Ícone" value={p.iconSize ?? 32} onChange={v => update({ iconSize: v })} min={16} max={64} unit="px" />
        <ColorPicker label="Cor do Ícone (texto)" value={p.iconColor} onChange={v => update({ iconColor: v })} />
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <SliderInput label="Tamanho do Título" value={p.titleFontSize} onChange={v => update({ titleFontSize: v })} min={10} max={20} unit="px" />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <FontSelector label="Fonte do Subtítulo" value={p.subtitleFontFamily} onChange={v => update({ subtitleFontFamily: v })} />
        <SliderInput label="Tamanho do Subtítulo" value={p.subtitleFontSize} onChange={v => update({ subtitleFontSize: v })} min={9} max={16} unit="px" />
        <ColorPicker label="Cor do Subtítulo" value={p.subtitleColor} onChange={v => update({ subtitleColor: v })} />
      </Section>
      <Section title="Selos">
        <ListEditor<TrustBadgeItem>
          label="Selos"
          items={p.items}
          onChange={items => update({ items })}
          defaultItem={defaultBadge}
          renderItem={(badge, onChange) => (
            <>
              <ImageInput label="Ícone (emoji, URL ou biblioteca)" value={badge.icon} onChange={v => onChange({ ...badge, icon: v })} assetType="icons" />
              <TextInput label="Título" value={badge.title} onChange={v => onChange({ ...badge, title: v })} />
              <TextInput label="Subtítulo" value={badge.subtitle} onChange={v => onChange({ ...badge, subtitle: v })} placeholder="Opcional" />
            </>
          )}
        />
      </Section>
    </>
  )
}

function TwoColumnControls({ props: p, update }: { props: TwoColumnProps, update: (p: Partial<TwoColumnProps>) => void }) {
  return (
    <>
      <Section title="Layout">
        <SelectInput label="Posição do Texto" value={p.layout ?? 'text-left'} onChange={v => update({ layout: v as TwoColumnProps['layout'] })} options={[{ label: 'Texto à Esquerda', value: 'text-left' }, { label: 'Texto à Direita', value: 'text-right' }]} />
        <SelectInput label="Alinhamento Vertical" value={p.verticalAlign ?? 'middle'} onChange={v => update({ verticalAlign: v as TwoColumnProps['verticalAlign'] })} options={VALIGN_OPTIONS} />
        <ColorPicker label="Fundo" value={p.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <SliderInput label="Espaço Superior" value={p.paddingTop} onChange={v => update({ paddingTop: v })} min={0} max={120} unit="px" />
        <SliderInput label="Espaço Inferior" value={p.paddingBottom} onChange={v => update({ paddingBottom: v })} min={0} max={120} unit="px" />
      </Section>
      <Section title="Imagem" defaultOpen={false}>
        <ImageInput label="Imagem" value={p.image} onChange={v => update({ image: v })} assetType="images" />
        <TextInput label="Texto Alt" value={p.imageAlt} onChange={v => update({ imageAlt: v })} />
        <SliderInput label="Largura da Imagem" value={p.imageWidth ?? 260} onChange={v => update({ imageWidth: v })} min={100} max={400} unit="px" />
        <SliderInput label="Arredondamento" value={p.imageBorderRadius ?? 8} onChange={v => update({ imageBorderRadius: v })} min={0} max={40} unit="px" />
      </Section>
      <Section title="Conteúdo">
        <TextInput label="Badge" value={p.badge} onChange={v => update({ badge: v })} placeholder="Opcional" />
        {p.badge && (
          <>
            <ColorPicker label="Fundo do Badge" value={p.badgeColor} onChange={v => update({ badgeColor: v })} />
            <ColorPicker label="Texto do Badge" value={p.badgeTextColor} onChange={v => update({ badgeTextColor: v })} />
          </>
        )}
        <TextArea label="Título (Enter = quebra de linha)" value={p.title} onChange={v => update({ title: v })} rows={2} />
        <FontSelector label="Fonte do Título" value={p.titleFontFamily} onChange={v => update({ titleFontFamily: v })} />
        <SliderInput label="Tamanho do Título" value={p.titleFontSize} onChange={v => update({ titleFontSize: v })} min={16} max={60} unit="px" />
        <SelectInput label="Peso do Título" value={p.titleFontWeight ?? '700'} onChange={v => update({ titleFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <ColorPicker label="Cor do Título" value={p.titleColor} onChange={v => update({ titleColor: v })} />
        <SliderInput label="Entrelinha Título" value={p.titleLineHeight ?? 1.2} onChange={v => update({ titleLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Título" value={p.titleLetterSpacing ?? 0} onChange={v => update({ titleLetterSpacing: v })} min={0} max={12} unit="px" />
        <TextArea label="Corpo (Enter = quebra de linha)" value={p.bodyText} onChange={v => update({ bodyText: v })} rows={4} />
        <FontSelector label="Fonte do Corpo" value={p.bodyFontFamily} onChange={v => update({ bodyFontFamily: v })} />
        <SliderInput label="Tamanho do Corpo" value={p.bodyFontSize ?? 15} onChange={v => update({ bodyFontSize: v })} min={11} max={24} unit="px" />
        <ColorPicker label="Cor do Corpo" value={p.bodyColor} onChange={v => update({ bodyColor: v })} />
        <SliderInput label="Entrelinha Corpo" value={p.bodyLineHeight ?? 1.7} onChange={v => update({ bodyLineHeight: v })} min={0.8} max={3} step={0.05} unit="x" />
        <SliderInput label="Espaç. Letras Corpo" value={p.bodyLetterSpacing ?? 0} onChange={v => update({ bodyLetterSpacing: v })} min={0} max={8} unit="px" />
      </Section>
      <Section title="Botão CTA" defaultOpen={false}>
        <TextInput label="Texto do Botão" value={p.ctaText} onChange={v => update({ ctaText: v })} placeholder="Deixe vazio para ocultar" />
        <TextInput label="URL do Botão" value={p.ctaUrl} onChange={v => update({ ctaUrl: v })} placeholder="https://" />
        <ColorPicker label="Fundo" value={p.ctaBackgroundColor} onChange={v => update({ ctaBackgroundColor: v })} />
        <ColorPicker label="Cor do Texto" value={p.ctaTextColor} onChange={v => update({ ctaTextColor: v })} />
        <SliderInput label="Tamanho da Fonte" value={p.ctaFontSize ?? 15} onChange={v => update({ ctaFontSize: v })} min={11} max={28} unit="px" />
        <SelectInput label="Peso da Fonte" value={p.ctaFontWeight ?? '700'} onChange={v => update({ ctaFontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
        <SliderInput label="Padding Vertical" value={p.ctaPaddingV ?? 13} onChange={v => update({ ctaPaddingV: v })} min={6} max={32} unit="px" />
        <SliderInput label="Padding Horizontal" value={p.ctaPaddingH ?? 28} onChange={v => update({ ctaPaddingH: v })} min={12} max={80} unit="px" />
        <SliderInput label="Arredondamento" value={p.ctaBorderRadius ?? 6} onChange={v => update({ ctaBorderRadius: v })} min={0} max={40} unit="px" />
      </Section>
    </>
  )
}

export function BlockControls() {
  const { document, selectedBlockId, updateBlockProps } = useEditorStore()
  const block = document.blocks.find(b => b.id === selectedBlockId)

  if (!block) {
    return (
      <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-gray-700">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configurações</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-center px-6">
          <div>
            <div className="text-3xl mb-3">👆</div>
            <p className="text-gray-500 text-sm">Clique em um bloco para editar suas configurações</p>
          </div>
        </div>
      </div>
    )
  }

  const update = (props: Partial<Record<string, unknown>>) => updateBlockProps(block.id, props)
  const p = block.props

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col flex-shrink-0">
      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{BLOCK_LABELS[block.type]}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {block.type === 'hero' && <HeroControls props={p as unknown as HeroProps} update={update as (p: Partial<HeroProps>) => void} />}
        {block.type === 'announcement' && <AnnouncementControls props={p as unknown as AnnouncementProps} update={update as (p: Partial<AnnouncementProps>) => void} />}
        {block.type === 'sectionHeader' && <SectionHeaderControls props={p as unknown as SectionHeaderProps} update={update as (p: Partial<SectionHeaderProps>) => void} />}
        {block.type === 'cardGrid' && <CardGridControls props={p as unknown as CardGridProps} update={update as (p: Partial<CardGridProps>) => void} />}
        {block.type === 'testimonial' && <TestimonialControls props={p as unknown as TestimonialProps} update={update as (p: Partial<TestimonialProps>) => void} />}
        {block.type === 'logoBar' && <LogoBarControls props={p as unknown as LogoBarProps} update={update as (p: Partial<LogoBarProps>) => void} />}
        {block.type === 'featureList' && <FeatureListControls props={p as unknown as FeatureListProps} update={update as (p: Partial<FeatureListProps>) => void} />}
        {block.type === 'ctaBanner' && <CtaBannerControls props={p as unknown as CtaBannerProps} update={update as (p: Partial<CtaBannerProps>) => void} />}
        {block.type === 'comparisonTable' && <ComparisonTableControls props={p as unknown as ComparisonTableProps} update={update as (p: Partial<ComparisonTableProps>) => void} />}
        {block.type === 'pricing' && <PricingControls props={p as unknown as PricingProps} update={update as (p: Partial<PricingProps>) => void} />}
        {block.type === 'faq' && <FaqControls props={p as unknown as FaqProps} update={update as (p: Partial<FaqProps>) => void} />}
        {block.type === 'socialProof' && <SocialProofControls props={p as unknown as SocialProofProps} update={update as (p: Partial<SocialProofProps>) => void} />}
        {block.type === 'steps' && <StepsControls props={p as unknown as StepsProps} update={update as (p: Partial<StepsProps>) => void} />}
        {block.type === 'stats' && <StatsControls props={p as unknown as StatsProps} update={update as (p: Partial<StatsProps>) => void} />}
        {block.type === 'trustBadges' && <TrustBadgesControls props={p as unknown as TrustBadgesProps} update={update as (p: Partial<TrustBadgesProps>) => void} />}
        {block.type === 'twoColumn' && <TwoColumnControls props={p as unknown as TwoColumnProps} update={update as (p: Partial<TwoColumnProps>) => void} />}
        {block.type === 'footer' && <FooterControls props={p as unknown as FooterProps} update={update as (p: Partial<FooterProps>) => void} />}
      </div>
    </div>
  )
}
