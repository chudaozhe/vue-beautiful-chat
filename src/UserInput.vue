<template>
  <div>
    <!--文件预览 start-->
    <div
      v-if="file"
      class="file-container"
      :style="{
        backgroundColor: colors.userInput.text,
        color: colors.userInput.bg
      }"
    >
      <span class="icon-file-message"
        ><img :src="icons.file.img" :alt="icons.file.name" height="15"
      /></span>
      {{ file.name }}
      <span class="delete-file-message" @click="cancelFile()"
        ><img
          :src="icons.closeSvg.img"
          :alt="icons.closeSvg.name"
          height="10"
          title="Remove the file"
      /></span>
    </div>
    <!--文件预览 end-->
    <form
      class="sc-user-input"
      :class="{active: inputActive}"
      :style="{background: colors.userInput.bg, 'justify-content':'space-between'}"
    >
      <Mentionable
        :keys="['@', '#']"
        :items="mentionItems"
        offset="6"
        insert-space
        @open="onOpen"
      >
      <div
        ref="userInput"
        role="button"
        tabIndex="0"
        contentEditable="true"
        :placeholder="placeholder"
        class="sc-user-input--text"
        :style="{color: colors.userInput.text}"
        @focus="setInputActive(true)"
        @blur="setInputActive(false)"
        @keydown="handleKey"
        @focusUserInput="focusUserInput()"
      ></div>
        <template #no-result>
          <div class="dim">
            No result
          </div>
        </template>

        <template #item-@="{ item }">
          <div class="user">
            {{ item.value }}
            <span class="dim">
          ({{ item.firstName }})
        </span>
          </div>
        </template>

        <template #item-#="{ item }">
          <div class="issue">
        <span class="number">
          #{{ item.value }}
        </span>
            <span class="dim">
          {{ item.label }}
        </span>
          </div>
        </template>
      </Mentionable>
      <div class="sc-user-input--buttons">
        <div v-if="showEmoji" class="sc-user-input--button">
          <EmojiIcon :on-emoji-picked="_handleEmojiPicked" :color="colors.userInput.text" />
        </div>
        <div v-if="showFile" class="sc-user-input--button">
          <FileIcons :on-change="_handleFileSubmit" :color="colors.userInput.text" />
        </div>
        <div class="sc-user-input--button">
          <UserInputButton
            :color="colors.userInput.text"
            tooltip="Send"
            @click.native.prevent="_submitText"
          >
            <IconSend />
          </UserInputButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import EmojiIcon from './icons/EmojiIcon.vue'
import FileIcons from './icons/FileIcons.vue'
import UserInputButton from './UserInputButton.vue'
import FileIcon from './assets/file.svg'
import CloseIconSvg from './assets/close.svg'
import IconSend from './components/icons/IconSend.vue'
import { Mentionable } from 'vue-mention'
import 'floating-vue/dist/style.css'

export default {
  components: {
    EmojiIcon,
    FileIcons,
    UserInputButton,
    IconSend,
    Mentionable
  },
  props: {
    icons: {
      type: Object,
      default: function () {
        return {
          file: {
            img: FileIcon,
            name: 'default'
          },
          closeSvg: {
            img: CloseIconSvg,
            name: 'default'
          }
        }
      }
    },
    showEmoji: {
      type: Boolean,
      default: () => false
    },
    suggestions: {
      type: Array,
      default: () => []
    },
    mentionItems: {
      type: Array,
      default: () => []
    },
    showFile: {
      type: Boolean,
      default: () => false
    },
    onSubmit: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Write something...'
    },
    colors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      file: null,
      inputActive: false
    }
  },
  mounted() {
    // this.$root.$on('focusUserInput', () => {
    //   if (this.$refs.userInput) {
    //     this.focusUserInput()
    //   }
    // })
  },
  methods: {
    onOpen (key) {
      // console.log('key:', key)
      // this.items = key === '@' ? users : issues
    },
    cancelFile() {
      this.file = null
    },
    setInputActive(onoff) {
      this.inputActive = onoff
    },
    handleKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        this._submitText(event)
        event.preventDefault()
      } else if (event.keyCode === 27) {
        event.preventDefault()
      }

      this.$emit('onType')
    },
    focusUserInput() {
      this.$nextTick(() => {
        this.$refs.userInput.focus()
      })
    },
    _checkSubmitSuccess(success) {
      if (Promise !== undefined) {
        Promise.resolve(success).then(
          function (wasSuccessful) {
            if (wasSuccessful === undefined || wasSuccessful) {
              this.file = null
              this.$refs.userInput.innerHTML = ''
            }
          }.bind(this)
        )
      } else {
        this.file = null
        this.$refs.userInput.innerHTML = ''
      }
    },
    _submitText(event) {
      const text = this.$refs.userInput.textContent
      const file = this.file
      if (file) {
        this._submitTextWhenFile(event, text, file)
      } else {
        if (text && text.length > 0) {
          this._checkSubmitSuccess(
            this.onSubmit({
              type: 'text',
              pack: {content: text}
            })
          )
        }
      }
    },
    _submitTextWhenFile(event, text, file) {
      let arg = {file}
      if (text && text.length > 0) arg = {file, text}

      this._checkSubmitSuccess(
        this.onSubmit({
          type: 'file',
          data: arg
        })
      )
    },
    _handleEmojiPicked(emoji) {
      this.$refs.userInput.innerHTML += emoji
    },
    _handleFileSubmit(file) {
      this.file = file
    }
  }
}
</script>

<style>
.mentionable {
  width: 100%;
}
.mention-item {
  padding: 4px 10px;
  border-radius: 4px;
}

.mention-selected {
  background: rgb(121, 88, 209);
  color: white;
}
</style>
<style scoped>
.sc-user-input {
  min-height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  display: flex;
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.sc-user-input--text {
  flex-grow: 1;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  font-size: 15px;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}

.sc-user-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  filter: contrast(15%);
  outline: none;
  cursor: text;
}

.sc-user-input--buttons {
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.sc-user-input--button {
  margin: 0 4px;
}

.sc-user-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.file-container {
  background-color: #f4f7f9;
  border-top-left-radius: 10px;
  padding: 5px 20px;
  color: #565867;
}

.delete-file-message {
  font-style: normal;
  float: right;
  cursor: pointer;
  color: #c8cad0;
}

.delete-file-message:hover {
  color: #5d5e6d;
}

.icon-file-message {
  margin-right: 5px;
}
</style>
