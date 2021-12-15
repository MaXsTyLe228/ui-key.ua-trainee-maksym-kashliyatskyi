<template>
  <b-card
      class="column"
      bg-variant="light"
      @dragstart="sendInfo"
      @dragend="newIdCol"
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
    <draggable
        valid-v-model="getCardsById(this.id)"
        @end="moveCard"
        class="drag"
        v-bind="dragOptions"
    >
      <Card
          @cardDrop="dropped"
          v-for="card in this.getCardsById(this.id)"
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
    index: String,
    title: String,
  },
  computed: {
    ...mapGetters(['allCards', 'newCardIndex',
      'getCardsById']),
    dragOptions() {
      return {
        animation: 0,
        group: "cards",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  async beforeMount() {
    await this.fetchCards()
  },
  data() {
    return {
      changedCard: {},
      cards: [],
      cardName: '',
      colName: this.title,
      showInput: false,
      editable: true,
    }
  },
  methods: {
    ...mapActions(['deleteCol', 'updateCol',
      'fetchCards', 'createCard', 'updateCard']),
    async update() {
      await this.updateCol({
        id: this.id,
        title: this.colName,
        index: this.index + ""
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
          index: this.newCardIndex + "",
          description: '',
          idCol: this.id,
        };
        return this.createCard(newCard)
      }
    },
    sendInfo() {
      const info = {
        id: this.id,
        title: this.colName,
        index: this.index
      }
      this.$emit('getDropped', info)
    },
    dropped(data) {
      this.$store.state.changeCard = data
      this.$store.state.oldCol = data.idCol
    },
    moveCard(data) {
      this.$store.state.newIndex = data.newIndex
      this.$store.state.oldIndex = data.oldIndex
    },
    minCardIndex(arr) {
      if (arr.length === 0)
        return 0.001
      let min = +arr[0].index;
      for (let i in arr) {
        if (+arr[i].index < min)
          min = +arr[i].index
      }
      return min;
    },
    maxCardIndex(arr) {
      if (arr.length === 0)
        return 0.001
      let max = +arr[0].index;
      for (let i in arr) {
        if (+arr[i].index > max)
          max = +arr[i].index
      }
      return max + 0.00001;
    },
    async newIdCol() {
      let replaceIndex;
      this.cards = this.getCardsById(this.id)
      this.$store.state.newCol = this.id
      this.$store.state.changeCard.idCol = this.id
      const newPlace = this.$store.state.newIndex
      const oldPlace = this.$store.state.oldIndex
      const newColId = this.$store.state.newCol
      const oldColId = this.$store.state.oldCol
      if (newPlace === oldPlace && newColId === oldColId) {
        return 0;
      } else {
        if (newPlace === oldPlace && newColId !== oldColId) {
          if (newPlace === 0) {
            replaceIndex = this.minCardIndex(this.getCardsById(this.id)) / 2
          } else if (newPlace === this.getCardsById(this.id).length) {
            replaceIndex = this.maxCardIndex(this.getCardsById(this.id))
          } else {
            replaceIndex = (+this.getCardsById(this.id)[newPlace - 1].index + +this.getCardsById(this.id)[newPlace].index) / 2
          }
        } else if (newPlace !== oldPlace && newColId === oldColId) {
          if (newPlace === 0) {
            replaceIndex = this.minCardIndex(this.getCardsById(this.id)) / 2
          } else if (newPlace === this.getCardsById(this.id).length - 1) {
            replaceIndex = this.maxCardIndex(this.getCardsById(this.id))
          } else if (newPlace < oldPlace) {
            replaceIndex = (+this.getCardsById(this.id)[newPlace - 1].index + +this.getCardsById(this.id)[newPlace].index) / 2
          } else if (newPlace > oldPlace) {
            replaceIndex = (+this.getCardsById(this.id)[newPlace + 1].index + +this.getCardsById(this.id)[newPlace].index) / 2
          }
        } else if (newPlace !== oldPlace && newColId !== oldColId) {
          if (newPlace === 0) {
            replaceIndex = this.minCardIndex(this.getCardsById(this.id)) / 2
          } else if (newPlace === this.getCardsById(this.id).length) {
            replaceIndex = this.maxCardIndex(this.getCardsById(this.id))
          } else {
            replaceIndex = (+this.getCardsById(this.id)[newPlace - 1].index + +this.getCardsById(this.id)[newPlace].index) / 2
          }
        }
        this.$store.state.changeCard.index = replaceIndex
        await this.updateCard({
          id: this.$store.state.changeCard.id,
          title: this.$store.state.changeCard.title,
          index: replaceIndex + "",
          description: this.$store.state.changeCard.description,
          idCol: this.id
        })
      }
    }
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
  margin-left: -15px;
  min-height: 50px;
  width: 17rem;
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
  width: 16rem;
  margin-bottom: 10px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 20px;
  border: none;
}

.column {
  display: flex;
  height: fit-content;
  font-size: 1rem;
  max-width: 18rem;
  max-height: 87vh;
  min-width: 18rem !important;
  overflow-y: auto;
  scroll-snap-type: x proximity;
  border-radius: 20px;
}

.ghost {
  opacity: 0;
}

.inputColumn {
  border-radius: 20px;
  height: 40px;
  margin-top: 10px;
  width: 17rem;
  margin-left: -15px;
}

.addCard {
  border-radius: 20px;
  height: 40px;
  width: 17rem;
  margin-left: -15px;
}
</style>