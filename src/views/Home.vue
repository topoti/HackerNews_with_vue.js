<template>
  <div>
    <Header />
    <h2>Top Stories </h2>
    <StoryList :stories="stories" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import StoryList from '../components/StoryList.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { Header, StoryList },
  data() {
    return {
      stories: [],
    };
  },
  async created() {
    const { data } = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    const storyIds = data.slice(0, 30);
    this.stories = await Promise.all(
      storyIds.map(async (id) => {
        const { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return data;
      })
    );
  },
};
</script>

<style scoped> 
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>