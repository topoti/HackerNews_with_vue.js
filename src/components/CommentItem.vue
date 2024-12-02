<template>
  <div>
    <p v-html="comment.text" class="comment-text"></p>
    <p class="comment-meta">
      <strong>{{ comment.by }}</strong> | {{ timeAgo }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CommentItem',
  props: {
    comment: Object,
  },

  computed: {
    timeAgo() {
      const seconds = Math.floor(Date.now() / 1000 - this.comment.time);
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
    },
  },
 
  async created() {
    if (this.comment.kids) {
        this.comment.kids.map(async (id) => {
          const { data } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return data;
        })
    }
  },
};
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
