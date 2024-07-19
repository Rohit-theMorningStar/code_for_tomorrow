const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use(errorMiddleware);

io.on('connection', (socket) => {
 
  console.log('a user connected');
  socket.on('test', (data) => {
    console.log('from user === ', data);
    // id =    'WgI0kUhtkCQtPC8yAAAB'
    socket.emit('test', {msg: "Hellooo..."});
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
