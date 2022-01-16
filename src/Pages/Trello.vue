<template>
  <div class="trello">
    <Header/>
    <Board/>
  </div>
</template>

<script>
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";

export default {
  name: 'Trello',
  components: {
    Header,
    Board,
  },
}
</script>