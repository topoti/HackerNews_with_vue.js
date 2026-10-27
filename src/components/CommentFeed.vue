<template>
  <div>
    <p v-if="error" class="status">
      Couldn't load comments. <button class="retry" @click="emit('retry')">Retry</button>
    </p>
    <h2 v-else-if="loading" class="status">Loading Comments...</h2>
    <p v-else-if="items.length === 0" class="status">No comments.</p>
    <template v-else>
      <ul class="feed">
        <li v-for="{ comment, story } in items" :key="comment.id" class="comment-item">
          <CommentItem
            :item="comment"
            :story="story"
            :parent="comment.parent ? { path: '/item', query: { id: comment.parent } } : undefined"
          />
        </li>
      </ul>
      <PageNav :page="page" :has-more="hasMore" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FeedComment } from '@/api/algolia'
import CommentItem from '@/components/CommentItem.vue'
import PageNav from '@/components/PageNav.vue'

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
.feed {
  list-style: none;
}

.comment-item {
  margin: 10px 0;
  border: 1px solid var(--border);
  border-radius: 5px;
}

.status {
  margin: 20px 0;
  text-align: center;
}

.retry {
  margin-left: 6px;
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--accent);
  color: white;
  font: inherit;
  cursor: pointer;
}
</style>
