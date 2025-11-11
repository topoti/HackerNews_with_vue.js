<template>
  <div>
    <p v-if="error" class="status">
      Couldn't load comments. <button class="link" @click="emit('retry')">Retry</button>
    </p>
    <p v-else-if="loading" class="status">Loading…</p>
    <p v-else-if="items.length === 0" class="status">No comments.</p>
    <template v-else>
      <CommentItem
        v-for="{ comment, story } in items"
        :key="comment.id"
        :item="comment"
        :story="story"
        :parent="comment.parent ? { path: '/item', query: { id: comment.parent } } : undefined"
      />
      <MoreLink v-if="hasMore" :page="page" class="more" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FeedComment } from '@/api/algolia'
import CommentItem from '@/components/CommentItem.vue'
import MoreLink from '@/components/MoreLink.vue'

defineProps<{
  items: FeedComment[]
  page: number
  hasMore: boolean
  loading: boolean
  error: boolean
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<style scoped>
.more {
  margin-left: 14px;
}

.status {
  margin: 10px 4px;
}

.link {
  border: 0;
  background: none;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}
</style>
