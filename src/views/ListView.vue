<template>
  <section :style="{ '--rank-ch': rankWidth }">
    <p v-if="kind === 'job'" class="banner">
      These are jobs at YC startups. See more at
      <a href="https://www.ycombinator.com/jobs">ycombinator.com/jobs</a>.
    </p>
    <p v-else-if="kind === 'show'" class="banner">
      Please read the
      <a href="https://news.ycombinator.com/showhn.html">Show HN rules and tips</a>
      before posting.
    </p>

    <p v-if="error" class="status">
      Couldn't load stories. <button class="link" @click="load">Retry</button>
    </p>
    <ul v-else-if="loading" class="skeleton" aria-busy="true" aria-label="Loading stories">
      <li v-for="n in 10" :key="n"><span /><span /></li>
    </ul>
    <p v-else-if="stories.length === 0" class="status">No stories.</p>
    <template v-else>
      <ol class="stories">
        <StoryRow
          v-for="(story, i) in stories"
          :key="story.id"
          :item="story"
          :rank="kind === 'job' ? undefined : start + i + 1"
        />
      </ol>
      <router-link v-if="hasMore" class="more" :to="{ query: { p: page + 1 } }">More</router-link>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import StoryRow from '@/components/StoryRow.vue'
import { useItemsStore } from '@/stores/items'
import type { Item } from '@/types/hn'

const PER_PAGE = 30

const route = useRoute()
const store = useItemsStore()

const kind = computed(() => route.meta.kind ?? 'top')
const page = computed(() => Math.max(1, Number.parseInt(String(route.query.p ?? 1)) || 1))
const start = computed(() => (page.value - 1) * PER_PAGE)

const stories = ref<Item[]>([])
const total = ref(0)
const loading = ref(true)
const error = ref(false)

const hasMore = computed(() => start.value + PER_PAGE < total.value)
const rankWidth = computed(() => String(start.value + PER_PAGE).length + 1)

// Each load gets a number so a slow response can't overwrite a newer page.
let latest = 0

async function load() {
  const request = ++latest
  loading.value = true
  error.value = false
  try {
    const ids = await store.getList(kind.value)
    const items = await store.getItems(ids.slice(start.value, start.value + PER_PAGE))
    if (request !== latest) return
    stories.value = items
    total.value = ids.length
  } catch (e) {
    if (request !== latest) return
    console.error('Error fetching stories:', e)
    error.value = true
  } finally {
    if (request === latest) loading.value = false
  }
}

watch([kind, page], load, { immediate: true })
</script>

<style scoped>
.banner {
  margin: 0 0 10px 4px;
  color: var(--hn-grey);
}

.banner a {
  color: #000;
}

.stories {
  list-style: none;
}

.more {
  display: inline-block;
  margin: 5px 0 10px calc(var(--rank-ch, 3) * 1ch + 16px);
  color: #000;
  text-decoration: none;
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
