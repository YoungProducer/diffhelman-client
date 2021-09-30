import { io as createClient, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { setCurrentUsersList } from 'store/users';

export class SocketClient {
  public io!: Socket<DefaultEventsMap, DefaultEventsMap>;
  private host: string | undefined;
  private port: string | undefined;
  private connectedToChatService = false;
  private invitedRoomsIds: string[] = [];

  constructor() {
    this.host = process.env.REACT_APP_SOCKET_HOST;
    this.port = process.env.REACT_APP_SOCKET_PORT;
  }

  init = () => {
    this.io = createClient(`http://${this.host}:${this.port}`, {
      transports: ['websocket'],
      upgrade: false,
    });

    this.io.on('connect', this.listenEvents);
  };

  listenEvents = () => {
    this.io.on('user-list', (data) => {
      console.log(data);
      setCurrentUsersList(data.users);
    });

    this.io.on(
      'connected-to-chat-service',
      () => (this.connectedToChatService = true)
    );

    this.io.on('recive-invite', ({ roomId }) => {
      this.invitedRoomsIds.push(roomId);
    });

    this.io.on('invite-accepted', console.log);
  };

  connect = (username: string) => {
    this.io.emit('connect-to-chat-service', { username });
  };

  invite = (invitedUsername: string) => {
    this.io.emit('invite-user', { username: invitedUsername });
  };

  acceptInvite = (roomId: string) => {
    this.invitedRoomsIds.shift();
    this.io.emit('accept-invite', { roomId });
  };

  isConnected = () => this.connectedToChatService;
}

export default new SocketClient();
