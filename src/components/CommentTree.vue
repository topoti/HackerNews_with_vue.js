<template>
  <div v-if="comments.length || loading || error" class="tree" :class="{ nested: parentId }">
    <CommentItem
      v-for="(comment, i) in comments"
      :key="comment.id"
      :item="comment"
      :op="op"
      :parent="parentId ? { hash: `#${parentId}` } : undefined"
      :prev-id="comments[i - 1]?.id"
      :next-id="comments[i + 1]?.id"
    >
      <CommentTree v-if="comment.kids" :ids="comment.kids" :op="op" :parent-id="comment.id" />
    </CommentItem>

    <p v-if="loading" class="status">Loading…</p>
    <p v-else-if="error" class="status">
      Couldn't load replies. <button class="more" @click="loadMore">Retry</button>
    </p>
    <button v-else-if="remaining > 0" class="more" @click="loadMore">
      {{ remaining }} more {{ remaining === 1 ? 'reply' : 'replies' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CommentItem from '@/components/CommentItem.vue'
import { useItemsStore } from '@/stores/items'
import type { Item } from '@/types/hn'

const BATCH = 30

const props = defineProps<{
  ids: number[]
  op?: string
  /** Id of the comment these are replies to; unset for top-level comments. */
  parentId?: number
}>()

const store = useItemsStore()
const comments = ref<Item[]>([])
const shown = ref(0)
const loading = ref(false)
const error = ref(false)

const remaining = computed(() => props.ids.length - shown.value)

/** Deleted comments with no replies are left out, as HN does. */
function isVisible(item: Item) {
  return !(item.deleted && !item.kids?.length)
}

async function loadMore() {
  const ids = props.ids
  loading.value = true
  error.value = false
  try {
    const next = Math.min(shown.value + BATCH, ids.length)
    const items = await store.getItems(ids.slice(shown.value, next))
    if (ids !== props.ids) return
    comments.value.push(...items.filter(isVisible))
    shown.value = next
  } catch (e) {
    console.error('Error fetching comments:', e)
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(
  () => props.ids,
  () => {
    comments.value = []
    shown.value = 0
    loadMore()
  },
  { immediate: true },
)
</script>

<style scoped>
.nested {
  margin-left: 40px;
}

.status,
.more {
  margin: 8px 0 0 14px;
  color: var(--hn-grey);
  font-size: 8pt;
}

.more {
  border: 0;
  background: none;
  font-family: inherit;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 750px) {
  .nested {
    margin-left: 14px;
  }
}
</style>
