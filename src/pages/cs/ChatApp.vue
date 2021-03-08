<template>
  <div id="app" v-if="isLogin">
    <Header/>

    <div class="body">
      <div class="contact">
        <Contact v-for="val in csContact" :key="val.callId"
        :data="val" @selected="setSelectedContact"
        :class="`${ val === selectedContact ? 'active-contact' : ''}`"/>
      </div>

      <Messenger v-if="selectedContact" :contact="selectedContact"
      :messages="messages" :user="user" @send="sendMessage" @terminate="terminate"/>
    </div>

    <div class="call">
      <Call v-for="val in usersCall" :key="val.id"
      :data="val" @receivecall="receive"/>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {

    .body {
      display: flex;
      min-height: 90vh;
      max-height: 90vh;

      .contact {
        overflow-y: auto;
        background-color: #EAF7FF;
        min-width: 18rem;

        .active-contact {
          background-color: #D1EEFF;
        }
      }

      .messenger {
        width: 100%;
      }
    }

    .call {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0.75rem;
      right: 5rem;
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
    #app {

      .body {
        .contact {
          min-width: 20rem;
        }

        .messenger {
          width: 100%;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .body {
        .contact {
          min-width: 23rem;
        }

        .messenger {
          width: 100%;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import Header from '@/components/cs/Header.vue';
import Contact from '@/components/cs/Contact.vue';
import Messenger from '@/components/cs/Messenger.vue';
import Call from '@/components/cs/Call.vue';
import Loader from '@/components/Loader.vue';
import api from '@/config/api';
import { mapGetters, mapActions } from 'vuex';

export default {

  components: {
    Header,
    Contact,
    Messenger,
    Call,
    Loader,
  },

  data() {
    return {
      isShow: false,
      loader: false,
      windowWidth: null,
      isLogin: false,

      socket: null,
      stompClient: null,

      user: null,
      selectedContact: null,
      usersCall: [],
      csContact: [],
      messages: [],

      /* eslint-disable global-require */
      incCallRingtone: require('@/assets/audio/call.mp3'),
      /* eslint-disable global-require */
    };
  },

  computed: {
    ...mapGetters('csChat', [
      'callList',
      'contactList',
      'messageList',
    ]),
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
    if (this.windowWidth < 1025) this.isShow = true;

    this.stompClient.connect({}, () => {
      const subsCall = this.subscribeCall();
      const subsCall2 = this.subscribeCallReceived();
      const subsChat = [];
      const subsCall3 = [];
      this.csContact.forEach((val) => {
        subsChat.push(this.subscribeChatMessage(val.callId));
        subsCall3.push(this.subscribeCallTerminated(val.callId));
      });

      if (subsCall && subsCall2 && subsChat.length === this.csContact.length
      && subsCall3.length === this.csContact.length) {
        this.loader = false;
      }
    });
  },

  methods: {
    ...mapActions('csChat', [
      'receiveCall',
      'getUnreceivedCall',
      'getAllContact',
      'postMessage',
      'getAllMessage',
      'terminateCall',
      'readMessage',
    ]),

    async readUnreadMessage() {
      await this.$func.promiseAPI(this.readMessage, {
        callId: this.selectedContact.callId,
        userFrom: this.selectedContact.userId,
      });
    },

    async terminate(callId) {
      const { code } = await this.$func.promiseAPI(this.terminateCall, { callId });
      if (code === 200) {
        this.csContact = this.csContact.filter((val) => val.callId !== callId);
        this.selectedContact = null;
      }
    },

    async sendMessage(param) {
      await this.$func.promiseAPI(this.postMessage, {
        callId: param.callId,
        from: this.user.id,
        message: param.message,
      });
    },

    async getCalls() {
      const { code } = await this.$func.promiseAPI(this.getUnreceivedCall);
      if (code === 200) {
        this.usersCall = [...this.usersCall, ...this.callList.calls];
      }
    },

    async getMessage(callId) {
      this.loader = true;
      const { code } = await this.$func.promiseAPI(this.getAllMessage, { callId });
      if (code === 200) {
        this.loader = false;
        this.messages = [...this.messageList.messages];
      }
    },

    async getContacts() {
      const { code } = await this.$func.promiseAPI(this.getAllContact, { csId: this.user.id });

      if (code === 200) {
        this.csContact = [...this.csContact, ...this.contactList.contacts];
      }
    },

    async receive(id) {
      this.loader = true;
      const { code, data } = await this.$func.promiseAPI(this.receiveCall, {
        id,
        csId: this.user.id,
      });

      if (code === 200) {
        const incoming = {
          userId: data.contact.userId,
          name: data.contact.name,
          email: data.contact.email,
          callId: data.contact.callId,
          unreadMessages: data.contact.unreadMessages,
        };
        this.csContact = [incoming, ...this.csContact];
        const subsChat = this.subscribeChatMessage(data.contact.callId);
        const subsCallEnded = this.subscribeCallTerminated(data.contact.callId);

        if (subsChat && subsCallEnded) {
          this.loader = false;
        }
      }
    },

    connection() {
      this.socket = new SockJS(api.sockURL);
      this.stompClient = Stomp.over(this.socket);
    },

    subscribeCallReceived() {
      return this.stompClient.subscribe('/call/received', (res) => {
        this.usersCall = JSON.parse(res.body).calls;
      });
    },

    subscribeCall() {
      return this.stompClient.subscribe('/call', (res) => {
        setTimeout(() => {
          this.playAudio();
          this.usersCall.push(JSON.parse(res.body));
        }, 4000);
      });
    },

    subscribeChatMessage(callId) {
      return this.stompClient.subscribe(`/message/${callId}`, (res) => {
        const incomingMessage = JSON.parse(res.body);
        if (this.selectedContact && this.selectedContact.callId === incomingMessage.callId) {
          this.pushMessage(incomingMessage);
          this.readUnreadMessage();
        } else {
          const index = this.csContact.findIndex((val) => val.callId === incomingMessage.callId);
          this.csContact[index].unreadMessages += 1;
          this.orderContact(incomingMessage.callId);
        }
      });
    },

    subscribeCallTerminated(callId) {
      return this.stompClient.subscribe(`/call/ended/${callId}`, (res) => {
        const { id } = JSON.parse(res.body);
        this.csContact = this.csContact.filter((val) => val.callId !== id);
        if (this.selectedContact && this.selectedContact.callId === id) {
          this.selectedContact = null;
        }
      });
    },

    orderContact(callId) {
      const topContact = this.csContact.find((val) => val.callId === callId);
      const contacts = this.csContact.filter((val) => val.callId !== callId);
      this.csContact = [topContact, ...contacts];
    },

    playAudio() {
      const sound = new Audio(this.incCallRingtone);
      sound.play();
    },

    toggleSidebar() {
      this.isShow = !this.isShow;
    },

    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    init() {
      this.user = this.$cookies.get('cs');
      this.isLogin = true;

      this.getWindowWidth();
      this.connection();
      this.getCalls();
      this.getContacts();
    },

    setSelectedContact(contact) {
      if (this.selectedContact === contact) return;
      this.messages = [];
      this.selectedContact = contact;
      this.readUnreadMessage();
      this.resetUnreadMessages();
      this.getMessage(contact.callId);
    },

    resetUnreadMessages() {
      const index = this.csContact.findIndex((val) => val.callId === this.selectedContact.callId);
      this.csContact[index].unreadMessages = 0;
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
    },
  },

  created() {
    this.loader = true;
    if (this.$cookies.get('cs_token') && this.$cookies.get('cs')) {
      this.init();
    } else {
      this.$router.go(-1);
    }
  },

};

</script>
