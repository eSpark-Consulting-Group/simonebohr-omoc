import { logger } from './utils';
import { Socket } from 'socket.io';
const socket = require('socket.io');

export const connectSocket = (server: any) => {
  const io = socket(server, {
    pingTimeout: 6000,
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    logger.info('New Socket connection establishes', socket.id);

    //
    socket.on('setup', userData => {
      socket.join(userData?._id);
      socket.emit('connected');
    });

    // Join in user to room
    socket.on('join chat', room => {
      socket.join(room);
      console.log({ room });
    });

    socket.on('new message', newMessageReceived => {
      console.log('🚀 Message new message emitted');

      if (!newMessageReceived?.users) return console.log('chat.users is not defined');
      newMessageReceived?.users?.forEach(({ userId }: any) => {
        // if (user._id == newMessageReceived.sender._id) return;
        socket.emit('message received', newMessageReceived);
      });
    });
    logger.info('Socket Server connected');
  });
  return io;
};
