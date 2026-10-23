import { computed, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

export interface PageResult<T> {
  items: T[]
  hasMore: boolean
}

/**
 * Loads page ?p= of a list and reloads when the page or `deps` change.
 * Responses to superseded requests are dropped, so a slow page can't
 * overwrite a newer one.
 */
export function usePaged<T>(load: (page: number) => Promise<PageResult<T>>, deps: () => unknown) {
  const route = useRoute()
  const page = computed(() => Math.max(1, Number.parseInt(String(route.query.p ?? 1)) || 1))

  const items = ref([]) as Ref<T[]>
  const hasMore = ref(false)
  const loading = ref(true)
  const error = ref(false)

  let latest = 0

  async function reload() {
    const request = ++latest
    loading.value = true
    error.value = false
    try {
      const result = await load(page.value)
      if (request !== latest) return
      items.value = result.items
      hasMore.value = result.hasMore
    } catch (e) {
      if (request !== latest) return
      console.error('Error loading list:', e)
      error.value = true
    } finally {
      if (request === latest) loading.value = false
    }
  }

  watch([page, deps], reload, { immediate: true })

  return { page, items, hasMore, loading, error, reload }
}
