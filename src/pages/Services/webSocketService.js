const WebSocketService = {
  socket: null,

  connect(token) {
 
    const wsUrl = `${process.env.VUE_APP_WS_URL}/ws/waitercall/admin/1?token=${token}`
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  },

  send(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket not open to send message');
    }
  },

  close() {
    if (this.socket) {
      this.socket.close();
    }
  },

};

export default WebSocketService;