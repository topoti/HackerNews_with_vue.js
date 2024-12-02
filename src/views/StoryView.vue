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

<script>
import Header from '../components/Header.vue';
import axios from 'axios';

export default {
  name: 'StoryView',
  components: { Header },
  data() {
    return {
      story: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    this.story = data;
  },
};
</script>
