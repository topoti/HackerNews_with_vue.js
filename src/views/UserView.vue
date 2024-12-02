<template>
  <div>
    <Header />
    <div v-if="user">
      <h2>{{ user.id }}</h2>
      <p>Created: {{ new Date(user.created * 1000).toLocaleString() }}</p>
      <p>Karma: {{ user.karma }}</p>
      <div v-html="user.about"></div>
    </div>
    <p v-else>Loading user...</p>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import axios from 'axios';

export default {
  name: 'UserView',
  components: { Header },
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/user/${id}.json`
    );
    this.user = data;
  },
};
</script>
