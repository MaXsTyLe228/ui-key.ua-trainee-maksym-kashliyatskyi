<template>
  <b-navbar toggleable="lg" variant="dark">
    <b-navbar-nav class="ml-auto">
      <User :username="username" :avatar="avatar"/>
      <b-button size="3rem" class="my-2 my-sm-0" variant="dark" @click="authorization">{{ status }}</b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import User from "./User";

export default {
  name: 'Header',
  components: {
    User
  },
  data() {
    return {
      status: 'Sign in',
      username: '',
      avatar: '',
    }
  },
  methods: {
    authorization() {
      return this.status === 'Sign in' ?
          (this.status = 'Log out',
              this.avatar = 'https://placekitten.com/300/300',
              this.username = 'Maks')
          : (this.status = 'Sign in',
              this.avatar = '',
              this.username = '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
