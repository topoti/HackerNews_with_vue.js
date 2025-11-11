<template>
  <footer class="footer">
    <nav>
      <template v-for="(link, i) in links" :key="link.href">
        <span v-if="i > 0"> | </span>
        <a :href="link.href">{{ link.label }}</a>
      </template>
    </nav>
  </footer>
</template>

<script setup lang="ts">
const HN = 'https://news.ycombinator.com'
const links = [
  { label: 'Guidelines', href: `${HN}/newsguidelines.html` },
  { label: 'FAQ', href: `${HN}/newsfaq.html` },
  { label: 'Lists', href: `${HN}/lists` },
  { label: 'API', href: 'https://github.com/HackerNews/API' },
  { label: 'Security', href: `${HN}/security.html` },
  { label: 'Legal', href: 'https://www.ycombinator.com/legal/' },
  { label: 'Apply to YC', href: 'https://www.ycombinator.com/apply/' },
  { label: 'Contact', href: 'mailto:hn@ycombinator.com' },
]
</script>

<style scoped>
.footer {
  border-top: 2px solid var(--hn-orange);
  padding: 10px 4px 20px;
  font-size: 8pt;
  text-align: center;
}

.footer a {
  color: #000;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
