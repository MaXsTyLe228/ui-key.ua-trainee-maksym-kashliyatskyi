<template>
  <div class="content">
    <div class="board">
      <Column
          v-for="column in columns"
          :title="column.title"
          :id="column.id"
          :key="column.id"
          @remove="removeCol"
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

export default {
  name: 'Board',
  components: {
    Column
  },
  data() {
    return {
      showInput: false,
      columns: [],
      columnName: '',
    }
  },
  methods: {
    addColumn() {
      this.showInput = !this.showInput
      if (this.columnName) {
        const col = this.columnName
        this.columnName = '';
        const newColumn = {
          id: Date.now(),
          title: col,
        };
        return this.columns.push(newColumn)
      }
    },
    removeCol(id) {
      this.columns = this.columns.filter(col => col.id !== id)
    }
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