import { useEffect } from 'react';

import { SocketClient } from 'socket';

export interface SocketWathcerProps {
  socket: SocketClient;
}

export const SocketWatcher = ({ socket }: SocketWathcerProps) => {
  useEffect(() => {
    socket.init();
  }, []);

  return null;
};
