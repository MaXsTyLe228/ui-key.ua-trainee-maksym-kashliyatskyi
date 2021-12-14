<template>
  <div id="trello">
    <Header/>
    <Board/>
  </div>
</template>

<script>
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";

export default {
  name: 'App',
  components: {
    Header,
    Board,
  }
}
</script>