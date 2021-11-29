<template>
  <b-card :sub-title="title" class="card">
    <b-form-textarea
        class="textArea"
        placeholder="description"
        rows="3"
        max-rows="10"
        :value="text"
        v-model="text"
        @input="text = $event.target.value"
    >
      {{ text }}
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
      text: '',
    }
  }
}
</script>

<style scoped>
.textArea {
  width: 16.5rem;
  font-size: 14px;
  margin-left: -16px;
  margin-bottom: -16px;
}

.card {
  width: 17rem;
  margin-bottom: 5px;
  margin-left: -14px;
}
</style>