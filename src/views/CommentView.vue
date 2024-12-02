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

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import CommentList from '../components/CommentList.vue';
import axios from 'axios';

const story = ref(null)
const comments = ref([])
const loading = ref(true)
const route = useRoute()

const fetchComment = async() => {
  const { id } = route.params
  try {
    const { data } = await axios.get(
       `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )
    story.value = data

    if(data.kids) {
      comments.value = await Promise.all(
        data.kids.map(async (commentId) => {
          const { data } = await axios.get(
             `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
          )
          return data
        })
      )
    }
  }

  catch(error) {
    console.error('Error loading comment:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(fetchComment)
</script>

<style scoped>
h2 {
  margin-top: 20px;
  text-align: center;
}
</style>
