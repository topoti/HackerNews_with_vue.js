const UNITS: [name: string, seconds: number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

export function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

/** Unix seconds → "4 hours ago", as HN shows it. */
export function timeAgo(time: number, now = Date.now()): string {
  const seconds = Math.max(0, Math.floor(now / 1000 - time))
  for (const [unit, size] of UNITS) {
    if (seconds >= size) return `${pluralize(Math.floor(seconds / size), unit)} ago`
  }
  return 'just now'
}

/** Unix seconds → "April 1, 2015". */
export function formatDate(time: number): string {
  return new Date(time * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** Sites where HN shows the first path segment too, e.g. github.com/vuejs. */
const USER_SITES = new Set(['github.com', 'gitlab.com', 'twitter.com', 'x.com'])

/** "https://www.github.com/vuejs/core" → "github.com/vuejs", as HN shows it. */
export function domain(url?: string): string {
  if (!url) return ''
  try {
    const { hostname, pathname } = new URL(url)
    const host = hostname.replace(/^www\./, '')
    const owner = pathname.split('/')[1]
    return USER_SITES.has(host) && owner ? `${host}/${owner}` : host
  } catch {
    return ''
  }
}
