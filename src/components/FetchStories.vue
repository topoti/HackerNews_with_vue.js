<template>
  <div>
    <StoryList :stories="paginatedStories" />
    <div v-if="loading">
      <h2>Loading Stories...</h2>
    </div>
    <div v-else-if="loading === false">
      <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import StoryList from "./StoryList.vue";
import { ref, defineProps, computed, onMounted } from "vue";

interface Stories {
  id: Number
  title: string
  by: string
  score: number,
  descendants: number,
  time: number
}

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
});
const loading = ref(true)
const allStoryIds = ref([]);
const paginatedStories = ref< Stories[] > ([])
const currentPage = ref(1);
const totalPages = ref(0);

const startIndex = computed(() => {
  return (currentPage.value -1) * props.pageSize
})

const endIndex = computed(() => {
  return currentPage.value * props.pageSize
})

async function updatePaginatedStories() {
  try{
    const pageStoryIds = allStoryIds.value.slice(
      startIndex.value, endIndex.value
    )
    paginatedStories.value = await Promise.all(
      pageStoryIds.map(async (id) => {
        const { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        )
        return data
      })
    )
  }
  catch(error) {
    console.error('Error fatching paginated stories:', error)
  }
}

const fetchStories = async() => {
  try {
    const { data } = await axios.get(props.endpoint)
    allStoryIds.value = data
    totalPages.value = Math.ceil(data.length / props.pageSize)
    await updatePaginatedStories()
  }
  catch(error) {
    console.error('Error fatching stories:', error)
  }
  finally {
    loading.value = false
  }
}

const nextPage = () => {
  if(currentPage.value < totalPages.value){
    currentPage.value++
    updatePaginatedStories()
  }
}

const prevPage = () => {
  if(currentPage.value > 1) {
    currentPage.value--
    updatePaginatedStories()
  }
}

onMounted(fetchStories)

</script>

<style scoped>
.loading {
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
}
button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
