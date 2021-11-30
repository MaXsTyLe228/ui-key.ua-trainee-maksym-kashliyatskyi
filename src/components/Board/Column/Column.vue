<template>
  <b-card
      class="column"
      bg-variant="light"
  >
    <b-form-input
        v-model="colName"
        class="cardHeader"
    />
    <Card
        v-for="card in cards"
        :title="card.title"
        :key="card.title"
    />
    <b-button
        variant="light"
        class="addCard"
        @click="addCard"
    >
      + Add Card
    </b-button>
    <b-form-input
        v-if="showInput"
        v-model="cardName"
        class="inputColumn"
        placeholder="Enter title for new Card"
    />
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
      colName: this.title,
      showInput: false,
    }
  },
  methods: {
    addCard() {
      this.showInput = !this.showInput
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
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: black;
}

.cardHeader {
  width: 16rem;
  margin-bottom: 10px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 20px;
  border: none;
}

.column {
  height: fit-content;
  font-size: 1rem;
  max-width: 18rem;
  max-height: 87vh;
  min-width: 18rem !important;
  overflow-y: auto;
  scroll-snap-type: x proximity;
  border-radius: 20px;
}


.inputColumn {
  border-radius: 20px;
  height: 40px;
  margin-top: 10px;
  width: 16rem;
  margin-left: -15px;
}

.addCard {
  border-radius: 20px;
  height: 40px;
  width: 16rem;
  margin-left: -15px;
}
</style>