import { afterEach, describe, expect, it, vi } from 'vitest'
import { getItems, getList, getUser } from '../hn'

function mockFetch(responses: Record<string, unknown>, status = 200) {
  const fetch = vi.fn(async (url: string) => {
    const path = url.replace('https://hacker-news.firebaseio.com/v0/', '')
    return new Response(JSON.stringify(responses[path] ?? null), { status })
  })
  vi.stubGlobal('fetch', fetch)
  return fetch
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('hn api', () => {
  it('fetches a story list by kind', async () => {
    const fetch = mockFetch({ 'showstories.json': [1, 2, 3] })
    await expect(getList('show')).resolves.toEqual([1, 2, 3])
    expect(fetch).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/showstories.json')
  })

  it('drops items the API returns as null', async () => {
    mockFetch({ 'item/1.json': { id: 1, type: 'story', time: 0 } })
    await expect(getItems([1, 2])).resolves.toEqual([{ id: 1, type: 'story', time: 0 }])
  })

  it('encodes user ids', async () => {
    const fetch = mockFetch({})
    await getUser('a/b')
    expect(fetch).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/user/a%2Fb.json')
  })

  it('throws on HTTP errors', async () => {
    mockFetch({}, 503)
    await expect(getList('top')).rejects.toThrow('HN API 503')
  })
})
