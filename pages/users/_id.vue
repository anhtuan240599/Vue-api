<template>
  <div>
    <div @click.prevent="addName">
      {{ user.email }}
    </div>
    <div>
      {{$auth.$state.user.name}}
    </div>
    <input id="name">
    <div>
      <MessageSelection :user="user" :mess="mess" />
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          <span :class="{ 'float-right': message.type === 0 }">{{
            message.message
          }}</span>
        </li>
      </ul>
      <div>
        <small v-if="typing">User is typing</small>
        <form @submit.prevent="send">
          <input type="text" v-model="newMessage" />
          <input type="submit" @click="onAddChat" />
        </form>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import io from "socket.io-client";
import MessageSelection from "~/components/MessageSelection"
const socket = io(process.env.baseApiUrl);
export default {
  component: {
    MessageSelection
  },
  middleware: "auth",
  auth: {
    strategies: {
      local: false
    }
  },
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(
        `http://localhost:3000/api/auth/${params.id}`
      );
      let manyChat = $axios.$get(
        `http://localhost:3000/message/${params.id}`
      );
      const [userResponse, chatResponse] = await Promise.all([
        response,
        manyChat
      ]);
      console.log(chatResponse)
      return {
        user: userResponse.user,
        mess : chatResponse.messages,
      };
      
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      newMessage: null,
      messages: [],
      typing: false,
      ready: false,
      user: null,
      message: null
    };
  },
  watch: {
    newMessage(value) {
      value ? socket.emit("typing") : socket.emit("stopTyping");
    }
  },
  methods: {
    send() {
      this.messages.push({ message: this.newMessage, type: 0 });
      socket.emit("chat-message", this.newMessage);
      this.newMessage = null;
    },
    addName() {
      this.ready = true;
      socket.emit("joined");
    },
    async onAddChat() {
      try {
        let data = new FormData();
        data.append("message", this.newMessage);

        let response = await this.$axios.$post(
          `http://localhost:3000/message/${this.$route.params.id}`,
          data
        );

        if (response.success) {
          this.$router.push(`/users/${this.$route.params.id}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    socket.emit("Created", {
      user: $state.user.name
    });
    socket.on("Created", data => {});
    socket.on("chat-message", data => {
      this.messages.push({ message: data, type: 1 });
    });
    socket.on("typing", data => {
      this.typing = true;
    });

    socket.on("stopTyping", data => {
      this.typing = false;
    });
    socket.on("joined", data => {
      this.ready = true;
    });
  }
};
</script>
