<template>
  <div :id="message.id" class="sc-message">
    <div
      class="sc-message--content"
      :class="{
        sent: message.user_id === 1,
        received: message.user_id !== 1 && message.type !== 'system',
        system: message.type === 'system'
      }"
    >
      <slot name="user-avatar" :message="message" :user="user">
        <div
          v-if="message.user_id !== 1"
          :title="authorName"
          class="sc-message--avatar"
          :style="{
            backgroundImage: `url(${chatImageUrl})`
          }"
        ></div>
      </slot>

      <TextMessage
        v-if="message.type === 'text'"
        :message="message"
        :message-colors="messageColors"
      >
        <template v-slot:default="scopedProps">
          <slot
            name="text-message-body"
            :message="scopedProps.message"
            :messageText="scopedProps.messageText"
            :messageColors="scopedProps.messageColors"
            :me="scopedProps.me"
          >
          </slot>
        </template>
      </TextMessage>
      <FileMessage
        v-else-if="message.type === 'file'"
        :data="message.data"
        :message-colors="messageColors"
      />
    </div>
  </div>
</template>

<script>
import TextMessage from './messages/TextMessage.vue'
import FileMessage from './messages/FileMessage.vue'
import chatIcon from './assets/chat-icon.svg'

export default {
  components: {
    TextMessage,
    FileMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    authorName() {
      console.log('this.user')
      console.log(this.user)
      return this.user && this.user.name
    },
    chatImageUrl() {
      return (this.user && this.user.imageUrl) || chatIcon
    },
    messageColors() {
      return this.message.user_id === 1 ? this.sentColorsStyle : this.receivedColorsStyle
    },
    receivedColorsStyle() {
      return {
        color: this.colors.receivedMessage.text,
        backgroundColor: this.colors.receivedMessage.bg
      }
    },
    sentColorsStyle() {
      return {
        color: this.colors.sentMessage.text,
        backgroundColor: this.colors.sentMessage.bg
      }
    }
  }
}
</script>

<style lang="scss">
/* TODO: re-org and scope this style block */

.sc-message {
  margin-bottom: 10px;
  display: flex;
  .sc-message--edited {
    opacity: 0.7;
    word-wrap: normal;
    font-size: xx-small;
    text-align: center;
  }
}

.sc-message--content {
  width: 100%;
  display: flex;
}

.sc-message--content.sent {
  justify-content: flex-end;
}

.sc-message--content.system {
  justify-content: center;
}

.sc-message--content.sent .sc-message--avatar {
  display: none;
}

.sc-message--avatar {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-right: 15px;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: 0px;
  color: white;
  text-align: center;
}

@media (max-width: 450px) {
  .sc-message {
    width: 80%;
  }
}
</style>
