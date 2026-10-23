<template>
  <div :style="{ '--rank-ch': rankWidth }">
    <p v-if="error" class="status">
      Couldn't load stories. <button class="link" @click="emit('retry')">Retry</button>
    </p>
    <ul v-else-if="loading" class="skeleton" aria-busy="true" aria-label="Loading stories">
      <li v-for="n in 10" :key="n"><span /><span /></li>
    </ul>
    <p v-else-if="items.length === 0" class="status">{{ empty ?? 'No stories.' }}</p>
    <template v-else>
      <ol class="stories">
        <StoryRow
          v-for="(item, i) in items"
          :key="item.id"
          :item="item"
          :rank="ranked ? start + i + 1 : undefined"
        />
      </ol>
      <MoreLink v-if="hasMore" :page="page" class="more" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MoreLink from '@/components/MoreLink.vue'
import StoryRow from '@/components/StoryRow.vue'
import type { Item } from '@/types/hn'

const PER_PAGE = 30

const props = withDefaults(
  defineProps<{
    items: Item[]
    page: number
    hasMore: boolean
    loading: boolean
    error: boolean
    ranked?: boolean
    empty?: string
  }>(),
  { ranked: true, empty: undefined },
)

const emit = defineEmits<{ retry: [] }>()

const start = computed(() => (props.page - 1) * PER_PAGE)
const rankWidth = computed(() => String(start.value + PER_PAGE).length + 1)
</script>

<style scoped>
.stories {
  list-style: none;
}

.more {
  margin-left: calc(var(--rank-ch, 3) * 1ch + 16px);
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

.skeleton {
  list-style: none;
  padding-left: calc(3ch + 16px);
}

.skeleton li {
  margin-bottom: 9px;
}

.skeleton span {
  display: block;
  height: 10px;
  margin-bottom: 4px;
  border-radius: 2px;
  background: #e5e5dc;
}

.skeleton span:first-child {
  width: 55%;
}

.skeleton span:last-child {
  width: 30%;
  height: 7px;
}
</style>
