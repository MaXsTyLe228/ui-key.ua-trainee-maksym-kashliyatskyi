<template>
  <div class="content">
    <div class="board">
      <Column v-for="column in columns" :title="column.title" :key="column.title"/>
      <b-dropdown id="dropdown-form" text="+ add column" class="menu">
        <input
            :value="columnName"
            type="text"
            class="inputColumn"
            placeholder="column name"
            @input="columnName = $event.target.value"
        />
        <b-button variant="primary" @click="addColumn" class="addColumn">Add column</b-button>
      </b-dropdown>
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
      columns: [],
      columnName: '',
    }
  },
  methods: {
    addColumn() {
      if (this.columnName) {
        const col = this.columnName
        this.columnName = '';
        const newColumn = {
          title: col,
        };
        return this.columns.push(newColumn)
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
  max-height: 88vh;
  min-height: 50vh;
  flex-direction: row;
  overflow: auto;
}

.menu {
  height: 40px;
  max-width: 18rem;
  min-width: 18rem !important;
}

.inputColumn {
  height: 40px;
  width: 16rem;
  margin: 10px;
}

.addColumn {
  height: 40px;
  width: 16rem;
  margin: 10px;
}
</style>