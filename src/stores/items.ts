import { defineStore } from 'pinia'
import * as api from '@/api/hn'
import type { Item, ListKind } from '@/types/hn'

const LIST_TTL_MS = 5 * 60 * 1000

/**
 * Caches API responses so Back navigation and revisited threads render
 * without refetching. Requests in flight are shared, not duplicated.
 */
export const useItemsStore = defineStore('items', () => {
  const items = new Map<number, Promise<Item | null>>()
  const lists = new Map<ListKind, { at: number; ids: Promise<number[]> }>()

  function getItem(id: number): Promise<Item | null> {
    let item = items.get(id)
    if (!item) {
      item = api.getItem(id)
      item.catch(() => items.delete(id))
      items.set(id, item)
    }
    return item
  }

  async function getItems(ids: number[]): Promise<Item[]> {
    const result = await Promise.all(ids.map(getItem))
    return result.filter((item): item is Item => item !== null)
  }

  function getList(kind: ListKind): Promise<number[]> {
    const cached = lists.get(kind)
    if (cached && Date.now() - cached.at < LIST_TTL_MS) return cached.ids
    const ids = api.getList(kind)
    ids.catch(() => lists.delete(kind))
    lists.set(kind, { at: Date.now(), ids })
    return ids
  }

  return { getItem, getItems, getList }
})
