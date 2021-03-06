<template>
  <div id="chat-app">
    <transition name="bounceup">
      <div v-if="!isShow" @click="toggleChatContainer(true)"
      class="chat-btn fixed-position">
        <font-awesome-icon icon="comment-dots" class="chat-icon"/>
        <span class="text">
          Chat
          <span v-if="unreadMessages">
            <font-awesome-icon icon="exclamation" class="unread-icon"/>
          </span>
        </span>
      </div>
    </transition>

    <transition name="bounceup">
      <div v-if="isShow" class="chat-container fixed-position">
        <div class="top padding-chat">
          <div class="title">Customer Service</div>
          <font-awesome-icon @click="toggleChatContainer(false)"
          icon="chevron-down" class="chev-icon"/>
        </div>

        <div class="content padding-chat">
          <div class="start-conversation" v-if="!isStart && !onProgress">
            <div class="text" @click="startConversation">Mulai Percakapan</div>
          </div>

          <div class="waiting" v-if="onProgress">
            <div class="text">{{ callMessage }}</div>
          </div>

          <div class="message-container" v-if="isStart && !onProgress">
            <div v-for="(val, i) in messages" :key="i"
            :class="`message${ val.from === user.id ? ' user-message' : ''}
            ${ messages[i+1] != undefined ?
            `${ val.from === messages[i+1].from
            ? ' user-margin' : ''}` : ''}`">
              <span class="text">
                {{ val.message }}
                <div class="time text-right">{{ val.time }}</div>
              </span>
            </div>
          </div>
        </div>

        <div class="blank-space"></div>

        <div class="bottom" v-if="isStart && !onProgress">
          <b-form-textarea v-model="message" class="input-text" @keyup.enter="sendMessage"
          placeholder="Tulis pesan..." rows="2" max-rows="6"/>

          <font-awesome-icon @click="sendMessage"
          class="paper-icon" icon="paper-plane"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .bounceup-enter-active {
    animation: bounce-in .3s ease-out;
  }

  .bounceup-leave-active {
    animation: bounce-in .3s ease-out reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: translateY(1.25rem);
      opacity: 0;
    }
    100% {
      transform: translateY(-1.25rem);
      opacity: 1;
    }
  }

  .fixed-position {
    bottom: 0;
    right: 1.25rem;
    position: fixed;
  }

  .chat-btn {
    z-index: 900;
    display: flex;
    cursor: pointer;
    color: #FF7A00;
    font-weight: 700;
    align-items: center;
    transform: translateY(-1.25rem);
    border-radius: 100rem;
    background-color: #FFF;
    box-shadow: 0 0 0.125rem 0.125rem rgba($color: #000000, $alpha: 0.2);
    padding: 0.5rem 1rem;

    .chat-icon {
      font-size: 1.1875em;
    }

    .text {
      position: relative;
      margin-left: 0.5rem;
      font-size: 0.9375em;

      .unread-icon {
        top: -0.0625rem;
        right: -0.375rem;
        color: #FF3D48;
        position: absolute;
        font-size: 0.75em;
      }
    }
  }

  .padding-chat {
    padding: 0.5rem 0.875rem;
  }

  .chat-container {
    z-index: 999;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    border-radius: 0.5rem 0.5rem 0 0;
    border: 0.0625rem solid #BFBFBF;
    transform: translateY(-1.25rem);
    box-shadow: 0 0 0.125rem 0.125rem rgba($color: #000000, $alpha: 0.1);
    width: 89%;
    min-height: 80%;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.0625rem solid #DFDFDF;

      .title {
        color: #3F3F3F;
        font-weight: 500;
        font-size: 0.9375em;
      }

      .chev-icon {
        color: #666;
        cursor: pointer;
        font-size: 1em;
      }
    }

    .content {
      overflow-y: auto;
      max-height: 65vh;

      .start-conversation {
        text-align: center;

        .text {
          display: inline-block;
          color: #FFF;
          cursor: pointer;
          margin-top: 25vh;
          font-weight: 500;
          border-radius: 100rem;
          background-color: #FF6B00;
          transition: background-color .2s ease-out;
          font-size: 0.8125em;
          padding: 0.75rem 1.5rem;

          &:hover {
            background-color: #FF5C00;
          }
        }
      }

      .waiting {
        text-align: center;

        .text {
          display: inline-block;
          margin-top: 25vh;
          font-size: 0.8125em;
        }
      }

      .message-container {

        .message {
          text-align: left;
          margin-bottom: 0.875rem;

          .text {
            color: #000;
            text-align: left;
            max-width: 16rem;
            word-break: break-all;
            display: inline-block;
            border-radius: 0.5rem;
            background-color: #F0F0F0;
            padding: 0.5rem 0.75rem;
            font-size: 0.8125em;
          }

          .time {
            display: block;
            margin-top: 0.25rem;
            font-size: 0.75em;
          }
        }

        .user-message {
          text-align: right;

          .text {
            color: #FFF;
            background-color: #FF7A00;
          }
        }

        .user-margin {
          margin-bottom: 0.25rem;
        }
      }
    }

    .blank-space {
      min-height: 3rem;
    }

    .bottom {
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      position: fixed;
      min-height: 3rem;
      align-items: center;
      background-color: #FFF;
      justify-content: space-between;
      border-top: 0.0625rem solid #DFDFDF;

      .input-text {
        border: 0;
        color: #333;
        box-shadow: 0 0;
        padding: 0.5rem 0.75rem;
        font-size: 0.8125em;

        &::placeholder {
          color: #888;
        }

        &::-webkit-scrollbar {
          display: none;
        }
      }

      .paper-icon {
        cursor: pointer;
        color: #FF7A00;
        margin-right: 1.125rem;
        font-size: 0.9375em;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .chat-btn {
      padding: 0.5rem 1rem;

      .chat-icon {
        font-size: 1.25em;
      }

      .text {
        font-size: 1em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads, Laptops, Desktop
  @media (min-width: 768px) {
    .chat-btn {
      padding: 0.625rem 1.5rem;

      .chat-icon {
        font-size: 1.5em;
      }

      .text {
        font-size: 1.125em;

        .unread-icon {
          top: -0.125rem;
          right: -0.5875rem;
          font-size: 0.8125em;
        }
      }
    }

    .padding-chat {
      padding: 0.875rem 1.25rem;
    }

    .chat-container {
      width: 23rem;
      min-height: 77vh;

      .top {

        .title {
          font-size: 1em;
        }

        .chev-icon {
          font-size: 1.125em;
        }
      }

      .content {
        max-height: 60vh;

        .start-conversation {

          .text {
            font-size: 0.875em;
            padding: 0.875rem 2rem;
          }
        }

        .waiting {

          .text {
            font-size: 0.875em;
          }
        }

        .message-container {

          .message {
            margin-bottom: 1rem;

            .text {
              padding: 0.75rem 1rem;
              font-size: 0.875em;
            }

            .time {
              font-size: 0.8125em;
            }
          }

          .user-margin {
            margin-bottom: 0.25rem;
          }
        }
      }

      .bottom {

        .input-text {
          padding: 0.875rem 1rem;
          font-size: 0.9375em;
        }

        .paper-icon {
          font-size: 1.125em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads, Laptops, Desktop

</style>

<script>

import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import api from '@/config/api';
import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      socket: null,
      stompClient: null,
      stomp: {
        call: null,
        chat: null,
      },

      isShow: false,
      isStart: false,
      onProgress: false,

      user: null,
      message: '',
      callId: null,
      callMessage: 'Menyambungkan...',

      messages: [],
      unreadMessages: false,

      /* eslint-disable global-require */
      incMsgRingtone: require('@/assets/audio/incoming-message.mp3'),
      /* eslint-disable global-require */
    };
  },

  computed: {
    ...mapGetters('chat', [
      'userCurrentCall',
      'messageList',
    ]),

    currentCallId() {
      return this.callId;
    },

    isStarted() {
      return this.isStart;
    },

    countUnreadMessages() {
      return this.messages.filter((val) => val.isRead === 0 && val.from !== this.user.id).length;
    },

    currentCSId() {
      if (this.messages.length) {
        return this.messages.find((val) => val.from !== this.user.id).from;
      }
      return null;
    },
  },

  methods: {
    ...mapActions('chat', [
      'calling',
      'postMessage',
      'getCurrentCall',
      'getMessages',
      'readMessage',
    ]),

    async readUnreadMessage() {
      await this.$func.promiseAPI(this.readMessage, {
        callId: this.currentCallId,
        userFrom: this.currentCSId,
      });
      this.unreadMessages = false;
    },

    async getCurrentMessages() {
      this.connectToChatMessage();
      const { code } = await this.$func.promiseAPI(this.getMessages, {
        callId: this.currentCallId,
      });

      if (code === 200) {
        this.messages = [...this.messageList.messages];
        if (this.countUnreadMessages && !this.isShow) {
          this.unreadMessages = true;
        }
      }
    },

    async getCall() {
      const { code } = await this.$func.promiseAPI(this.getCurrentCall, {
        callId: this.currentCallId,
      });

      if (code === 200) {
        if (this.userCurrentCall.isReceived) {
          this.handleExistCall();
        } else {
          this.callMessage = 'Menunggu customer service...';
          this.connectToCallAccepted();
        }
      } else {
        this.handleUnexistCall();
      }
    },

    async sendMessage() {
      if (this.message !== '\n') {
        const text = this.message;
        this.reset();
        await this.$func.promiseAPI(this.postMessage, {
          callId: this.currentCallId,
          from: this.user.id,
          message: text,
        });
      } else {
        this.reset();
      }
    },

    async callCS() {
      const { code, data } = await this.$func.promiseAPI(this.calling, {
        userId: this.user.id,
      });

      if (code === 200) {
        this.callId = data.id;
        this.connection();
        this.connectToCallAccepted();
        localStorage.setItem('callId', this.currentCallId);
      } else {
        this.onProgress = false;
        this.callMessage = 'Error, silahkan coba kembali';
      }
    },

    reset() {
      this.message = '';
    },

    connection() {
      this.socket = new SockJS(api.sockURL);
      this.stompClient = Stomp.over(this.socket);
    },

    connectToCallAccepted() {
      this.stompClient.connect({}, () => {
        this.subscribeCallAccepted();
      }, (err) => {
        console.log(`Error: ${err.reason}`);
      });
    },

    connectToChatMessage() {
      this.stompClient.connect({}, () => {
        this.subscribeChatMessage();
        this.subscribeCallTerminated();
      }, (err) => {
        console.log(`Error: ${err.reason}`);
      });
    },

    subscribeChatMessage() {
      this.onProgress = true;
      this.isStart = false;
      const subsCh = this.stompClient.subscribe(`/message/${this.currentCallId}`, (res) => {
        const data = JSON.parse(res.body);
        this.pushMessage(data);

        if (data.from !== this.user.id) {
          this.playAudio();
        }

        if (this.isShow && data.from !== this.user.id) {
          this.readUnreadMessage();
        }

        if (!this.isShow && data.from !== this.user.id) {
          this.unreadMessages = true;
        }
      });

      if (subsCh) {
        this.onProgress = false;
        this.isStart = true;

        if (this.isShow) {
          this.readUnreadMessage();
        }
      }
    },

    playAudio() {
      const sound = new Audio(this.incMsgRingtone);
      sound.play();
    },

    subscribeCallTerminated() {
      this.stompClient.subscribe(`/call/ended/${this.currentCallId}`, () => {
        this.onProgress = true;
        this.callMessage = 'Panggilan telah berakhir';
        setTimeout(() => {
          this.handleUnexistCall();
        }, 3000);
      });
    },

    subscribeCallAccepted() {
      this.stompClient.subscribe(`/call/accepted/${this.currentCallId}`, (res) => {
        this.onProgress = false;
        this.callId = JSON.parse(res.body).contact.callId;
        localStorage.setItem('callId', this.currentCallId);

        // after call accepted, then subs chat message & terminated call
        this.subscribeChatMessage();
        this.subscribeCallTerminated();
        setTimeout(() => {
          this.isCallReceived();
        }, 1000);
      });
    },

    toggleChatContainer(bool) {
      this.isShow = bool;
      if (this.isShow) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);

        if (this.isStart && !this.onProgress && this.unreadMessages) {
          this.readUnreadMessage();
        }
      }
    },

    isCallReceived() {
      this.onProgress = false;
      this.isStart = true;
    },

    startConversation() {
      this.callCS();
      this.onProgress = true;
      this.callMessage = 'Menunggu customer service...';
    },

    scrollToBottom() {
      const el = document.querySelector('#chat-app .content');
      el.scrollTop = el.scrollHeight;
    },

    handleExistCall() {
      this.getCurrentMessages();
    },

    handleUnexistCall() {
      localStorage.removeItem('callId');
      this.onProgress = false;
      this.isStart = false;
      this.callId = null;
      this.unreadMessages = false;
      this.messages = [];
    },

    pushMessage(data) {
      this.messages.push({
        id: data.id,
        from: data.from,
        to: data.to,
        callId: data.callId,
        message: data.message,
        isRead: data.isRead,
        time: data.time,
      });

      if (this.isShow) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      }
    },
  },

  created() {
    this.user = this.$cookies.get('user');

    if (localStorage.getItem('callId')) {
      this.onProgress = true;
      this.callId = localStorage.getItem('callId');
      this.connection();
      this.getCall();
    }
  },

};

</script>
