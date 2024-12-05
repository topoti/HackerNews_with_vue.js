<template>
  <ul>
    <li v-for="comment in comments" :key="comment.id" class="comment-item">
      <CommentItem :comment="comment" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CommentItem from './CommentItem.vue';

interface Comments {
  id: number
}

const props = defineProps<{
  comments: Comments[]; 
}>();

</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
.comment-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
