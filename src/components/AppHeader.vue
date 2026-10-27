<template>
  <header class="header">
    <nav>
      <h1><router-link to="/">Hacker News</router-link></h1>
      <ul class="nav-links">
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to">{{ link.label }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const links = [
  { to: '/news', label: 'Top Stories' },
  { to: '/best', label: 'Best Stories' },
  { to: '/newest', label: 'New Stories' },
  { to: '/ask', label: 'Ask Stories' },
  { to: '/show', label: 'Show Stories' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/front', label: 'Past' },
  { to: '/newcomments', label: 'Comments' },
]
</script>

<style scoped>
.header {
  background: var(--accent);
  padding: 10px;
  color: white;
  text-align: center;
}

h1 a {
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-links li {
  margin: 0 10px;
}

.nav-links a {
  color: white;
}

.nav-links a.router-link-active {
  font-weight: bold;
}
</style>
