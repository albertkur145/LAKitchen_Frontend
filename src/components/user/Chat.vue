<template>
  <div id="chat-app">
    <transition name="bounceup">
      <div v-if="!isShow" @click="toggleChatContainer(true)"
      class="chat-btn fixed-position">
        <font-awesome-icon icon="comment-dots" class="chat-icon"/>
        <span class="text">Chat</span>
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
          <div class="start-conversation" v-if="!isStart">
            <div class="text" @click="startConversation">Mulai Percakapan</div>
          </div>

          <div class="message-container" v-else>
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

        <div class="bottom" v-if="isStart">
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
      margin-left: 0.5rem;
      font-size: 0.9375em;
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

      .message-container {

        .message {
          text-align: left;
          margin-bottom: 0.875rem;

          .text {
            color: #000;
            text-align: left;
            max-width: 16rem;
            word-wrap: break-word;
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

export default {

  data() {
    return {
      isShow: false,
      isStart: false,
      user: null,
      message: '',

      messages: [
        {
          id: 1,
          from: 2,
          to: 1,
          callId: 1,
          message: 'Halo, perkenalkan saya Indah. Dengan siapakah Indah berbicara?',
          isRead: 0,
          time: '10.32',
        },
        {
          id: 2,
          from: 1,
          to: 2,
          callId: 1,
          message: 'Albert',
          isRead: 0,
          time: '10.33',
        },
        {
          id: 3,
          from: 2,
          to: 1,
          callId: 1,
          message: 'Apakah ada yang bisa Indah bantu untuk Kak Albert?',
          isRead: 0,
          time: '10.33',
        },
        {
          id: 4,
          from: 1,
          to: 2,
          callId: 1,
          message: 'Ini saya beli produk tapi lama sekali sampainya',
          isRead: 0,
          time: '10.35',
        },
        {
          id: 5,
          from: 1,
          to: 2,
          callId: 1,
          message: 'Padahal ini sudah 3 minggu loh',
          isRead: 0,
          time: '10.35',
        },
        {
          id: 6,
          from: 2,
          to: 1,
          callId: 1,
          message: 'Baik, akan Indah bantu pengecekan nomor pesanan',
          isRead: 0,
          time: '10.36',
        },
        {
          id: 7,
          from: 2,
          to: 1,
          callId: 1,
          message: 'Boleh dikirim disini nomor pesanannya Kak Albert',
          isRead: 0,
          time: '10.37',
        },
      ],
    };
  },

  methods: {
    toggleChatContainer(bool) {
      this.isShow = bool;
    },

    startConversation() {
      this.isStart = true;
      localStorage.setItem('isStartConversation', true);
    },

    async sendMessage() {
      const params = {
        id: 8,
        from: 1,
        to: 2,
        callId: 1,
        message: this.message,
        isRead: 0,
        time: '10.39',
      };

      this.message = '';
      await this.messages.push(params);

      this.scrollToBottom();
    },

    scrollToBottom() {
      const el = document.querySelector('#chat-app .content');
      el.scrollTop = el.scrollHeight;
    },
  },

  created() {
    this.user = this.$cookies.get('user');

    if (localStorage.getItem('isStartConversation')) {
      this.isStart = true;
    }
  },

};

</script>
