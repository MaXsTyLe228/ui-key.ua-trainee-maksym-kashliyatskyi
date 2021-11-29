<template>
  <b-card
      class="column"
      :header="title"
      bg-variant="light"
  >
    <Card v-for="card in cards" :title="card.title" :key="card.title"/>
    <!--    <b-card v-for="card in cards" :sub-title="card.title" class="card" :key="card.title">-->
    <!--      {{ card.text }}-->
    <!--    </b-card>-->
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
  </b-card>
</template>

<script>
import Card from "./Card";

export default {
  name: 'Column',
  components: {
    Card,
  },
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