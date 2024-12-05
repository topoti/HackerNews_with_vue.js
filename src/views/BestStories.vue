<template>
  <div>
    <Header />
    <h2>Best Stories</h2>
    <FetchStories endpoint = 'https://hacker-news.firebaseio.com/v0/beststories.json'/>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import FetchStories from '@/components/FetchStories.vue';

</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>
