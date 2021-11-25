<template>
  <div>
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

<style>

div {
  display: inline;
  margin-right: 10px;
}

.user {
  color: ghostwhite;
}
</style>