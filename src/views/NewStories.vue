<template>
  <div>
    <Header />
    <h2>New Stories</h2>
    <FetchStories endpoint = 'https://hacker-news.firebaseio.com/v0/newstories.json'/>
  </div>
</template>

<script setup>
import FetchStories from "@/components/FetchStories.vue";
import Header from "../components/Header.vue";
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>
