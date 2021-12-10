<template>
  <b-card
      class="card"
  >
    <div class="cardHeader">
      <b-form-input
          v-model="cardName"
          class="cardName"
          placeholder="Card"
          @blur="update"
      />
      <b-button
          variant="outline-secondary"
          class="iconButton"
          @click="del"
      >
        <b-icon-trash
            shift-h="-3"
            scale="0.8"
            class="icon"
        />
      </b-button>

    </div>
    <b-form-textarea
        class="textArea"
        placeholder="description"
        rows="3"
        max-rows="10"
        @blur="update"
        :value="description"
        v-model="description"
    >
      {{ description }}
    </b-form-textarea>
  </b-card>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Card',
  props: {
    id: Number,
    title: String,
    index: Number,
    idCol: Number,
  },
  data() {
    return {
      description: '',
      cardName: this.title,
    }
  },
  methods: {
    ...mapActions(['deleteCard', 'updateCard']),
    async del() {
      await this.deleteCard(this.id)
    },
    async update() {
      await this.updateCard({
        id: this.id,
        title: this.cardName,
        index: this.index,
        description: this.description,
        idCol: this.idCol,
      })
    },
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: black;
}

.cardName {
  width: 14rem;
  margin-bottom: 10px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 20px;
  border: none;
}

.iconButton {
  border: none;
  height: 35px;
  width: 35px;
  margin-top: -14px;
  margin-right: -10px;
  border-radius: 20px;
}

.textArea {
  border-radius: 20px;
  width: 15.5rem;
  font-size: 14px;
  margin-left: -16px;
  margin-bottom: -16px;
}

.cardHeader {
  width: 14rem;
  display: flex;
}

.card {
  border-radius: 20px;
  width: 16rem;
  margin-bottom: 5px;
  margin-left: -14px;
}
</style>