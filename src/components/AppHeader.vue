<template>
  <header class="header">
    <router-link to="/" class="logo" aria-label="Hacker News home">Y</router-link>
    <nav>
      <router-link to="/news" class="site-name">Hacker News</router-link>
      <span class="links">
        <template v-for="(link, i) in links" :key="link.to">
          <span v-if="i > 0" class="sep"> | </span>
          <router-link :to="link.to">{{ link.label }}</router-link>
        </template>
      </span>
    </nav>
  </header>
</template>

<script setup lang="ts">
const links = [
  { to: '/newest', label: 'new' },
  { to: '/front', label: 'past' },
  { to: '/newcomments', label: 'comments' },
  { to: '/ask', label: 'ask' },
  { to: '/show', label: 'show' },
  { to: '/jobs', label: 'jobs' },
]
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px;
  background: var(--hn-orange);
}

.logo {
  flex: none;
  width: 18px;
  height: 18px;
  border: 1px solid #fff;
  color: #fff;
  font-weight: bold;
  line-height: 16px;
  text-align: center;
  text-decoration: none;
}

nav {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 10px;
  line-height: 1.4;
}

a {
  color: #000;
  text-decoration: none;
}

.site-name {
  font-weight: bold;
}

.links a.router-link-active {
  color: #fff;
}
</style>
