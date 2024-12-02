<template>
  <ul>
    <li v-for="comment in comments" :key="comment.id" class="comment-item">
      <CommentItem :comment="comment" />
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';
import CommentItem from './CommentItem.vue';

const props = defineProps({
  comments: Array
})
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
