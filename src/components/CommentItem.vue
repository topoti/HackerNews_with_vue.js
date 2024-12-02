<template>
  <div>
    <p v-html="comment.text" class="comment-text"></p>
    <p class="comment-meta">
      <strong>{{ comment.by }}</strong> | {{ timeAgo }}
    </p>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  comment: Object
})

const timeAgo = computed(() => {
  const seconds = Math.floor(Date.now() / 1000 - props.comment.time);
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
      };
      for (const key in intervals) {
        const interval = Math.floor(seconds / intervals[key]);
        if (interval > 0) return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
      }
      return 'just now';
})

const fetchComment = async() => {
  if(props.comment.kids) {
    props.comment.kids.map(async (id) => {
      const { data } = await axios.get(
         `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      )
      return data
    })
  }
}

onMounted(fetchComment)
</script>

<style scoped>
.comment-text {
  margin: 0;
}
.comment-meta {
  font-size: 0.9em;
  color: #666;
}
</style>
