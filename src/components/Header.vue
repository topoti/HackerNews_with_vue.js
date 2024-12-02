<template>
  <header class="header">
    <nav>
      <h1>Hacker News</h1>
      <ul class="nav-links">
        <li><a href="/">Top Stories</a></li>
        <li><a href="/best">Best Stories</a></li>
        <li><a href="/new">New Stories</a></li>
        <li><a href="/ask">Ask Stories</a></li>
        <li><a href="/jobs">Jobs</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: #ff6600;
  padding: 10px;
  color: white;
  text-align: center;
}

#nav a.router-link-exact-active {
  color: #42b983
}
.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}
.nav-links li {
  margin: 0 10px;
}
.nav-links a {
  color: white;
  text-decoration: none;
}
.nav-links a:hover {
  text-decoration: underline;
}
.nav-links li:focus {
  background: bisque;
}
</style>
