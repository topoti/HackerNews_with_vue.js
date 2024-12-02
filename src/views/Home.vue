<template>
  <div>
    <Header />
    <h2>Top Stories </h2>
    <StoryList :stories="stories" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue';
import StoryList from '../components/StoryList.vue';
import axios from 'axios';

const stories = ref([])

const fetchStories = async() => {
  const { data } = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  )
  const storyIds = data.slice(0, 20)
  stories.value = await Promise.all(
    storyIds.map(async (id)=> {
      const { data } = await axios.get(
         `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      )
      return data
    })
  )
}

onMounted(fetchStories)
</script>

<style scoped> 
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>