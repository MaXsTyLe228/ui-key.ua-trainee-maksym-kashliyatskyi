<template>
  <div class="authorization">
    <div v-if="loadingStatus">
      <Spinner/>
    </div>
    <div v-else class="login-page">
      <div class="form">
        <div class="text">Sign In</div>
        <div class="login-form">
          <input type="email" placeholder="email" v-model="email"/>
          <input type="password" placeholder="password" v-model="password"/>
          <button @click="isAuth">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Spinner from "../components/Spinner";

export default {
  name: 'Auth',
  components: {Spinner},
  data() {
    return {
      email: "",
      password: "",
      info: this.getUserInfo
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    loadingStatus() {
      return this.$store.getters.loadingStatus
    }
  },
  methods: {
    ...mapActions(['signIn']),
    async isAuth() {
      await this.signIn({email: this.email, password: this.password})
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 30px;
  margin: 15px;
}

.login-page {
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
  outline: 0;
  background: ghostwhite;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 50px;
}

.form button {
  text-transform: uppercase;
  outline: 0;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(90, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50px;
}

.form button:hover, .form button:active, .form button:focus {
  background: rgb(31, 5, 179);
  background: linear-gradient(90deg, rgba(31, 5, 179, 1) 0%, rgba(182, 15, 218, 1) 51%, rgba(0, 164, 255, 1) 100%);
}
</style>
