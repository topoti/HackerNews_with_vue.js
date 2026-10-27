<template>
  <nav class="pagination" aria-label="Pagination">
    <router-link v-if="page > 1" class="button" :to="pageLink(page - 1)">Previous</router-link>
    <span v-else class="button disabled">Previous</span>
    <span>Page {{ page }}</span>
    <router-link v-if="hasMore" class="button" :to="pageLink(page + 1)">Next</router-link>
    <span v-else class="button disabled">Next</span>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{ page: number; hasMore: boolean }>()

const route = useRoute()

function pageLink(p: number) {
  return { query: { ...route.query, p: p > 1 ? p : undefined } }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px;
}

.button {
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--accent);
  color: white;
  text-decoration: none;
}

.button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
