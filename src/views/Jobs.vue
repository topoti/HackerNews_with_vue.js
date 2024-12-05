<template>
  <div>
    <Header />
    <h2>Jobs</h2>
    <FetchStories endpoint = 'https://hacker-news.firebaseio.com/v0/jobstories.json'/>
  </div>
</template>

<script setup>
import FetchStories from '@/components/FetchStories.vue';
import Header from '../components/Header.vue';

</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 10px;
}
</style>
