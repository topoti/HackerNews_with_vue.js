<template>
  <div>
    <p v-if="error" class="status">
      Couldn't load stories. <button class="retry" @click="emit('retry')">Retry</button>
    </p>
    <h2 v-else-if="loading" class="status">Loading Stories...</h2>
    <p v-else-if="items.length === 0" class="status">{{ empty ?? 'No stories.' }}</p>
    <template v-else>
      <ul class="stories">
        <StoryRow v-for="item in items" :key="item.id" :item="item" />
      </ul>
      <PageNav :page="page" :has-more="hasMore" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PageNav from '@/components/PageNav.vue'
import StoryRow from '@/components/StoryRow.vue'
import type { Item } from '@/types/hn'

defineProps<{
  items: Item[]
  page: number
  hasMore: boolean
  loading: boolean
  error: boolean
  empty?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<style scoped>
.stories {
  list-style: none;
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
