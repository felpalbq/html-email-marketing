export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

export function escapeSafeUrl(url: string): string {
  if (/^javascript:/i.test(url.trim())) return '#'
  return escapeAttr(url)
}

/** For CSS url('...') values: prevents single-quote CSS injection and double-quote HTML attribute injection */
export function escapeImageUrl(url: string): string {
  if (/^javascript:/i.test(url.trim())) return ''
  return url.replace(/'/g, '%27').replace(/"/g, '%22')
}
