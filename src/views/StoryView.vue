<template>
  <div>
    <Header />
    <div v-if="story">
      <h2>{{ story.title }}</h2>
      <p>{{ story.text }}</p>
      <p>
        <strong>{{ story.score }}</strong> points by
        <a :href="`/user/${story.by}`">{{ story.by }}</a>
      </p>
    </div>
    <p v-else>Loading story...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

interface Story {
  id: number
  title: string
  by: string
  score: number
  descendants: number
  text: string
}

const story = ref< Story | null > (null)
const route = useRoute()
 
const fetchStoryView = async() => {
  const { id } = route.params
  const { data } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  )
  story.value = data
}

onMounted(fetchStoryView)
</script>
