<template>
  <ul>
    <StoryItem
      v-for="story in stories"
      :key="story.id"
      :story="story"
    />
  </ul>
</template>

<script>
import StoryItem from './StoryItem.vue';

export default {
  name: 'StoryList',
  components: { StoryItem },
  props: {
    stories: Array,
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
