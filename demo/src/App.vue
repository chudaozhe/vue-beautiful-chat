<template>
  <div :style="{background: backgroundColor}">
    <beautiful-chat
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
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
      @scrollToTop="handleScrollToTop"
    >
      <template v-slot:text-message-body="scopedProps">
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
      </template>
    </beautiful-chat>
    <p class="text-center toggle">
      <a v-if="!isChatOpen" :style="{color: linkColor}" href="#" @click.prevent="openChat()"
        >Open the chat window</a
      >
      <a v-else :style="{color: linkColor}" href="#" @click.prevent="closeChat()"
        >Close the chat window</a
      >
    </p>
    <p class="text-center colors">
      <a
        :style="{background: availableColors.blue.launcher.bg}"
        href="#"
        @click.prevent="setColor('blue')"
        >Blue</a
      >
      <a
        :style="{background: availableColors.red.launcher.bg}"
        href="#"
        @click.prevent="setColor('red')"
        >Red</a
      >
      <a
        :style="{background: availableColors.green.launcher.bg}"
        href="#"
        @click.prevent="setColor('green')"
        >Green</a
      >
      <a
        :style="{background: availableColors.dark.launcher.bg}"
        href="#"
        @click.prevent="setColor('dark')"
        >Dark</a
      >
    </p>
    <v-dialog />
    <TestArea :chosen-color="chosenColor" :colors="colors" :on-message="sendMessage" />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
import chatParticipants from './chatProfiles'
import TestArea from './TestArea.vue'
import availableColors from './colors'

export default {
  name: 'App',
  components: {
    TestArea
  },
  data() {
    return {
      participants: chatParticipants,
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: false,
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      userIsTyping: false
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
      // this.messageList = [...this.messageList, Object.assign({}, message, {id: Math.random()})]
      this.messageList = [...this.messageList, message]
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

<style>
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
}

.demo-description {
  max-width: 500px;
}

.demo-description img {
  max-width: 500px;
}

.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}

.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}

.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}

.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}
</style>
