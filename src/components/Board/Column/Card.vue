<template>
  <b-card class="card"
          @dragstart="sendInfo"
          @dragend="dragFalse"
  >
    <div class="cardHeader">
      <b-form-input
          v-model="cardName"
          class="cardName"
          placeholder="Card"
          @blur="update"
      />
      <b-button
          variant="outline-secondary"
          class="iconButton"
          @click="del"
      >
        <b-icon-trash
            shift-h="-3"
            scale="0.8"
            class="icon"
        />
      </b-button>
    </div>
    <b-form-textarea
        class="textArea"
        placeholder="description"
        rows="3"
        max-rows="10"
        @blur="update"
        :value="description"
        v-model="description"
    >
      {{ description }}
    </b-form-textarea>
    <div v-if="fileStatus" class="fileStatus">
      <b-spinner class="spinner"/>
    </div>
    <div v-else-if="this.filename" class="buttons">
      {{ this.filename.substring(0, 22) + '..' }}
      <b-button
          variant="outline-secondary"
          class="iconButtonFooter"
      >
        <b-icon-download
            @click="getFileUrl"
            shift-h="-3"
            shift-v="-1"
            class="icon"
        />
      </b-button>
      <b-button
          variant="outline-secondary"
          class="iconButtonFooter"
      >
        <b-icon-file-earmark-x
            @click="delFile"
            shift-h="-3"
            shift-v="-1"
            class="icon"
        />
      </b-button>
    </div>
    <div v-else class="buttons">
      <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          class="file-small"
      ></b-form-file>
      <b-button v-if="this.file1" class="addFileButton" @click="putFileUrl">Add file</b-button>
    </div>
  </b-card>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Card',
  props: {
    id: Number,
    cardDescription: String,
    title: String,
    index: String,
    idCol: Number,
    file: String,
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    fileStatus() {
      const data = (this.$store.getters.getFileStatus)
      if (data.card === this.id) {
        return data.status
      }
    },
  },
  data() {
    return {
      filename: this.file,
      file1: null,
      isDrag: false,
      description: this.cardDescription,
      cardName: this.title,
    }
  },
  methods: {
    ...mapActions(['deleteCard', 'updateCard', 'getFile', 'deleteFile', 'putFile']),
    async del() {
      await this.deleteCard(this.id)
    },
    async putFileUrl() {
      if (this.file1) {
        //console.log(this.file1)
        await this.putFile({filename: this.file1.name, idCard: this.id, file: this.file1})
            .then(this.filename = this.file1.name)
      }
    },
    async getFileUrl() {
      await this.getFile(this.filename)
    },
    async delFile() {
      this.file1 = null
      let accFile = this.filename
      this.filename = false
      //console.log({filename: this.file, idCard: this.id})
      await this.deleteFile({filename: accFile, idCard: this.id})
    },
    async update() {
      if (this.$props.title !== this.cardName || this.$props.cardDescription !== this.description)
        if (!this.isDrag)
          await this.updateCard({
            id: this.id,
            title: this.cardName,
            index: this.index,
            description: this.description,
            idCol: this.idCol,
          })
    },
    dragFalse() {
      this.isDrag = false
    },
    sendInfo() {
      this.isDrag = true
      const info = {
        id: this.id,
        description: this.description,
        index: this.index,
        title: this.title,
        idCol: this.idCol,
      }
      this.$emit('cardDrop', info)
    },
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: black;
}

.addFileButton {
  margin-bottom: 10px;
  margin-top: 10px;
}

.fileStatus {
  margin-top: 20px;
  margin-bottom: -10px;
}

.cardName {
  width: 14rem;
  margin-bottom: 10px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 5px;
  border: none;
}

.iconButton {
  border: none;
  height: 35px;
  width: 35px;
  margin-top: -14px;
  margin-right: -10px;
  border-radius: 5px;
}

.file-small {
  margin-top: 20px;
  border-radius: 5px;
}

.iconButtonFooter {
  border: none;
  height: 35px;
  width: 35px;
  margin-top: 14px;
  border-radius: 5px;
}

.textArea {
  border-radius: 5px;
  width: 16.5rem;
  font-size: 14px;
  margin-left: -16px;
  margin-bottom: -16px;
}

.buttons {
  margin: -15px -15px -20px;
  border-radius: 5px
}

.cardHeader {
  width: 16rem;
  display: flex;
}

.card {
  border-radius: 5px;
  width: 17rem;
  margin-bottom: 5px;
}
</style>