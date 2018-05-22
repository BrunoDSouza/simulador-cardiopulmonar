<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="send()">Ping Server</button>
  </div>
</template>

<script>

import Stomp from 'webstomp-client'

export default {
  data () {
    return {
      isConnected: false,
      socketMessage: '',
      stomp: {}
    }
  },
  mounted () {
    this.connect()
    // this.send()
  },
  methods: {
    connect () {
      var url = 'ws://localhost:8080/ws'
      this.stomp = Stomp.client(url)
      this.stomp.debug = () => {}
      this.stomp.connect({}, this.onConnected, this.onError)
    },

    send () {
      var chatMessage = {
        sender: 'Zieg',
        content: 'Testandoooooo',
        type: 'CHAT'
      }
      this.stomp.send('/app/simulator.action', JSON.stringify(chatMessage), {})
    },

    onConnected () {
      // Subscribe to the Public Topic
      this.stomp.subscribe('/topic/public', this.onMessageReceived)

      // Tell your username to the server
      this.stomp.send('/app/simulator.addUser', {}, JSON.stringify({sender: 'Zieg', type: 'JOIN'})
      )
    },

    onError (error) {
      alert(error)
    },

    onMessageReceived (payload) {
      console.log(payload.body)
    }
  }
}
</script>