<template>
  <div class="page">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.page {
  width: 85%;
  margin: 8px auto;
  background: var(--hn-bg);
}

main {
  padding: 10px 0;
}

@media (max-width: 750px) {
  .page {
    width: 100%;
    margin: 0;
  }
}
</style>
