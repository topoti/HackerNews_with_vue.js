<template>
  <div>
    <Header />
    <div v-if="story">
      <h2>{{ story.title }}</h2>
      <p>{{ story.score }} points by <a :href="`/user/${story.by}`">{{ story.by }}</a></p>
      <p v-if="story.descendants > 0">
        <strong>{{ story.descendants }}</strong> comments:
      </p>
      <CommentList :comments="comments" />
    </div>
    <p v-if="!story && !loading">Loading story...</p>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import CommentList from '../components/CommentList.vue';
import axios from 'axios';

export default {
  name: 'CommentView',
  components: { Header, CommentList },
  data() {
    return {
      story: null,
      comments: [],
      loading: true,
    };
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      this.story = data;

      if (data.kids) {
        this.comments = await Promise.all(
          data.kids.map(async (commentId) => {
            const { data } = await axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
            );
            return data;
          })
        );
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
h2 {
  margin-top: 20px;
  text-align: center;
}
</style>
