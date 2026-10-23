<template>
  <section>
    <h2 class="page-heading">
      Stories from {{ heading }}
      <br />
      Go back a
      <router-link :to="dayLink({ days: -1 })">day</router-link>,
      <router-link :to="dayLink({ months: -1 })">month</router-link>, or
      <router-link :to="dayLink({ years: -1 })">year</router-link>.
      <template v-if="canGoForward">
        Go forward a <router-link :to="dayLink({ days: 1 })">day</router-link>.
      </template>
    </h2>
    <StoryList
      :items="items"
      :page="page"
      :has-more="hasMore"
      :loading="loading"
      :error="error"
      @retry="reload"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { frontPage } from '@/api/algolia'
import StoryList from '@/components/StoryList.vue'
import { usePaged } from '@/composables/usePaged'

const route = useRoute()

const DAY_MS = 86_400_000

function todayUtc(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

function toParam(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** ?day=YYYY-MM-DD as a UTC midnight; defaults to yesterday, like HN. */
const day = computed(() => {
  const parsed = new Date(`${route.query.day}T00:00:00Z`)
  const yesterday = new Date(todayUtc().getTime() - DAY_MS)
  return Number.isNaN(parsed.getTime()) || parsed > yesterday ? yesterday : parsed
})

const heading = computed(() =>
  day.value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    timeZone: 'UTC',
  }),
)

const canGoForward = computed(() => day.value.getTime() + DAY_MS < todayUtc().getTime())

function dayLink({ days = 0, months = 0, years = 0 }) {
  const d = new Date(day.value)
  d.setUTCFullYear(d.getUTCFullYear() + years, d.getUTCMonth() + months, d.getUTCDate() + days)
  return { query: { day: toParam(d) } }
}

const { page, items, hasMore, loading, error, reload } = usePaged(
  (page) => frontPage(day.value.getTime() / 1000, page),
  () => day.value.getTime(),
)
</script>
