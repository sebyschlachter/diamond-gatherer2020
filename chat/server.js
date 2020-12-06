const { response } = require('express');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


http.listen(5050, function() {
    console.log('[Server started at port 5050]');
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

io.on('connection', function(socket) {
    console.log('[Socket connected: ]' + socket.id);

    socket.on('join-chat', function(username) {
        console.log('user chat ', socket.id, username);
        chatUsers[socket.id] = username;
        socket.join('chat');
        socket.emit('joined-chat');
        socket.broadcast.to('chat').emit('new-user-connected', username);
        io.to('chat').emit('refresh-user-list', chatUsers);
    });

    socket.on('send-message', function(message, messageColor) {
        io.to('chat').emit('new-message', chatUsers[socket.id], message, messageColor);
    });

    socket.on('leave-chat', function() {
        socket.broadcast.to('chat').emit('new-user-disconnected', chatUsers[socket.id]);
        delete chatUsers[socket.id];
        socket.leave('chat');
        socket.emit('menu');
        io.to('chat').emit('refresh-user-list', chatUsers);
    });

    
})


const chatUsers = {};


