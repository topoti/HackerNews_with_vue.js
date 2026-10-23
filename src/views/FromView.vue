<template>
  <section>
    <h2 class="page-heading">Submissions from {{ site }}</h2>
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
import { storiesFromSite } from '@/api/algolia'
import StoryList from '@/components/StoryList.vue'
import { usePaged } from '@/composables/usePaged'
import { domain } from '@/utils/format'

const route = useRoute()
const site = computed(() => String(route.query.site ?? ''))
const { page, items, hasMore, loading, error, reload } = usePaged(
  async (page) => {
    const result = await storiesFromSite(site.value, page)
    // Algolia matches the text anywhere in the URL; keep only this site's links.
    return { ...result, items: result.items.filter((item) => domain(item.url) === site.value) }
  },
  () => site.value,
)
</script>
