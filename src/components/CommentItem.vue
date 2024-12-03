<template>
  <div class="comment">
    <p>
      <strong>{{ comment.by }}</strong> <span>{{ timeAgo }}</span>
    </p>
    <p v-html="comment.text"></p>
    <div class="replies" v-if="comment.kids && replies.length > 0">
      <h4>Replies:</h4>
      <CommentItem
        v-for="reply in replies"
        :key="reply.id"
        :comment="reply"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, defineProps, computed } from 'vue';

const props = defineProps({
  comment: Object
})
const replies = ref([])

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

const fetchReplies = async() => {
  if(props.comment.kids && props.comment.kids.length > 0) {
    replies.value = await Promise.all(
      props.comment.kids.map(async (kidId) => {
        const { data } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${kidId}.json`
          );
          return data;
      })
    )
  }
}
onMounted(fetchReplies)
</script>

<style scoped>
.comment {
  margin: 10px 0;
  padding: 10px;
  border-left: 2px solid #ddd;
}
.comment p {
  margin: 5px 0;
}
.replies {
  margin-left: 20px;
}
</style>
