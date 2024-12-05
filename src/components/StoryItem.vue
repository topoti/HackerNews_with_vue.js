<template>
  <li class="story-item">
    <a :href="`${story.url}`">{{ story.title }}</a>
    <p>{{ story.score }} points by <a :href="`/user/${story.by}`">{{ story.by }}</a> | <a :href="`item/${story.id}`"> {{ story.descendants }} Comments</a> | Created {{ ConvertTime(story.time) }} ago </p>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ConvertTime from './GlobalFunction/ConvertTime.js' 

interface StoryValue {
  id: Number
  title: string
  by: string
  score: number,
  descendants: number,
  time: number
  url:string
}

const props = defineProps<{
  story: StoryValue;
}>();
 
</script>

<style scoped>
.story-item {
  margin: 15px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
a {
  color: #0073e6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
