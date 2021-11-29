<template>
  <div class="btn">
    <b-button size="3rem" class="my-2 my-sm-0" variant="dark" @click="$router.push({name: 'trello'})">Trello</b-button>
  </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>

<style scoped>
.btn {
  display: flex;
}
</style>