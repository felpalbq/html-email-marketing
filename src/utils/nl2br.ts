/** Converts newlines to <br> tags for HTML email output */
export function nl2br(text: string): string {
  return text.replace(/\n/g, '<br>')
}
