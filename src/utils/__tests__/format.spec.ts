import { describe, expect, it } from 'vitest'
import { domain, formatDate, pluralize, timeAgo } from '../format'

describe('pluralize', () => {
  it('uses the singular only for exactly one', () => {
    expect(pluralize(1, 'point')).toBe('1 point')
    expect(pluralize(0, 'point')).toBe('0 points')
    expect(pluralize(2, 'comment')).toBe('2 comments')
  })
})

describe('timeAgo', () => {
  const now = Date.UTC(2026, 9, 21, 12, 0, 0)
  const ago = (seconds: number) => timeAgo(now / 1000 - seconds, now)

  it('formats like HN', () => {
    expect(ago(5)).toBe('just now')
    expect(ago(60)).toBe('1 minute ago')
    expect(ago(59 * 60)).toBe('59 minutes ago')
    expect(ago(4 * 3600 + 1800)).toBe('4 hours ago')
    expect(ago(24 * 3600)).toBe('1 day ago')
    expect(ago(45 * 24 * 3600)).toBe('1 month ago')
    expect(ago(800 * 24 * 3600)).toBe('2 years ago')
  })

  it('never goes negative for timestamps slightly in the future', () => {
    expect(ago(-30)).toBe('just now')
  })
})

describe('formatDate', () => {
  it('formats an absolute UTC date', () => {
    expect(formatDate(1160418111)).toBe('October 9, 2006')
  })
})

describe('domain', () => {
  // Real titles from news.ycombinator.com/news and the domain HN shows for each.
  it.each([
    ['https://www.joshwcomeau.com/css/interop-2027/', 'joshwcomeau.com'],
    ['https://permit.petercai.com/', 'petercai.com'],
    ['https://github.com/timriker/bzo', 'github.com/timriker'],
    ['https://emudhra.we-have-a-problem.com/', 'we-have-a-problem.com'],
    ['https://unsung.aresluna.org/good-type-against-all-odds/', 'aresluna.org'],
    ['https://www.anthropic.com/research/attack-surface-reduction', 'anthropic.com'],
    ['https://pncnmnp.github.io/blogs/economics-decision-models.html', 'pncnmnp.github.io'],
    ['https://e360.yale.edu/digest/deepwater-horizon-deep-sea-recovery', 'yale.edu'],
    ['https://blog.cloudflare.com/typescript-rust-port/', 'cloudflare.com'],
    ['https://mistral.ai/news/voxtral-3/', 'mistral.ai'],
  ])('%s → %s', (url, expected) => {
    expect(domain(url)).toBe(expected)
  })

  it('keeps two labels before multi-part public suffixes', () => {
    expect(domain('https://www.bbc.co.uk/news')).toBe('bbc.co.uk')
  })

  it('shows a bare user site without an owner', () => {
    expect(domain('https://github.com/')).toBe('github.com')
  })

  it('keeps IP hosts whole and tolerates missing or invalid URLs', () => {
    expect(domain('http://192.168.1.10/x')).toBe('192.168.1.10')
    expect(domain(undefined)).toBe('')
    expect(domain('not a url')).toBe('')
  })
})
