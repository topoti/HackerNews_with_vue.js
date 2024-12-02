<template>
  <ul>
    <StoryItem
      v-for="story in stories"
      :key="story.id"
      :story="story"
    />
  </ul>
</template>

<script setup>
import StoryItem from './StoryItem.vue';
import { defineProps } from 'vue';

const props = defineProps({
  stories: Array
})
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
