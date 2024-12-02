<template>
  <li class="story-item">
    <a :href="`/story/${story.id}`">{{ story.title }}</a>
    <p>{{ story.score }} points by <a :href="`/user/${story.by}`">{{ story.by }}</a> | <a :href="`item/${story.id}`"> {{ story.descendants }} Comments</a> | Created at {{ new Date(story.time * 1000).toLocaleString() }} </p>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  story: Object
})
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
