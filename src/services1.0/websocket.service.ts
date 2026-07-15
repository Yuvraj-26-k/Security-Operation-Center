type EventCallback = (event: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;

  private listeners: EventCallback[] = [];

  private reconnectTimer: number | null = null;

  private readonly url =
    "ws://127.0.0.1:8000/ws/events";

  connect() {
    if (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log(
        "✅ SentinelSOC WebSocket Connected"
      );
    };

    this.socket.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data);

        this.listeners.forEach((listener) =>
          listener(event)
        );
      } catch (error) {
        console.error(error);
      }
    };

    this.socket.onclose = () => {
      console.log(
        "❌ WebSocket Disconnected"
      );

      this.reconnect();
    };

    this.socket.onerror = () => {
      this.socket?.close();
    };
  }

  private reconnect() {
    if (this.reconnectTimer) {
      return;
    }

    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;

      this.connect();
    }, 3000);
  }

  subscribe(callback: EventCallback) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  disconnect() {
    this.socket?.close();

    this.socket = null;
  }
}

export default new WebSocketService();