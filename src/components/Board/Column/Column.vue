<template>
  <b-card
      class="column"
      bg-variant="light"
  >
    <div class="cardHeader">
      <b-form-input
          v-model="colName"
          @blur="update"
          placeholder="Column"
          class="colName"
      />
      <b-button
          variant="outline-secondary"
          class="iconButton"
          @click="del"
      >
        <b-icon-trash/>
      </b-button>
    </div>
    <draggable class="drag" group="tasks">
      <Card
          v-for="card in this.getCardsById(this.id)
          .sort((a, b) => {
              if (a.index > b.index)
                  return 1;
              if (a.index < b.index)
                  return -1;
              // a должно быть равным b
              return 0;
          })"
          :title="card.title"
          :id="card.id"
          :key="card.id"
          :cardDescription="card.description"
          :index="card.index"
          :idCol="card.idCol"
      />
    </draggable>
    <b-button
        v-if="!showInput"
        variant="light"
        class="addCard"
        @click="addCard"
    >
      + Add Card
    </b-button>
    <b-button
        v-if="showInput"
        variant="primary"
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
import {mapActions, mapGetters} from 'vuex';
import draggable from "vuedraggable";

export default {
  name: 'Column',
  components: {Card, draggable},
  props: {
    id: Number,
    index: Number,
    title: String,
  },
  computed: {
    ...mapGetters(['allCards', 'newCardIndex', 'getCardsById'])
  },
  async beforeMount() {
    await this.fetchCards()
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
    ...mapActions(['deleteCol', 'updateCol',
      'fetchCards', 'createCard']),
    async update() {
      await this.updateCol({
        id: this.id,
        title: this.colName,
        index: this.index
      })
    },
    async del() {
      await this.deleteCol(this.id)
    },
    addCard() {
      this.showInput = !this.showInput
      if (this.cardName) {
        const card = this.cardName
        this.cardName = '';
        const newCard = {
          id: Date.now(),
          title: card,
          index: this.newCardIndex,
          description: '',
          idCol: this.id,
        };
        return this.createCard(newCard)
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

.drag {
  min-height: 300px;
  min-width: 16rem;
}

.cardHeader {
  width: 16rem;
  display: flex;
}

.iconButton {
  border: none;
  height: 42px;
  width: 42px;
  margin-top: -14px;
  margin-right: -10px;
  border-radius: 20px;
}

.colName {
  width: 15rem;
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