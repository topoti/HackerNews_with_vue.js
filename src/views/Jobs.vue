<template>
  <div>
    <Header />
    <h2>Jobs</h2>
    <Pagination endpoint = 'https://hacker-news.firebaseio.com/v0/jobstories.json'/>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Pagination from '@/components/Pagination.vue';

</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 10px;
}
</style>
