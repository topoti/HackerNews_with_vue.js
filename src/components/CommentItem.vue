<template>
  <article :id="String(item.id)" ref="root" class="comment">
    <span class="vote" aria-hidden="true">▲</span>
    <div class="body">
      <div class="head">
        <template v-if="hidden">{{ item.deleted ? '[deleted]' : '[flagged]' }} </template>
        <template v-else>
          <router-link
            :class="{ op: item.by === op }"
            :to="{ path: '/user', query: { id: item.by } }"
            >{{ item.by }}</router-link
          >
          {{ ' ' }}
        </template>
        <router-link :to="{ path: '/item', query: { id: item.id } }">{{
          timeAgo(item.time)
        }}</router-link>
        <template v-for="link in navLinks" :key="link.label">
          {{ ' | ' }}<router-link :to="link.to">{{ link.label }}</router-link>
        </template>
        <template v-if="story">
          {{ ' | on: ' }}
          <router-link :to="{ path: '/item', query: { id: story.id } }">{{
            story.title
          }}</router-link>
        </template>
        {{ ' ' }}
        <button
          class="toggle"
          :aria-expanded="!collapsed"
          :aria-label="collapsed ? 'Expand comment' : 'Collapse comment'"
          @click="toggle"
        >
          {{ collapsed ? `[${hiddenCount} more]` : '[–]' }}
        </button>
      </div>
      <template v-if="!collapsed">
        <div v-if="!hidden" class="text hn-text" v-html="sanitize(item.text)" />
        <slot />
      </template>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Item } from '@/types/hn'
import { timeAgo } from '@/utils/format'
import { sanitize } from '@/utils/sanitize'

const props = defineProps<{
  item: Item
  /** Username of the story's author, highlighted in the thread. */
  op?: string
  /** Where the "parent" link goes; omitted when there is no parent to show. */
  parent?: RouteLocationRaw
  prevId?: number
  nextId?: number
  /** The story a standalone comment belongs to, shown as "on: <title>". */
  story?: Item
}>()

const root = ref<HTMLElement>()
const collapsed = ref(false)
const hiddenCount = ref(1)

const hidden = computed(() => props.item.deleted || props.item.dead)

const navLinks = computed(() => {
  const links: { label: string; to: RouteLocationRaw }[] = []
  if (props.parent) links.push({ label: 'parent', to: props.parent })
  if (props.prevId) links.push({ label: 'prev', to: { hash: `#${props.prevId}` } })
  if (props.nextId) links.push({ label: 'next', to: { hash: `#${props.nextId}` } })
  return links
})

function toggle() {
  if (!collapsed.value) {
    // Count this comment plus every reply loaded under it, like HN's "[N more]".
    hiddenCount.value = 1 + (root.value?.querySelectorAll('.comment').length ?? 0)
  }
  collapsed.value = !collapsed.value
}
</script>

<style scoped>
.comment {
  display: grid;
  grid-template-columns: 14px 1fr;
  margin-top: 12px;
}

.vote {
  color: #9a9a9a;
  font-size: 8pt;
}

.head {
  color: var(--hn-grey);
  font-size: 8pt;
}

.head a {
  color: var(--hn-grey);
  text-decoration: none;
}

.head a:hover {
  text-decoration: underline;
}

.head a.op {
  color: var(--hn-orange);
}

.toggle {
  border: 0;
  background: none;
  color: #000;
  font: inherit;
  cursor: pointer;
}

.text {
  margin-top: 2px;
  font-size: 9pt;
  overflow-wrap: anywhere;
}
</style>
