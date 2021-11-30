<template>
  <b-card
      class="card"
  >
    <b-form-input
        v-model="cardName"
        class="cardName"
    />
    <b-form-textarea
        class="textArea"
        placeholder="description"
        rows="3"
        max-rows="10"
        :value="description"
        v-model="description"
    >
      {{ description }}
    </b-form-textarea>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
  },
  data() {
    return {
      description: '',
      cardName: this.title,
    }
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

.cardName{
  width: 14rem;
  margin-bottom: 10px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 20px;
  border: none;
}

.textArea {
  border-radius: 20px;
  width: 15.5rem;
  font-size: 14px;
  margin-left: -16px;
  margin-bottom: -16px;
}

.card {
  border-radius: 20px;
  width: 16rem;
  margin-bottom: 5px;
  margin-left: -14px;
}
</style>