<template>
  <footer class="footer">
    <nav>
      <template v-for="(link, i) in links" :key="link.href">
        <span v-if="i > 0"> | </span>
        <a :href="link.href">{{ link.label }}</a>
      </template>
    </nav>
    <form class="search" role="search" @submit.prevent="search">
      <label>
        Search:
        <input v-model="query" type="search" name="q" autocomplete="off" />
      </label>
    </form>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const query = ref('')

// Keep the box in sync with the results page, e.g. after Back.
watch(
  () => route.query.q,
  (q) => (query.value = route.path === '/search' ? String(q ?? '') : query.value),
  { immediate: true },
)

function search() {
  const q = query.value.trim()
  if (q) router.push({ path: '/search', query: { q } })
}

const HN = 'https://news.ycombinator.com'
const links = [
  { label: 'Guidelines', href: `${HN}/newsguidelines.html` },
  { label: 'FAQ', href: `${HN}/newsfaq.html` },
  { label: 'Lists', href: `${HN}/lists` },
  { label: 'API', href: 'https://github.com/HackerNews/API' },
  { label: 'Security', href: `${HN}/security.html` },
  { label: 'Legal', href: 'https://www.ycombinator.com/legal/' },
  { label: 'Apply to YC', href: 'https://www.ycombinator.com/apply/' },
  { label: 'Contact', href: 'mailto:hn@ycombinator.com' },
]
</script>

<style scoped>
.footer {
  border-top: 2px solid var(--hn-orange);
  padding: 10px 4px 20px;
  font-size: 8pt;
  text-align: center;
}

.footer a {
  color: #000;
  text-decoration: none;
}

.search {
  margin-top: 16px;
  color: var(--hn-grey);
  font-size: 10pt;
}

.search input {
  width: min(16em, 60vw);
  font: inherit;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
