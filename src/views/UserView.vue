<template>
  <div>
    <Header />
    <div v-if="user">
      <h2>{{ user.id }}</h2>
      <p>Created: {{ ConvertTime(user.created) }}</p>
      <p>Karma: {{ user.karma }}</p>
      <div v-html="user.about"></div>
    </div>
    <p v-else>Loading user...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import ConvertTime from '../components/GlobalFunction/ConvertTime.js' 

interface User {
  id: number
  created: number
  karma: number
  about: string
}
const user = ref< User | null> (null)
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
