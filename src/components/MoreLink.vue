<template>
  <router-link class="more" :to="{ query: { ...route.query, p: page + 1 } }">More</router-link>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{ page: number }>()

const route = useRoute()
</script>

<style scoped>
.more {
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #000;
  text-decoration: none;
}
</style>
