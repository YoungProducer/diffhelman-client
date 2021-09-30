import { ChangeEvent, useState } from 'react';
import { useStore } from 'effector-react';

import { SocketWatcher } from 'components/SocketWatcher';
import { $onlineUsersList, changedCurrentUsername } from 'store/users';
import socket from './socket';
import './App.css';

function App() {
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

  return (
    <div className="App">
      <SocketWatcher socket={socket} />
      <input value={username} onChange={onChange} type="text" />
      <button onClick={onClick}>Connect</button>

      <div>
        <h3>Users list</h3>
        {usersList.map((user) => (
          <p>Username: {user.username}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
