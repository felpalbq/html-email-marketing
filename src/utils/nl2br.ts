import { escapeHtml } from './escapeHtml'

/** HTML-escapes text and converts newlines to <br> tags for HTML email output */
export function nl2br(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br>')
}
