import { io as createClient, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

class SocketClient {
  public io!: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() {
    const host = process.env.REACT_APP_SOCKET_HOST;
    const port = process.env.REACT_APP_SOCKET_PORT;

    this.io = createClient(`http://${host}:${port}`, {
      transports: ['websocket'],
      upgrade: false,
    });
  }
}

export default new SocketClient();
