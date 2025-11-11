<template>
  <section>
    <h2 class="page-heading">
      <template v-if="q">Results for “{{ q }}”</template>
      <template v-else>Type something in the search box below.</template>
    </h2>
    <StoryList
      v-if="q"
      :items="items"
      :page="page"
      :has-more="hasMore"
      :loading="loading"
      :error="error"
      empty="No results."
      @retry="reload"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { searchStories } from '@/api/algolia'
import StoryList from '@/components/StoryList.vue'
import { usePaged } from '@/composables/usePaged'

const route = useRoute()
const q = computed(() => String(route.query.q ?? '').trim())
const { page, items, hasMore, loading, error, reload } = usePaged(
  async (page) => (q.value ? searchStories(q.value, page) : { items: [], hasMore: false }),
  () => q.value,
)
</script>
