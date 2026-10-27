<template>
  <section>
    <p v-if="error" class="status">
      Couldn't load this user. <button class="link" @click="load">Retry</button>
    </p>
    <p v-else-if="loading" class="status">Loading…</p>
    <p v-else-if="!user" class="status">No such user.</p>
    <div v-else class="profile">
      <h2>{{ user.id }}</h2>
      <p>Created: {{ formatDate(user.created) }}</p>
      <p>Karma: {{ user.karma }}</p>
      <div v-if="user.about" class="about hn-text" v-html="sanitize(user.about)" />
      <p class="links">
        <router-link :to="{ path: '/submitted', query: { id: user.id } }">Submissions</router-link>
        |
        <router-link :to="{ path: '/threads', query: { id: user.id } }">Comments</router-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getUser } from '@/api/hn'
import type { User } from '@/types/hn'
import { formatDate } from '@/utils/format'
import { sanitize } from '@/utils/sanitize'

const route = useRoute()

const id = computed(() => String(route.query.id ?? ''))
const user = ref<User | null>(null)
const loading = ref(true)
const error = ref(false)

let latest = 0

async function load() {
  const request = ++latest
  loading.value = true
  error.value = false
  try {
    const result = id.value ? await getUser(id.value) : null
    if (request !== latest) return
    user.value = result
    document.title = `Profile: ${id.value} | Hacker News`
  } catch (e) {
    if (request !== latest) return
    console.error('Error fetching user:', e)
    error.value = true
  } finally {
    if (request === latest) loading.value = false
  }
}

watch(id, load, { immediate: true })
</script>

<style scoped>
.profile {
  margin: 20px 0;
}

.profile p {
  margin-top: 4px;
}

.about {
  margin-top: 10px;
  max-width: 80ch;
  overflow-wrap: anywhere;
}

.links {
  margin-top: 10px;
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
