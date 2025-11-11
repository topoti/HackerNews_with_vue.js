import type { Item, ListKind, User } from '@/types/hn'

const BASE = 'https://hacker-news.firebaseio.com/v0'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/${path}.json`)
  if (!res.ok) throw new Error(`HN API ${res.status} for ${path}`)
  return res.json() as Promise<T>
}

export function getList(kind: ListKind): Promise<number[]> {
  return get<number[]>(`${kind}stories`)
}

/** Resolves to null for ids the API has no data for. */
export function getItem(id: number): Promise<Item | null> {
  return get<Item | null>(`item/${id}`)
}

export async function getItems(ids: number[]): Promise<Item[]> {
  const items = await Promise.all(ids.map(getItem))
  return items.filter((item): item is Item => item !== null)
}

export function getUser(id: string): Promise<User | null> {
  return get<User | null>(`user/${encodeURIComponent(id)}`)
}
