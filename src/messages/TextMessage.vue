<template>
  <div class="sc-message--text" :style="messageColors">
    <slot :message="message" :messageText="messageText" :messageColors="messageColors">
      <p class="sc-message--text-content" v-html="messageText"></p>
    </slot>
  </div>
</template>

<script>
import {htmlEscape} from 'escape-goat'
import Autolinker from 'autolinker'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  },
  computed: {
    messageText() {
      const escaped = htmlEscape(this.message.pack.content)

      return Autolinker.link(escaped, {
        className: 'chatLink',
        truncate: {length: 50, location: 'smart'}
      })
    }
  }
}
</script>

<style scoped lang="scss">
.sc-message--text {
  padding: 5px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  -webkit-font-smoothing: subpixel-antialiased;
  .sc-message--text-content {
    white-space: pre-wrap;
  }
  code {
    font-family: 'Courier New', Courier, monospace !important;
  }
}

.sc-message--content.sent .sc-message--text {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

a.chatLink {
  color: inherit !important;
}
</style>
