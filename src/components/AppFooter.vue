<template>
  <footer class="footer">
    <form class="search" role="search" @submit.prevent="search">
      <input
        v-model="query"
        type="search"
        name="q"
        placeholder="Search stories"
        aria-label="Search stories"
        autocomplete="off"
      />
      <button type="submit">Search</button>
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
</script>

<style scoped>
.footer {
  margin-top: 20px;
  padding: 20px 16px;
  border-top: 1px solid var(--border);
}

.search {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.search input {
  width: min(20em, 60vw);
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: 5px;
  font: inherit;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--accent);
  color: white;
  font: inherit;
  cursor: pointer;
}
</style>
