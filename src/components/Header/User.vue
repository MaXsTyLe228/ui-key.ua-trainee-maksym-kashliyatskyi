<template>
  <div class="user">
    <div class="user">{{ username }}</div>
    <b-avatar :src="avatar" size="3rem"></b-avatar>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    avatar: String,
    username: String
  }
}
</script>

<style scoped>

.user {
  margin-right: 10px;
  display: inline;
  color: ghostwhite;
}
</style>