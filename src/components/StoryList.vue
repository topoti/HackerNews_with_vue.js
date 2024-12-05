<template>
  <ul>
    <StoryItem
      v-for="story in stories"
      :key="story.id"
      :story="story"
    />
  </ul>
</template>

<script setup lang="ts">
import StoryItem from './StoryItem.vue';
import { defineProps } from 'vue';

interface Story {
  id: number
}

const props = defineProps<{
  stories: Story[]; 
}>();

</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
