<template>
  <div class="comment">
    <p>
      <strong>{{ comment.by }}</strong> <span>{{ ConvertTime(comment.time) }}</span>
    </p>
    <p v-html="comment.text"></p>
    <div>
      <button @click="replyButton = !replyButton">Replies</button>
      <div class="replies" v-if="comment.kids && replies.length > 0">
      <div v-if="replyButton === true">
      <CommentItem
        v-for="reply in replies"
        :key="reply.id"
        :comment="reply"
      />
    </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, defineProps, computed, Comment } from 'vue';
import ConvertTime from './GlobalFunction/ConvertTime.js' 

interface Comment {
  id: number
  time: number
  by: string
  text: string,
  kids?: number[]
}

const props = defineProps<{
  comment: Comment
}>()

const replyButton = ref(false)
const replies = ref< Comment[] > ([])

const fetchReplies = async() => {
  if(props.comment.kids && props.comment.kids.length > 0) {
    replies.value = await Promise.all(
      props.comment.kids.map(async (kidId: number) => {
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
