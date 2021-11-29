<template>
  <b-card
      class="column"
      :header="title"
      bg-variant="light"
  >
    <b-card v-for="card in cards" :title="card.title" class="card" :key="card.title">
      {{ card.text }}
    </b-card>
    <b-button variant="outline-secondary" class="addCard">+ add card</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Column',
  props: {
    title: String,
  },
  data() {
    return {
      cards: [
        {title: "1", text: "some text"},
        {title: "2", text: "some text"},
        {title: "3", text: "some text"},
      ]
    }
  }
}
</script>

<style scoped>
.column {
  font-size: 1rem;
  max-width: 18rem;
  min-width: 18rem !important;
  overflow-y: auto;
}

.card {
  width: 100%;
  margin-bottom: 5px;
}

.addCard {
  width: 100%;
}
</style>