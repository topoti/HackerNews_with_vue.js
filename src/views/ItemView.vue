<template>
  <section>
    <p v-if="error" class="status">
      Couldn't load this item. <button class="link" @click="load">Retry</button>
    </p>
    <p v-else-if="loading" class="status">Loading…</p>
    <p v-else-if="!item" class="status">No such item.</p>

    <template v-else-if="item.type === 'comment'">
      <CommentItem
        :item="item"
        :story="story ?? undefined"
        :parent="item.parent ? { path: '/item', query: { id: item.parent } } : undefined"
      >
        <CommentTree v-if="item.kids" :ids="item.kids" :op="story?.by" :parent-id="item.id" />
      </CommentItem>
    </template>

    <template v-else>
      <div class="story">
        <h2>
          <a v-if="item.url" :href="item.url" rel="noreferrer">{{ item.title }}</a>
          <template v-else>{{ item.title }}</template>
        </h2>
        <p class="meta">
          <template v-if="item.type !== 'job'">
            <strong>{{ item.score ?? 0 }}</strong> points by
            <router-link :to="{ path: '/user', query: { id: item.by } }">{{ item.by }}</router-link>
            |
          </template>
          Created {{ timeAgo(item.time) }}
          <template v-if="site">
            | <router-link :to="{ path: '/from', query: { site } }">{{ site }}</router-link>
          </template>
        </p>
        <div v-if="item.text" class="text hn-text" v-html="sanitize(item.text)" />
        <ul v-if="pollOptions.length" class="poll">
          <li v-for="option in pollOptions" :key="option.id">
            <div class="hn-text" v-html="sanitize(option.text)" />
            <span class="points">{{ pluralize(option.score ?? 0, 'point') }}</span>
          </li>
        </ul>
      </div>
      <h3 v-if="item.kids" class="comments-heading">
        {{ pluralize(item.descendants ?? 0, 'Comment') }}
      </h3>
      <CommentTree v-if="item.kids" :ids="item.kids" :op="item.by" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/CommentItem.vue'
import CommentTree from '@/components/CommentTree.vue'
import { useItemsStore } from '@/stores/items'
import type { Item } from '@/types/hn'
import { domain, pluralize, timeAgo } from '@/utils/format'
import { sanitize } from '@/utils/sanitize'

const route = useRoute()
const store = useItemsStore()

const id = computed(() => Number(route.query.id))
const item = ref<Item | null>(null)
/** For a comment: the story at the top of its thread. */
const story = ref<Item | null>(null)
const pollOptions = ref<Item[]>([])
const site = computed(() => domain(item.value?.url))
const loading = ref(true)
const error = ref(false)

async function findStory(comment: Item): Promise<Item | null> {
  let current: Item | null = comment
  while (current?.type === 'comment' && current.parent) {
    current = await store.getItem(current.parent)
  }
  return current
}

let latest = 0

async function load() {
  const request = ++latest
  loading.value = true
  error.value = false
  story.value = null
  pollOptions.value = []
  try {
    const result = Number.isInteger(id.value) ? await store.getItem(id.value) : null
    if (request !== latest) return
    item.value = result
    document.title = `${result?.title ?? 'Hacker News'} | Hacker News`
    if (result?.type === 'comment') {
      story.value = await findStory(result)
      if (request === latest && story.value?.title) {
        document.title = `${story.value.title} | Hacker News`
      }
    } else if (result?.parts) {
      pollOptions.value = await store.getItems(result.parts)
    }
  } catch (e) {
    if (request !== latest) return
    console.error('Error fetching item:', e)
    error.value = true
  } finally {
    if (request === latest) loading.value = false
  }
}

watch(id, load, { immediate: true })
</script>

<style scoped>
.story {
  margin: 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border);
}

.story h2 a {
  color: inherit;
}

.meta {
  margin-top: 4px;
}

.text {
  margin-top: 10px;
  max-width: 80ch;
}

.poll {
  list-style: none;
  margin-top: 10px;
}

.poll li {
  margin-bottom: 8px;
}

.points {
  color: var(--muted);
  font-size: 13px;
}

.comments-heading {
  margin-top: 20px;
}

.status {
  margin: 20px 0;
  text-align: center;
}

.link {
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--accent);
  color: white;
  font: inherit;
  cursor: pointer;
}
</style>
