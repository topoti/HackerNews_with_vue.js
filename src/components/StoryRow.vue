<template>
  <li class="story-item">
    <a v-if="item.url" :href="item.url" rel="noreferrer">{{ item.title }}</a>
    <router-link v-else :to="itemLink">{{ item.title }}</router-link>
    <span v-if="site" class="site">
      (<router-link :to="{ path: '/from', query: { site } }">{{ site }}</router-link
      >)
    </span>
    <p>
      <template v-if="!isJob">
        {{ pluralize(item.score ?? 0, 'point') }} by
        <router-link :to="{ path: '/user', query: { id: item.by } }">{{ item.by }}</router-link>
        |
        <router-link :to="itemLink">{{ comments }}</router-link>
        |
      </template>
      Created {{ timeAgo(item.time) }}
    </p>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/types/hn'
import { domain, pluralize, timeAgo } from '@/utils/format'

const props = defineProps<{ item: Item }>()

const itemLink = computed(() => ({ path: '/item', query: { id: props.item.id } }))
const isJob = computed(() => props.item.type === 'job')
const site = computed(() => domain(props.item.url))
const comments = computed(() => pluralize(props.item.descendants ?? 0, 'Comment'))
</script>

<style scoped>
.story-item {
  margin: 15px 0;
  padding: 10px;
  border-bottom: 1px solid var(--border);
}

.site,
.site a {
  color: var(--muted);
  font-size: 13px;
}

p {
  margin-top: 2px;
}
</style>
