import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { $invites, Invite } from 'store/invites';
import { $keys } from 'store/keys';
import { SocketWatcher } from 'components/SocketWatcher';
import {
  $onlineUsersList,
  $userConnected,
  changedCurrentUsername,
} from 'store/users';
import socket from './socket';
import './App.css';

interface InviteProps {
  invite?: Invite;
}

const InviteModal = ({ invite }: InviteProps) => {
  if (!invite) return null;

  const acceptInvite = () => {
    socket.acceptInvite(invite.roomId);
  };

  return (
    <div>
      <button onClick={acceptInvite}>Accept</button>
    </div>
  );
};

function App() {
  const invites = useStore($invites);

  const keys = useStore($keys);

  useEffect(() => {
    console.log(keys);
  }, [keys]);

  const userConnected = useStore($userConnected);
  const usersList = useStore($onlineUsersList);

  const [username, setUsername] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onClick = () => {
    changedCurrentUsername(username);
    socket.connect(username);
  };

  const handleUserClick = (username: string) => {
    socket.invite(username);
  };

  return (
    <div className="App">
      <SocketWatcher socket={socket} />

      {!userConnected && (
        <div>
          <input value={username} onChange={onChange} type="text" />
          <button onClick={onClick}>Connect</button>
        </div>
      )}

      {userConnected && (
        <div>
          <h3>Users list</h3>
          {usersList.map((user) => (
            <p
              onClick={() => handleUserClick(user.username)}
              style={{ cursor: 'pointer' }}
            >
              Username: {user.username}
            </p>
          ))}
        </div>
      )}

      <InviteModal invite={invites[0]} />
    </div>
  );
}

export default App;
