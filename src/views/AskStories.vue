<template>
  <div>
    <Header />
    <h2>Ask Stories</h2>
    <StoryList :stories="stories" />
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from "../components/Header.vue";
import StoryList from "../components/StoryList.vue";
import axios from "axios";

const stories = ref([])
const loading = ref(true)

const fetchStories = async () => {
try {
  const { data } = await axios.get(
   "https://hacker-news.firebaseio.com/v0/askstories.json"
  )
  const storyIds = data.slice( 0, 20)
  stories.value = await Promise.all(
    storyIds.map(async (id) => {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      )
      return data
    })
  )
}
catch (error) {
console.error("Error fetching ask stories:", error)
}
finally {
  loading.value = false
}
}

onMounted (fetchStories)
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>
