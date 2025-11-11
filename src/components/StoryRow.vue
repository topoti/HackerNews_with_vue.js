<template>
  <li class="row">
    <span class="rank">{{ rank ? `${rank}.` : '' }}</span>
    <span class="vote" aria-hidden="true">{{ isJob ? '' : '▲' }}</span>
    <div>
      <span class="title">
        <a v-if="item.url" :href="item.url" rel="noreferrer">{{ item.title }}</a>
        <router-link v-else :to="itemLink">{{ item.title }}</router-link>
        <span v-if="site" class="site">
          (<router-link :to="{ path: '/from', query: { site } }">{{ site }}</router-link
          >)</span
        >
      </span>
      <div class="subtext">
        <template v-if="!isJob">
          {{ pluralize(item.score ?? 0, 'point') }} by
          <router-link :to="{ path: '/user', query: { id: item.by } }">{{ item.by }}</router-link
          >{{ ' ' }}
        </template>
        <router-link :to="itemLink">{{ timeAgo(item.time) }}</router-link>
        <template v-if="!isJob">
          {{ ' | ' }}
          <router-link :to="itemLink">{{ comments }}</router-link>
        </template>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/types/hn'
import { domain, pluralize, timeAgo } from '@/utils/format'

const props = defineProps<{
  item: Item
  rank?: number
}>()

const itemLink = computed(() => ({ path: '/item', query: { id: props.item.id } }))
const isJob = computed(() => props.item.type === 'job')
const site = computed(() => domain(props.item.url))
const comments = computed(() => {
  const count = props.item.descendants ?? 0
  return count === 0 ? 'discuss' : pluralize(count, 'comment')
})
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: auto 14px 1fr;
  align-items: start;
  margin-bottom: 5px;
}

.rank {
  min-width: calc(var(--rank-ch, 3) * 1ch);
  padding-right: 2px;
  color: var(--hn-grey);
  text-align: right;
}

.vote {
  color: #9a9a9a;
  font-size: 8pt;
  text-align: center;
}

.title a {
  color: #000;
  text-decoration: none;
}

.title a:visited {
  color: var(--hn-grey);
}

.site {
  color: var(--hn-grey);
  font-size: 8pt;
}

.title .site a {
  color: var(--hn-grey);
}

.title .site a:hover {
  text-decoration: underline;
}

.subtext {
  color: var(--hn-grey);
  font-size: 7pt;
}

.subtext a {
  color: var(--hn-grey);
  text-decoration: none;
}

.subtext a:hover {
  text-decoration: underline;
}
</style>
