<template>
  <section>
    <p v-if="error" class="status">
      Couldn't load this user. <button class="link" @click="load">Retry</button>
    </p>
    <p v-else-if="loading" class="status">Loading…</p>
    <p v-else-if="!user" class="status">No such user.</p>
    <table v-else class="profile">
      <tbody>
        <tr>
          <th>user:</th>
          <td>{{ user.id }}</td>
        </tr>
        <tr>
          <th>created:</th>
          <td>{{ formatDate(user.created) }}</td>
        </tr>
        <tr>
          <th>karma:</th>
          <td>{{ user.karma }}</td>
        </tr>
        <tr>
          <th>about:</th>
          <td class="hn-text" v-html="sanitize(user.about)" />
        </tr>
        <tr>
          <th />
          <td class="links">
            <router-link :to="{ path: '/submitted', query: { id: user.id } }"
              >submissions</router-link
            >
          </td>
        </tr>
        <tr>
          <th />
          <td class="links">
            <router-link :to="{ path: '/threads', query: { id: user.id } }">comments</router-link>
          </td>
        </tr>
      </tbody>
    </table>
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
  margin: 0 4px;
  border-spacing: 0 4px;
}

th {
  padding-right: 8px;
  color: var(--hn-grey);
  font-weight: normal;
  text-align: left;
  vertical-align: top;
}

td {
  max-width: 80ch;
  overflow-wrap: anywhere;
}

.links a {
  text-decoration: underline;
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
</style>
