<template>
  <div class="event-card">
    <span>@ {{ event.time }} on {{ event.date }}</span>
    <h3>{{ event.title}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'EventCard',
    props: {
      event: Object,
    },
  }
</script>

<style scoped>
.event-card {
  padding: 40px;
  width: 300px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  margin-left: 20px;
  text-align: center;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0,0,0,0.2);
}
</style>