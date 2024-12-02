<template>
  <div>
    <Header />
    <h2>Jobs</h2>
    <StoryList :stories="stories" />
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Header from '../components/Header.vue';
import StoryList from '../components/StoryList.vue';

// Reactive state variables
const stories = ref([]);
const loading = ref(true);

// Fetch job stories on component mount
const fetchStories = async () => {
  try {
    const { data: storyIds } = await axios.get(
      'https://hacker-news.firebaseio.com/v0/jobstories.json'
    );
    const limitedStoryIds = storyIds.slice(0, 20); // Fetch 20 best stories

    // Fetch story details in parallel
    stories.value = await Promise.all(
      limitedStoryIds.map(async (id) => {
        const { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return data;
      })
    );
  } catch (error) {
    console.error('Error fetching job stories:', error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle hook
onMounted(fetchStories);
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 10px;
}
</style>
