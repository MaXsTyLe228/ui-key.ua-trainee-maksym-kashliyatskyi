<template>
  <div class="content"
  >
    <div class="board">
      <draggable
          style="display: flex;"
          v-bind="dragOptions"
          @end="moveCol"
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
    ...mapGetters(['allCol', 'newColIndex', 'allIndexes',
      'minColIndex']),
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
    ...mapActions(['fetchCols', 'createCol', 'updateCol']),
    async addColumn() {
      this.showInput = !this.showInput
      if (this.columnName) {
        const col = this.columnName;
        this.columnName = '';
        await this.createCol(
            {
              id: Date.now(),
              title: col,
              index: this.newColIndex + "",
            });
      }
    },
    async moveCol(data) {
      const newPlace = data.newIndex;
      const oldPlace = data.oldIndex;
      if (newPlace !== oldPlace) {
        let int;
        if (newPlace === 0) {
          int = this.minColIndex / 2
        } else if (newPlace === this.allCol.length - 1) {
          int = this.newColIndex
        } else if (newPlace < oldPlace) {
          int = (+this.allCol[newPlace - 1].index + +this.allCol[newPlace].index) / 2
        } else if (newPlace > oldPlace) {
          int = (+this.allCol[newPlace + 1].index + +this.allCol[newPlace].index) / 2
        }
        this.changedCol.index = int;
        await this.updateCol({
          id: this.changedCol.id,
          title: this.changedCol.title,
          index: this.changedCol.index + ""
        })
      }
    },
    dropped(data) {
      this.changedCol = data
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