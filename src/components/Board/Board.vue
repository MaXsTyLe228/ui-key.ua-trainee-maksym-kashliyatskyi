<template>
  <div class="content"
  >
    <div class="board">
      <draggable
          style="display: flex;"
          v-bind="dragOptions"
          @end="array_move"
      >
        <Column
            @getDropped="dropped"
            v-for="column in this.allCol"
            :title="column.title"
            :index="column.index"
            :id="column.id"
            :key="column.index"
        />
      </draggable>
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
import draggable from "vuedraggable";

export default {
  name: 'Board',
  components: {Column, draggable},
  computed: {
    ...mapGetters(["allCol", 'newColIndex', 'allIndexes']),
    dragOptions() {
      return {
        animation: 0,
        group: "columns",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  async beforeMount() {
    await this.fetchCols()
  },
  data() {
    return {
      changedCol: {},
      cols: [],
      showInput: false,
      columnName: '',
      editable: true,
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
    array_move(data) {
      if (data.newIndex >= this.cols.length) {
        let k = data.newIndex - this.cols.length + 1;
        while (k--) {
          this.cols.push(undefined);
        }
      }
      this.cols.splice(data.newIndex, 0,
          this.cols.splice(data.oldIndex, 1)[0]);
      console.log(this.cols); // for testing
    },
    update(data) {
      console.log(data)
    },
    dropped(data) {
      //this.cols = this.allIndexes.slice()
      //console.log(this.cols)
      //
      this.cols = this.allCol
      this.changedCol = data
      //console.log(this.changedCol, this.cols)
    },
  }
}
</script>

<style scoped>
div {
  margin-right: 10px;
}

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

.ghost {
  opacity: 0;
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