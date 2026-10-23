<template>
  <section>
    <p v-if="kind === 'job'" class="banner">
      These are jobs at YC startups. See more at
      <a href="https://www.ycombinator.com/jobs">ycombinator.com/jobs</a>.
    </p>
    <p v-else-if="kind === 'show'" class="banner">
      Please read the
      <a href="https://news.ycombinator.com/showhn.html">Show HN rules and tips</a>
      before posting.
    </p>

    <StoryList
      :items="items"
      :page="page"
      :has-more="hasMore"
      :loading="loading"
      :error="error"
      :ranked="kind !== 'job'"
      @retry="reload"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StoryList from '@/components/StoryList.vue'
import { usePaged } from '@/composables/usePaged'
import { useItemsStore } from '@/stores/items'

const PER_PAGE = 30

const route = useRoute()
const store = useItemsStore()

const kind = computed(() => route.meta.kind ?? 'top')

const { page, items, hasMore, loading, error, reload } = usePaged(
  async (page) => {
    const ids = await store.getList(kind.value)
    const start = (page - 1) * PER_PAGE
    return {
      items: await store.getItems(ids.slice(start, start + PER_PAGE)),
      hasMore: start + PER_PAGE < ids.length,
    }
  },
  () => kind.value,
)
</script>

<style scoped>
.banner {
  margin: 0 0 10px 4px;
  color: var(--hn-grey);
}

.banner a {
  color: #000;
}
</style>
