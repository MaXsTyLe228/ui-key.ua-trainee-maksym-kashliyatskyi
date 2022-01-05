<template>
  <b-card class="card"
          @dragstart="sendInfo"
          @dragend="dragFalse"
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
    <div v-if="this.file" class="buttons">
      {{ this.fileName.substring(0, 22) + '..' }}
      <b-button
          variant="outline-secondary"
          class="iconButtonFooter"
      >
        <b-icon-download
            shift-h="-3"
            shift-v="-1"
            class="icon"
        />
      </b-button>
      <b-button
          variant="outline-secondary"
          class="iconButtonFooter"
      >
        <b-icon-file-earmark-x
            shift-h="-3"
            shift-v="-1"
            class="icon"
        />
      </b-button>
    </div>
    <div v-else class="buttons">
      <b-button
          variant="outline-secondary"
          class="iconButtonFooter"
      >
        <b-icon-plus-circle
            shift-h="-3"
            shift-v="-1"
            class="icon"
        />
      </b-button>
    </div>
  </b-card>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Card',
  props: {
    id: Number,
    cardDescription: String,
    title: String,
    index: String,
    idCol: Number,
  },
  data() {
    return {
      file: true,
      fileName: 'file2',
      isDrag: false,
      description: this.cardDescription,
      cardName: this.title,
    }
  },
  methods: {
    ...mapActions(['deleteCard', 'updateCard']),
    async del() {
      await this.deleteCard(this.id)
    },
    async update() {
      if (this.$props.title !== this.cardName || this.$props.cardDescription !== this.description)
        if (!this.isDrag)
          await this.updateCard({
            id: this.id,
            title: this.cardName,
            index: this.index,
            description: this.description,
            idCol: this.idCol,
          })
    },
    dragFalse() {
      this.isDrag = false
    },
    sendInfo() {
      this.isDrag = true
      const info = {
        id: this.id,
        description: this.description,
        index: this.index,
        title: this.title,
        idCol: this.idCol,
      }
      this.$emit('cardDrop', info)
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

.iconButtonFooter {
  border: none;
  height: 35px;
  width: 35px;
  margin-top: 14px;
  border-radius: 20px;
}

.textArea {
  border-radius: 20px;
  width: 16.5rem;
  font-size: 14px;
  margin-left: -16px;
  margin-bottom: -16px;
}

.buttons {
  margin: -15px;
}

.cardHeader {
  width: 16rem;
  display: flex;
}

.card {
  border-radius: 20px;
  width: 17rem;
  margin-bottom: 5px;
}
</style>