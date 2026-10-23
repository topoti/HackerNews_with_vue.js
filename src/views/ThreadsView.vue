<template>
  <section>
    <h2 class="page-heading">
      Comments by
      <router-link :to="{ path: '/user', query: { id: author } }">{{ author }}</router-link>
    </h2>
    <CommentFeed
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
import { commentsByAuthor } from '@/api/algolia'
import CommentFeed from '@/components/CommentFeed.vue'
import { usePaged } from '@/composables/usePaged'

const route = useRoute()
const author = computed(() => String(route.query.id ?? ''))
const { page, items, hasMore, loading, error, reload } = usePaged(
  (page) => commentsByAuthor(author.value, page),
  () => author.value,
)
</script>
