<template>
  <div class="trello">
    <Header/>
    <Board/>
  </div>
</template>

<script>
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import {mapActions} from "vuex";

export default {
  name: 'Trello',
  components: {
    Header,
    Board,
  },
  methods: {
    ...mapActions(['fetchCols', 'fetchCards'])
  },
}
</script>

<style scoped>
</style>