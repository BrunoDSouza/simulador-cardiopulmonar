<template>
    <div>
        <div id="main-content" class="container">
            <div class="row">
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="connect">WebSocket connection:</label>
                            <button id="connect" class="btn btn-default" type="submit" :disabled="connected == true" @click.prevent="connect">Connect</button>
                            <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false" @click.prevent="disconnect">Disconnect
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="name">What is your name?</label>
                            <input type="text" id="name" class="form-control" v-model="send_message" placeholder="Your name here...">
                        </div>
                        <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table id="conversation" class="table table-striped">
                        <thead>
                            <tr>
                                <th>Greetings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:key="index" v-for="(item, index) in received_messages" :key="item">
                                <td>{{ item }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  data () {
    return {
      received_messages: [],
      send_message: null,
      connected: false,
      stomp: {}
    }
  },
  methods: {
    send () {
      console.log('Send message:' + this.send_message)
      if (this.stomp && this.stomp.connected) {
        const msg = { name: this.send_message }
        this.stomp.send('/app/simulator.action', JSON.stringify(msg), {})
      }
    },
    connect () {
      this.socket = new SockJS('http://localhost:8080/ws')
      this.stomp = Stomp.over(this.socket)
      this.stomp.connect(
        {}, this.onConnected,
        error => {
          console.log(error)
          this.connected = false
        }
      )
    },
    onConnected () {
      // Subscribe to the Public Topic
      this.connected = true
      this.stomp.subscribe('/channel/public', this.onMessageReceived)
    },
    onError (error) {
      alert(error)
    },
    onMessageReceived (payload) {
      console.log(payload.body)
      this.received_messages.push(payload.body)
    },
    disconnect () {
      if (this.stompClient) {
        this.stomp.disconnect()
      }
      this.connected = false
    },
    tickleConnection () {
      this.connected ? this.disconnect() : this.connect()
    }
  },
  mounted () {
    // this.connect()
  }
}
</script>