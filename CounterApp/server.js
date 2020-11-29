const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5000, function() {
    console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('[Socket connected: ]' + socket.id);
    //socket.join('counter-room');
    //io.to('counter-room').emit('counter', counter);
    io.emit('counter', counter);

    socket.on('counter-incremented', function() {
        counter++;
        //io.to('counter-room').emit('counter', counter);
        io.emit('counter', counter);
    })
})

let counter = 1;