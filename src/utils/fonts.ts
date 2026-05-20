export interface FontOption {
  label: string
  value: string
  googleSlug: string
  category: 'sans' | 'display' | 'serif' | 'script'
}

export const FONTS: FontOption[] = [
  { label: 'Inter', value: 'Inter', googleSlug: 'Inter:wght@400;500;600;700;800;900', category: 'sans' },
  { label: 'Montserrat', value: 'Montserrat', googleSlug: 'Montserrat:wght@400;500;600;700;800;900', category: 'sans' },
  { label: 'Roboto', value: 'Roboto', googleSlug: 'Roboto:wght@400;500;700;900', category: 'sans' },
  { label: 'Lato', value: 'Lato', googleSlug: 'Lato:wght@400;700;900', category: 'sans' },
  { label: 'Rubik', value: 'Rubik', googleSlug: 'Rubik:wght@400;500;600;700;800;900', category: 'sans' },
  { label: 'Ubuntu', value: 'Ubuntu', googleSlug: 'Ubuntu:wght@400;500;700', category: 'sans' },
  { label: 'Cabin', value: 'Cabin', googleSlug: 'Cabin:wght@400;500;600;700', category: 'sans' },
  { label: 'Bebas Neue', value: 'Bebas Neue', googleSlug: 'Bebas+Neue', category: 'display' },
  { label: 'Fjalla One', value: 'Fjalla One', googleSlug: 'Fjalla+One', category: 'display' },
  { label: 'Anton', value: 'Anton', googleSlug: 'Anton', category: 'display' },
  { label: 'Bricolage Grotesque', value: 'Bricolage Grotesque', googleSlug: 'Bricolage+Grotesque:wght@400;500;600;700;800', category: 'display' },
  { label: 'Fredoka', value: 'Fredoka', googleSlug: 'Fredoka:wght@400;500;600;700', category: 'display' },
  { label: 'Finlandica', value: 'Finlandica', googleSlug: 'Finlandica:wght@400;500;600;700', category: 'serif' },
  { label: 'Over the Rainbow', value: 'Over the Rainbow', googleSlug: 'Over+the+Rainbow', category: 'script' },
  { label: 'Calligraffitti', value: 'Calligraffitti', googleSlug: 'Calligraffitti', category: 'script' },
  { label: 'Grape Nuts', value: 'Grape Nuts', googleSlug: 'Grape+Nuts', category: 'script' },
  { label: 'Homemade Apple', value: 'Homemade Apple', googleSlug: 'Homemade+Apple', category: 'script' },
]

export function buildGoogleFontsUrl(usedFamilies: string[]): string {
  const slugs = FONTS
    .filter(f => usedFamilies.includes(f.value))
    .map(f => f.googleSlug)
  if (slugs.length === 0) return ''
  return `https://fonts.googleapis.com/css2?${slugs.map(s => `family=${s}`).join('&')}&display=swap`
}

export function fontStack(family: string): string {
  const font = FONTS.find(f => f.value === family)
  if (!font) return `${family}, Arial, sans-serif`
  if (font.category === 'serif') return `'${family}', Georgia, serif`
  if (font.category === 'script') return `'${family}', cursive`
  return `'${family}', Arial, sans-serif`
}

let fontsLinkEl: HTMLLinkElement | null = null

export function injectGoogleFontsInEditor(families: string[]) {
  const url = buildGoogleFontsUrl(families)
  if (!url) return
  if (!fontsLinkEl) {
    fontsLinkEl = document.createElement('link')
    fontsLinkEl.rel = 'stylesheet'
    document.head.appendChild(fontsLinkEl)
  }
  fontsLinkEl.href = url
}
