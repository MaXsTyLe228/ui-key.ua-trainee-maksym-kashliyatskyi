<template>
  <b-card
      class="column"
      :header="title"
      bg-variant="light"
  >
    <b-card v-for="card in cards" :sub-title="card.title" class="card" :key="card.title">
      {{ card.text }}
    </b-card>
    <b-dropdown id="dropdown-offset" text="+ add card" class="menu">
      <input
          :value="cardName"
          type="text"
          class="inputColumn"
          placeholder="card name"
          @input="cardName = $event.target.value"
      />
      <b-button variant="primary" @click="addCard" class="addCard">Add card</b-button>
    </b-dropdown>
    <!--    <b-button variant="outline-secondary" class="addCard">+ add card</b-button>-->
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
      cards: [],
      cardName: '',
    }
  },
  methods: {
    addCard() {
      if (this.cardName) {
        const card = this.cardName
        this.cardName = '';
        const newCard = {
          title: card,
          text: '',
        };
        return this.cards.push(newCard)
      }
    },
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

.menu {
  width: 100%;
}

.inputColumn {
  height: 40px;
  width: 90%;
  margin-left: 10px;
  margin-bottom: 5px;
}

.addCard {
  height: 40px;
  width: 90%;
  margin-left: 10px;
}
</style>