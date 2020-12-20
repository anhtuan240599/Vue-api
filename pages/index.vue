<style>
  .float-right {
    float : right ;
  }
</style>

<template>
  <div>
    <div v-if="ready">
      <ul>
        <li v-for="(message,index) in messages" :key="index"> <span :class="{'float-right': message.type === 0 }">{{ message.message }}</span></li>
      </ul>
      <div>
      <small v-if="typing">User is typing</small>
      <form @submit.prevent="send">
        <input type="text" v-model="newMessage">
        <button type="submit"> submit </button>
      </form>
      </div>
    </div>
    <div v-for="deck in decks" :key="deck._id">
      <div>
        <div @click.prevent="addName">
            {{ deck.owner.name}}
        </div>
        <nuxt-link :to="`/decks/${deck._id}`">
          <div>
            {{ deck.name }}
          </div>
        </nuxt-link>
        <nuxt-link :to="`/users/${deck.owner._id}`">
          <div>
            {{ deck.owner._id }}
          </div>
        </nuxt-link>

        <img :src="deck.image" />
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

const socket = io(process.env.baseApiUrl)
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/decks");

      return {
        decks: response.decks
      };
    } catch (err) {
      console.log(err);
    }
  },
  
  data() {
    return {
    newMessage : null,
    messages : [],
    typing : false,
    ready : false,
    user : null,
    }
  },
  watch: {
    newMessage(value) {
      value ? socket.emit('typing') : socket.emit('stopTyping');
    }
  },
  methods: {
    send() {
      console.log(typeof(this.newMessage))
      this.messages.push({message: this.newMessage , type: 0})
      socket.emit('chat-message', this.newMessage)
      this.newMessage = null
    },
    addName() {
      this.ready = true
      socket.emit('joined')
    }
  },
  created() {
    socket.emit('Created','Tuan')
    socket.on('Created',(data) => {
     
    })
    socket.on('chat-message' , (data) => {
      this.messages.push({message: data , type: 1})
      
    })
    socket.on('typing', (data) => {
      this.typing = true
    })

    socket.on('stopTyping', (data) => {
      this.typing = false
    })
    socket.on('joined',(data) => {
      this.ready = true
    })

  
  },
};
</script>
