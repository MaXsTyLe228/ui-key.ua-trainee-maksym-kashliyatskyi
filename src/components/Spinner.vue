<template>
  <div class="spinnerContainer">
    <b-spinner class="spinner"/>
  </div>
</template>


<script>
export default {
  name: 'Spinner',
}
</script>

<style scoped>
.spinnerContainer {
  height: 50rem;
  display: flex;
}

.spinner {
  margin: auto;
  width: 100px;
  height: 100px;
}
</style>