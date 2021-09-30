import axios from 'axios';
import { SocketWatcher } from 'components/SocketWatcher';
import './App.css';

const connect = async () => {
  const res = await axios.post('http://localhost:8000/api/v1/users/connect', {
    username: 'Random username',
  });

  return res;
};

function App() {
  return (
    <div className="App">
      <SocketWatcher />
      <button onClick={connect}>Connect</button>
    </div>
  );
}

export default App;
