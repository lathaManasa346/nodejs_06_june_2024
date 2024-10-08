const express = require('express');
const socket = require('socket.io');

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

const activeUsers = new Set();

io.on('connection', function (socket) {
  console.log('Made socket connection');
 a = 10;
  socket.on('new user', function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit('new user', [...activeUsers]);
    if (data === 'sanjay' || data === 'praveen') {
      socket.join('sanjaypraveenroom');
    }
  });

  socket.on('disconnect', () => {
    activeUsers.delete(socket.userId);
    io.emit('user disconnected', socket.userId);
  });

  socket.on('chat message', function (data) {
    if (data.toWhom) {
      console.log('private', data.toWhom);
      socket.to('sanjaypraveenroom').emit('chat message', data);
    } else {
      console.log('public');
      io.emit('chat message', data);
    }
    socket.broadcast.emit('typing', data);
  });
});