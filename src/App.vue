<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import EventCard from './components/EventCard.vue'
// import Home from './views/Home.vue';
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Events</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983
}
h4 {
font-size: 20px;
}
</style>
