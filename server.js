const { response } = require('express');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let Game = require('./game');
let Player = require('./player');

const PLAYER_DIM = 32;
http.listen(5000, function(){
    console.log('[Server started at port 5000]');
});

app.get('/',function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.get('/about',function(request, response){
    response.sendFile(__dirname + "/about.html");
});

app.use(express.static(__dirname + "/public"));

io.on('connection',function(socket){
    console.log('[Socket connected: ]'+socket.id);

    socket.on('join-chat',function(username){
        console.log('user chat ',socket.id,username);
        chatUsers[socket.id] = username;
        socket.join('chat');
        socket.emit('joined-chat');
        socket.broadcast.to('chat').emit('new-user-connected',username);
        io.to('chat').emit('refresh-user-list',chatUsers);
    });

    socket.on('send-message',function(message, messageColor){
        io.to('chat').emit('new-message', chatUsers[socket.id] , message, messageColor);
    });

    socket.on('leave-chat',function(){
        socket.broadcast.to('chat').emit('new-user-disconnected',chatUsers[socket.id]);
        delete chatUsers[socket.id];
        socket.leave('chat');
        socket.emit('menu');
        io.to('chat').emit('refresh-user-list',chatUsers);
    });

    socket.on('create-game',function(gameName){
        console.log('new game created');
        const gameId = 'game-'+socket.id;
        const players = [new Player(PLAYER_DIM)];
        const game = new Game({
            id:gameId,
            players: players
        },gameLoop);
        games[gameId] = game;
        socket.join(gameId);
    })

})

// class Player{
//     constructor(options){
//         this.x = 80;
//         this.y = 127;
//         this.dx = 0;
//         this.dy = 0;
//         this.imageId = 'space-ranger';
//         this.direction = 'down';
//         this.imageStartPoints = {
//             right : [193,225],
//             left : [131,161],
//             down : [65,98],
//             up : [0,33]
//         };
//     }

//     forDraw(){
//         return {
//             imageId : this.imageId,
//             drawImageParameters : [
//                 this.imageStartPoints[this.direction][0],
//                 0,
//                 PLAYER_DIM,
//                 PLAYER_DIM,
//                 this.x,
//                 this.y,
//                 PLAYER_DIM,
//                 PLAYER_DIM
//             ]
//         }
//     }
// }

// class Game{
//     constructor(options){
//         this.id = options.id;
//         this.players = options.players;
//         this.start();
//     }
//     start(){
//         const that = this;
//         setInterval(function(){gameLoop(that.id)},1000/60);
//     }
// }

function gameLoop(id){
    const objectsForDraw = [];
    games[id].players.forEach(function(player){
        objectsForDraw.push(player.forDraw());
    })
    io.to(id).emit('game-loop',objectsForDraw);
}

const chatUsers = {};
const games = {};
