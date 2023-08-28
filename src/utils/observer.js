import mitt from './event'

export default class ObServer {
  constructor(connectionUrl = 'ws://localhost:3000/ws/message') {
    this.connectionUrl = connectionUrl
    this.connect(connectionUrl)
    this.onEvent()
  }

  connect(connectionUrl) {
    this.webSocket = new WebSocket(connectionUrl)
  }

  onEvent() {
    this.webSocket.onmessage = (event) => {
      mitt.emit('emitMessage', event)
    }
    this.webSocket.onopen = (event) => {
      console.log(event)
    }
  }
}
