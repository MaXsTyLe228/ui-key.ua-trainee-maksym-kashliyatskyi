<template>
  <div class="content">
    <div class="board">
      <Column
          v-for="column in this.allCol"
          :title="column.title"
          :index="column.index"
          :id="column.id"
          :key="column.index"
      />
      <div class="addColContainer">
        <b-button
            v-if="!showInput"
            variant="light"
            class="addColumn"
            @click="addColumn"
        >
          + Add Column
        </b-button>
        <b-button
            v-if="showInput"
            variant="primary"
            class="addColumn"
            @click="addColumn"
        >
          + Add Column
        </b-button>
        <b-form-input
            v-if="showInput"
            v-model="columnName"
            class="inputColumn"
            placeholder="Enter title for new Column"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Column from "./Column/Column";
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Board',
  components: {Column},
  computed: {
    ...mapGetters(["allCol",
      'colsLength', 'newColIndex'])
  },
  async beforeMount() {
    await this.fetchCols()
  },
  data() {
    return {
      showInput: false,
      columnName: '',
    }
  },
  methods: {
    ...mapActions(['fetchCols', 'createCol']),
    async addColumn() {
      this.showInput = !this.showInput
      if (this.columnName) {
        const col = this.columnName;
        this.columnName = '';
        await this.createCol(
            {
              id: Date.now(),
              title: col,
              index: this.newColIndex,
            });
      }
    },
  }
}
</script>

<style scoped>
.board {
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  min-height: 50vh;
  flex-direction: row;
  overflow: auto;
}

.addColContainer {
  height: fit-content;
  background: ghostwhite;
  border-radius: 20px;
}

.inputColumn {
  height: 40px;
  width: 16rem;
  margin: 10px;
  border-radius: 20px;
}

.addColumn {
  height: 40px;
  width: 16rem;
  margin: 10px;
  border-radius: 20px;
}
</style>