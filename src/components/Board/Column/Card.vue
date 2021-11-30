<template>
  <b-card
      :sub-title="title"
      class="card"
  >
    <b-form-textarea
        class="textArea"
        placeholder="description"
        rows="3"
        max-rows="10"
        :value="description"
        v-model="description"
        @input="description = $event.target.value"
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


.textArea {
  width: 15.5rem;
  font-size: 14px;
  margin-left: -16px;
  margin-bottom: -16px;
}

.card {
  width: 16rem;
  margin-bottom: 5px;
  margin-left: -14px;
}
</style>