import type { Item } from '@/types/hn'

const BASE = 'https://hn.algolia.com/api/v1'
export const PER_PAGE = 30

interface Hit {
  objectID: string
  author: string
  created_at_i: number
  title?: string | null
  url?: string | null
  points?: number | null
  num_comments?: number | null
  story_text?: string | null
  comment_text?: string | null
  parent_id?: number | null
  story_id?: number | null
  story_title?: string | null
}

export interface Page<T> {
  items: T[]
  hasMore: boolean
}

/** A comment plus the story it was posted on. */
export interface FeedComment {
  comment: Item
  story: Item
}

async function query(
  endpoint: 'search' | 'search_by_date',
  params: Record<string, string | number>,
): Promise<{ hits: Hit[]; hasMore: boolean }> {
  const search = new URLSearchParams({ hitsPerPage: String(PER_PAGE) })
  for (const [key, value] of Object.entries(params)) search.set(key, String(value))
  const res = await fetch(`${BASE}/${endpoint}?${search}`)
  if (!res.ok) throw new Error(`Algolia API ${res.status} for ${endpoint}`)
  const data = (await res.json()) as { hits: Hit[]; page: number; nbPages: number }
  return { hits: data.hits, hasMore: data.page + 1 < data.nbPages }
}

function toStory(hit: Hit): Item {
  return {
    id: Number(hit.objectID),
    type: 'story',
    by: hit.author,
    time: hit.created_at_i,
    title: hit.title ?? '',
    url: hit.url ?? undefined,
    text: hit.story_text ?? undefined,
    score: hit.points ?? 0,
    descendants: hit.num_comments ?? 0,
  }
}

function toComment(hit: Hit): FeedComment {
  return {
    comment: {
      id: Number(hit.objectID),
      type: 'comment',
      by: hit.author,
      time: hit.created_at_i,
      text: hit.comment_text ?? '',
      parent: hit.parent_id ?? undefined,
    },
    story: { id: hit.story_id ?? 0, type: 'story', time: 0, title: hit.story_title ?? '' },
  }
}

async function stories(
  endpoint: 'search' | 'search_by_date',
  params: Record<string, string | number>,
): Promise<Page<Item>> {
  const { hits, hasMore } = await query(endpoint, params)
  return { items: hits.map(toStory), hasMore }
}

async function comments(params: Record<string, string | number>): Promise<Page<FeedComment>> {
  const { hits, hasMore } = await query('search_by_date', params)
  return { items: hits.map(toComment), hasMore }
}

/** Pages are 1-based here, as in HN's ?p=, and 0-based in Algolia. */
export function searchStories(text: string, page: number) {
  return stories('search', { query: text, tags: 'story', page: page - 1 })
}

export function storiesByAuthor(author: string, page: number) {
  return stories('search_by_date', { tags: `story,author_${author}`, page: page - 1 })
}

/**
 * Top stories submitted on the UTC day starting at `dayStart` (unix seconds),
 * highest points first. Algolia's front_page tag only covers the current
 * front page, so it can't be used for past days.
 */
export function frontPage(dayStart: number, page: number) {
  return stories('search', {
    tags: 'story',
    numericFilters: `created_at_i>=${dayStart},created_at_i<${dayStart + 86400}`,
    page: page - 1,
  })
}

export function storiesFromSite(site: string, page: number) {
  return stories('search_by_date', {
    query: site,
    restrictSearchableAttributes: 'url',
    tags: 'story',
    page: page - 1,
  })
}

export function newestComments(page: number) {
  return comments({ tags: 'comment', page: page - 1 })
}

export function commentsByAuthor(author: string, page: number) {
  return comments({ tags: `comment,author_${author}`, page: page - 1 })
}
