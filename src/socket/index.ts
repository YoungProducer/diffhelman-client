import { io as createClient, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

class SocketClient {
  public io!: Socket<DefaultEventsMap, DefaultEventsMap>;
  private host: string | undefined;
  private port: string | undefined;

  constructor() {
    this.host = process.env.REACT_APP_SOCKET_HOST;
    this.port = process.env.REACT_APP_SOCKET_PORT;
  }

  connect = () => {
    this.io = createClient(`http://${this.host}:${this.port}`, {
      transports: ['websocket'],
      upgrade: false,
    });

    this.io.on('connect', this.listenEvents);
  };

  listenEvents = () => {
    this.io.on('user-list', (data) => console.log(data));
  };
}

export default new SocketClient();
