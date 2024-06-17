<script>
import messageHistory from './messageHistory'
import chatParticipants from './chatProfiles'
import availableColors from './colors'
export default {
  name: 'App',
  data() {
    return {
      user_id: 1,
      room_id: 1,
      title: '标题11',
      participants: chatParticipants,
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: false,
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      userIsTyping: false,
      items: [
        {
          value: 'kimi',
          firstName: 'kimi2',
        },
        {
          value: 'kimi2',
          firstName: 'kimi22',
        },
        {
          value: 'kimi3',
          firstName: 'kimi23',
        }
      ],
    }
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark' ? this.colors.sentMessage.text : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    }
  },
  created() {
    this.setColor('blue')
  },
  mounted() {
    this.messageList.forEach((x) => (x.liked = false))
  },
  methods: {
    handleOnType() {
      console.log('Emit typing event')
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({
          user_id: 1,
          type: 'text',
          id: Math.random(100, 200) * 100 + 100,
          pack: {content: text}
        })
      }
    },
    onMessageWasSent(message) {
      this.messageList = [
        ...this.messageList,
        Object.assign({}, message, {id: Math.random(), user_id: this.user_id})
      ]
    },
    openChat() {
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat() {
      this.isChatOpen = false
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
      console.log('加载上一页..')
    },
    setColor(color) {
      this.colors = this.availableColors[color]
      this.chosenColor = color
    }
  }
}

</script>

<template>
  <main>
    <beautiful-chat
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :mention-items="items"
      :is-open="isChatOpen"
      :message-list="messageList"
      :new-messages-count="newMessagesCount"
      :on-message-was-sent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :show-close-button="true"
      :show-launcher="true"
      :show-emoji="true"
      :show-file="true"
      :title="title"
      :current-user-id="user_id"
      @onType="handleOnType"
      @scrollToTop="handleScrollToTop"
    >
      <template v-slot:text-message-body="scopedProps">
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
      </template>
    </beautiful-chat>
  </main>
</template>

<style scoped>

</style>
