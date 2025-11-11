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

/**
 * Common multi-label public suffixes. HN shows the registrable domain, so
 * blog.cloudflare.com → cloudflare.com but pncnmnp.github.io stays whole.
 * The full Public Suffix List is large, so only common entries are listed.
 */
const PUBLIC_SUFFIXES = new Set([
  'co.uk',
  'org.uk',
  'ac.uk',
  'gov.uk',
  'me.uk',
  'com.au',
  'net.au',
  'org.au',
  'edu.au',
  'gov.au',
  'co.nz',
  'co.jp',
  'ne.jp',
  'ac.jp',
  'co.in',
  'co.kr',
  'co.za',
  'com.br',
  'com.cn',
  'com.mx',
  'com.tr',
  'com.sg',
  'com.hk',
  'com.tw',
  'github.io',
  'gitlab.io',
  'netlify.app',
  'vercel.app',
  'pages.dev',
  'workers.dev',
  'fly.dev',
  'herokuapp.com',
  'blogspot.com',
  'substack.com',
  'neocities.org',
])

function registrableDomain(host: string): string {
  if (/^[\d.]+$/.test(host) || host.startsWith('[')) return host
  const labels = host.split('.')
  const lastTwo = labels.slice(-2).join('.')
  return labels.slice(PUBLIC_SUFFIXES.has(lastTwo) ? -3 : -2).join('.')
}

/** "https://blog.cloudflare.com/x" → "cloudflare.com", as HN shows it. */
export function domain(url?: string): string {
  if (!url) return ''
  try {
    const { hostname, pathname } = new URL(url)
    const site = registrableDomain(hostname)
    const owner = pathname.split('/')[1]
    return USER_SITES.has(site) && owner ? `${site}/${owner}` : site
  } catch {
    return ''
  }
}
