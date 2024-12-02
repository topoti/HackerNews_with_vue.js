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

<script setup>
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const user = ref(null)
const route = useRoute()

const fetchUser = async() => {
  const { id } = route.params
  const { data } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/user/${id}.json`
  )
  user.value = data
}

onMounted(fetchUser)
</script>
