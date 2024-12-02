<template>
  <div>
    <Header />
    <h2>Best Stories</h2>
    <StoryList :stories="stories" />
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import StoryList from '../components/StoryList.vue';
import axios from 'axios';

export default {
  name: 'BestStories',
  components: { Header, StoryList },
  data() {
    return {
      stories: [],
      loading: true,
    };
  },
  async created() {
    try {
      const { data } = await axios.get(
        'https://hacker-news.firebaseio.com/v0/beststories.json'
      );
      const storyIds = data.slice(0, 20); // Fetch 20 best stories
      this.stories = await Promise.all(
        storyIds.map(async (id) => {
          const { data } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return data;
        })
      );
    } catch (error) {
      console.error('Error fetching best stories:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 10px;
}
</style>
