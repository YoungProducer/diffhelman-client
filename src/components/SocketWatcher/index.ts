import { useEffect } from 'react';

import socket from 'socket';

export const SocketWatcher = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  return null;
};
