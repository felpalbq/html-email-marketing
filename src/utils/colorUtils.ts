export function hexToRgba(hex: string, alpha: number = 1): string {
  let clean = hex.replace('#', '')
  if (clean.length === 3) clean = clean.split('').map(c => c + c).join('')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function rgbaToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return rgba.startsWith('#') ? rgba : '#000000'
  const r = parseInt(match[1]).toString(16).padStart(2, '0')
  const g = parseInt(match[2]).toString(16).padStart(2, '0')
  const b = parseInt(match[3]).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

export function isValidHex(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

export function ensureHex(color: string): string {
  if (isValidHex(color)) return color
  if (color.startsWith('rgba') || color.startsWith('rgb')) return rgbaToHex(color)
  return '#000000'
}

export function lightenHex(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount)
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount)
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
