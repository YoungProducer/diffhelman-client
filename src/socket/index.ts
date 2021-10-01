import { io as createClient, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { addedInvite, shiftInvite } from 'store/invites';
import { changedUserConnected, setCurrentUsersList } from 'store/users';

export class SocketClient {
  public io!: Socket<DefaultEventsMap, DefaultEventsMap>;
  private host: string | undefined;
  private port: string | undefined;

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
      setCurrentUsersList(data.users);
    });

    this.io.on('connected-to-chat-service', () => changedUserConnected(true));

    this.io.on('recive-invite', ({ roomId, username }) => {
      addedInvite({ roomId, username });
    });

    this.io.on('invite-accepted', (data) => {
      console.log(data);
      shiftInvite();
    });
  };

  connect = (username: string) => {
    this.io.emit('connect-to-chat-service', { username });
  };

  invite = (invitedUsername: string) => {
    this.io.emit('invite-user', { username: invitedUsername });
  };

  acceptInvite = (roomId: string) => {
    this.io.emit('accept-invite', { roomId });
  };
}

export default new SocketClient();
