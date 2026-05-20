export type BlockType =
  | 'hero'
  | 'announcement'
  | 'sectionHeader'
  | 'cardGrid'
  | 'testimonial'
  | 'logoBar'
  | 'featureList'
  | 'ctaBanner'
  | 'comparisonTable'
  | 'pricing'
  | 'faq'
  | 'socialProof'
  | 'footer'

export interface Block {
  id: string
  type: BlockType
  props: Record<string, unknown>
  visible: boolean
}

export interface GlobalSettings {
  emailName: string
  previewText: string
  emailWidth: number
  backgroundColor: string
  defaultFontFamily: string
  defaultTextColor: string
  defaultLinkColor: string
}

export interface EmailDocument {
  id: string
  name: string
  globalSettings: GlobalSettings
  blocks: Block[]
}

// Per-block prop types
export interface HeroProps {
  backgroundImage: string
  backgroundImageAlt: string
  overlayColor: string
  overlayOpacity: number
  badge: string
  badgeColor: string
  headline: string
  headlineFontFamily: string
  headlineFontSize: number
  headlineFontWeight: string
  headlineColor: string
  subtitle: string
  subtitleFontFamily: string
  subtitleFontSize: number
  subtitleColor: string
  ctaText: string
  ctaUrl: string
  ctaBackgroundColor: string
  ctaTextColor: string
  ctaBorderRadius: number
  contentAlignment: 'left' | 'center' | 'right'
  paddingTop: number
  paddingBottom: number
  minHeight: number
}

export interface AnnouncementProps {
  text: string
  textColor: string
  backgroundColor: string
  fontFamily: string
  fontSize: number
  fontWeight: string
  paddingTop: number
  paddingBottom: number
  alignment: 'left' | 'center' | 'right'
  showIcon: boolean
  iconEmoji: string
}

export interface SectionHeaderProps {
  title: string
  titleFontFamily: string
  titleFontSize: number
  titleFontWeight: string
  titleColor: string
  subtitle: string
  subtitleFontFamily: string
  subtitleFontSize: number
  subtitleColor: string
  alignment: 'left' | 'center' | 'right'
  backgroundColor: string
  paddingTop: number
  paddingBottom: number
}

export interface CardItem {
  id: string
  image: string
  imageAlt: string
  badge: string
  badgeColor: string
  title: string
  description: string
  ctaText: string
  ctaUrl: string
  ctaBackgroundColor: string
  ctaTextColor: string
  cardBackgroundColor: string
  borderRadius: number
}

export interface CardGridProps {
  columns: 2 | 3 | 4
  backgroundColor: string
  paddingTop: number
  paddingBottom: number
  columnGap: number
  cards: CardItem[]
  titleFontFamily: string
  titleFontSize: number
  titleColor: string
  descriptionFontFamily: string
  descriptionFontSize: number
  descriptionColor: string
}

export interface TestimonialItem {
  id: string
  avatar: string
  name: string
  role: string
  quote: string
  ctaText: string
  ctaUrl: string
  ctaBackgroundColor: string
  ctaTextColor: string
  cardBackgroundColor: string
  borderRadius: number
  stars: number
}

export interface TestimonialProps {
  layout: 'single' | 'carousel-static'
  backgroundColor: string
  paddingTop: number
  paddingBottom: number
  testimonials: TestimonialItem[]
  nameFontFamily: string
  nameColor: string
  quoteFontFamily: string
  quoteColor: string
}

export interface LogoItem {
  id: string
  image: string
  alt: string
  url: string
  maxHeight: number
}

export interface LogoBarProps {
  title: string
  backgroundColor: string
  logos: LogoItem[]
  paddingTop: number
  paddingBottom: number
  gap: number
  alignment: 'left' | 'center' | 'right'
  opacity: number
}

export interface FeatureItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface FeatureListProps {
  columns: 1 | 2
  backgroundColor: string
  paddingTop: number
  paddingBottom: number
  features: FeatureItem[]
  titleFontFamily: string
  titleFontSize: number
  titleColor: string
  descriptionFontFamily: string
  descriptionFontSize: number
  descriptionColor: string
  iconSize: number
}

export interface CtaBannerProps {
  layout: 'image-right' | 'centered' | 'image-left'
  backgroundColor: string
  image: string
  imageAlt: string
  badge: string
  badgeColor: string
  badgeTextColor: string
  headline: string
  headlineFontFamily: string
  headlineFontSize: number
  headlineColor: string
  bodyText: string
  bodyFontFamily: string
  bodyColor: string
  ctaText: string
  ctaUrl: string
  ctaBackgroundColor: string
  ctaTextColor: string
  ctaBorderRadius: number
  paddingTop: number
  paddingBottom: number
}

export interface ComparisonColumn {
  id: string
  label: string
  isHighlight: boolean
  highlightColor: string
  logo: string
}

export interface ComparisonRow {
  id: string
  feature: string
  values: Record<string, boolean | string>
}

export interface ComparisonTableProps {
  backgroundColor: string
  title: string
  titleFontFamily: string
  titleColor: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  checkColor: string
  crossColor: string
  paddingTop: number
  paddingBottom: number
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  priceUnit: string
  isHighlight: boolean
  highlightLabel: string
  highlightColor: string
  cardBackgroundColor: string
  features: string[]
  ctaText: string
  ctaUrl: string
  ctaBackgroundColor: string
  ctaTextColor: string
  borderRadius: number
}

export interface PricingProps {
  backgroundColor: string
  paddingTop: number
  paddingBottom: number
  plans: PricingPlan[]
  titleFontFamily: string
  titleColor: string
  priceFontFamily: string
  priceColor: string
  featureFontFamily: string
  featureColor: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  backgroundColor: string
  borderColor: string
}

export interface FaqProps {
  backgroundColor: string
  title: string
  titleFontFamily: string
  titleColor: string
  faqs: FaqItem[]
  questionFontFamily: string
  questionColor: string
  answerFontFamily: string
  answerColor: string
  paddingTop: number
  paddingBottom: number
}

export interface SocialProofImage {
  id: string
  url: string
  alt: string
}

export interface SocialProofProps {
  backgroundColor: string
  title: string
  subtitle: string
  titleFontFamily: string
  titleColor: string
  handle: string
  ctaText: string
  ctaUrl: string
  ctaBackgroundColor: string
  ctaTextColor: string
  images: SocialProofImage[]
  columns: 2 | 3
  paddingTop: number
  paddingBottom: number
}

export interface FooterLink {
  id: string
  label: string
  url: string
}

export interface SocialLink {
  id: string
  platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'youtube' | 'linkedin'
  url: string
}

export interface FooterProps {
  backgroundColor: string
  logo: string
  logoAlt: string
  logoMaxWidth: number
  tagline: string
  links: FooterLink[]
  socialLinks: SocialLink[]
  unsubscribeText: string
  unsubscribeUrl: string
  addressText: string
  textColor: string
  linkColor: string
  fontFamily: string
  fontSize: number
  paddingTop: number
  paddingBottom: number
}
