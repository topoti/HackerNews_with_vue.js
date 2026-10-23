import DOMPurify from 'dompurify'

/** Use for every v-html: HN text fields are user-supplied HTML. */
export function sanitize(html?: string): string {
  return html ? DOMPurify.sanitize(html) : ''
}
