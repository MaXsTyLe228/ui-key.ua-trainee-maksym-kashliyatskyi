<template>
  <b-card
      class="column"
      bg-variant="light"
  >
    <b-form-input
        v-model="colName"
        @input="colName = $event.target.value"
        class="cardHeader"
    />
    <Card
        v-for="card in cards"
        :title="card.title"
        :key="card.title"
    />
    <b-dropdown
        id="dropdown-offset"
        text="+ add card"
        class="menu"
    >
      <input
          :value="cardName"
          type="text"
          class="inputColumn"
          placeholder="card name"
          @input="cardName = $event.target.value"
      />
      <b-button
          variant="primary"
          @click="addCard"
          class="addCard"
      >
        Add card
      </b-button>
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
      colName: this.title,
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