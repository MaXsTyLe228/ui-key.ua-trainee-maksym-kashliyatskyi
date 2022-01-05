<template>
  <b-navbar class="header" toggleable="lg" variant="dark">
    <b-navbar-nav class="ml-auto">
      <User :username="username" :avatar="avatar"/>
      <b-button class="my-2 my-sm-0" variant="dark" @click="authorization">{{ status }}</b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import User from "./User";
import router from "../../../src/router/routes"

export default {
  name: 'Header',
  components: {
    User
  },
  data() {
    return {
      status: 'Logout',
      username: 'Maks',
      avatar: 'https://placekitten.com/300/300',
    }
  },
  methods: {
    authorization() {
      return localStorage.idToken ?
          (
              this.status = 'Logout',
                  this.avatar = 'https://placekitten.com/300/300',
                  this.username = 'Maks',
                  this.$store.state.login = !this.$store.state.login,
                  localStorage.removeItem('idToken'),
                  this.$store.state.columns = [],
                  this.$store.state.cards = [],
                  router.push('/sign-in')
          ) : 0
    }
  }
}
</script>

<style scoped>
</style>
