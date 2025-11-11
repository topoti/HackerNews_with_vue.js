<template>
  <section>
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
import { newestComments } from '@/api/algolia'
import CommentFeed from '@/components/CommentFeed.vue'
import { usePaged } from '@/composables/usePaged'

const { page, items, hasMore, loading, error, reload } = usePaged(newestComments, () => null)
</script>
