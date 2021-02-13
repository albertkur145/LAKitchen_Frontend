<template>
  <div class="messenger">
    <div class="head">
      <div class="username">{{ contact.name }}</div>
      <font-awesome-icon @click="$emit('terminate', contact.callId)"
      icon="phone-slash" class="phone-icon"/>
    </div>

    <div class="chat-message">
      <div v-for="(message, i) in messages" :key="message.id"
      :class="`${message.from === contact.userId ? 'text-left ' : 'text-right '}
      ${messages[i+1] !== undefined ?
      `${messages[i].from === messages[i+1].from ?
      'mb-2' : 'mb-4' }` : ''}`">
        <div class="message">
          <span class="time mr-2" v-if="message.from !== contact.userId">{{ message.time }}</span>
          <span :class="`text ${message.from === contact.userId ? 'they' : 'me'}`">
            {{ message.message }}
          </span>
          <span class="time ml-2" v-if="message.from === contact.userId">{{ message.time }}</span>
        </div>
      </div>
    </div>

    <div class="type-chat">
      <b-form-textarea class="input-text" v-model="message"
      @keyup.enter="sendMessage" rows="3" placeholder="Kirim pesan disini..."/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .messenger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .head {
      display: flex;
      align-items: center;
      background-color: #FFF;
      justify-content: space-between;
      padding: 1rem 1.5rem;

      .username {
        color: #3F3F3F;
        font-weight: 500;
        font-size: 1.125em;
      }

      .phone-icon {
        cursor: pointer;
        color: #FF505A;
        font-size: 1em;
      }
    }

    .chat-message {
      height: 100%;
      overflow-y: auto;
      background-color: #EFEFEF;
      padding: 1.5rem 2.5rem;

      .message {
        display: inline-flex;
      }

      .time {
        display: flex;
        align-self: flex-end;
        margin-top: 0.25rem;
        font-size: 0.6875em;
      }

      .text {
        text-align: left;
        word-wrap: break-word;
        display: inline-block;
        border-radius: 0.5rem;
        max-width: 35rem;
        font-size: 0.9375em;
        padding: 0.75rem 1.5rem;
      }

      .me {
        color: #000;
        background-color: rgba($color: #0AEF58, $alpha: 0.3);
      }

      .they {
        color: #222;
        background-color: #FFF;
      }
    }

    .type-chat {
      padding: 1rem;
      background-color: #FFF;

      .input-text {
        color: #333;
        box-shadow: 0 0;
        transition: border .1s linear;
        border: 0.0625rem solid #BBB;
        padding: 0.625rem 0.9375rem;
        font-size: 0.9375em;

        &::placeholder {
          color: #888;
        }

        &:focus {
          border: 0.0625rem solid #777;
        }

        &:focus::placeholder {
          color: #555;
        }
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

  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {

  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {

  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  props: {
    contact: {
      type: Object,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  watch: {
    messages() {
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    },
  },

  data() {
    return {
      message: '',
    };
  },

  methods: {
    scrollToBottom() {
      const el = document.querySelector('.messenger .chat-message');
      el.scrollTop = el.scrollHeight;
    },

    sendMessage() {
      this.$emit('send', { callId: this.contact.callId, message: this.message });
      this.message = '';
    },
  },

};

</script>
