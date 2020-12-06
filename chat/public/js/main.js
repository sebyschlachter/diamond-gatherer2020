// import { Animal } from '/js/animal.js';
// import { Person } from '/js/person.js';



// const myPet = new Animal('Rocky');
// myPet.canEat();

// /*context.fillStyle = "red";
// context.fillRect(100, 100, 40, 50);*/

// const geoerge = new Image();
// geoerge.src = 'assets/george.png'
// const GEORGE_WIDTH = 40;
// const GEORGE_HEIGHT = 45;
// let georgeX = 100;
// let georgeY = 100;
// geoerge.onload = () => {
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
// }

// const mario = new Image();
// mario.src = 'assets/mario.png'
// const MARIO_WIDTH = 30;
// const MARIO_HEIGHT = 39;
// let marioX = 30;
// let marioY = 20;
// mario.onload = () => {
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 30, 20, MARIO_WIDTH, MARIO_HEIGHT)
// }

// const button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     console.log(this);
//     context.fillStyle = "green";
//     context.fillRect(480, 20, 40, 20);
// });

// document.addEventListener("keydown", function(event) {
//     context.clearRect(0, 0, 600, 400);
//     switch(event.key) {
//         case 'ArrowUp': {
//             console.log(georgeY+GEORGE_HEIGHT);
//             if(georgeY>=0)
//                 georgeY -= 10;
//             break;
//         }
//         case 'ArrowDown': {
//             if((georgeY+GEORGE_HEIGHT)< canvas.height)
//                 georgeY += 10;
//             break;
//         }
//         case 'ArrowLeft': {
//             if(georgeX>=0)
//                 georgeX -= 10;
//             break;
//         }
//         case 'ArrowRight': {
//             if((georgeX+GEORGE_WIDTH) < canvas.width)
//                 georgeX += 10;
//             break;
//         }
//         case 'w': {
//             if(marioY>0)
//                 marioY-=10;
//             break;
//         }
//         case 'a': {
//             if(marioX>0)
//                 marioX-=10;
//             break;
//         }
//         case 'd': {
//             if((marioX+MARIO_WIDTH) <= canvas.width)
//                 marioX+=10;
//             break;
//         }
//         case 's': {
//             if((marioY+MARIO_HEIGHT)< canvas.height)
//                 marioY+=10;
//             break;
//         }
//     }
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
// });
// //ex1
// let array = ["Love", "I", "Javascript"]
// console.log(array);
// array.splice(1,1);
// array.unshift("I");
// console.log(array);
// //ex2
// let array2 = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ];
// array2.forEach(function(item, index){
//     console.log(`Pozitia: ${index},  Valoare:  ${item},  Tipul:  ${typeof item}`);
// });
// //ex6
// const person1 = new Person('Seby','Schlachter',25,'Skoda',true);
// person1.getName();
// person1.getAge();
// person1.getCar();
// person1.hasJob();

// const person2 = new Person('Alex','Pop',30,'Opel',true);
// person2.getName();
// person2.getAge();
// person2.getCar();
// person2.hasJob();

// const person3 = new Person('Andrei','Mitu',23,'Dacia',false);
// person3.getName();
// person3.getAge();
// person3.getCar();
// person3.hasJob();

const socket = io();

document.getElementById('join-chat-button').addEventListener('click', function() {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    if (userName.length > 0) {
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', userName);
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
});

socket.on('joined-chat', function() {
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
});

socket.on('new-user-connected', function(username) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${username} joined chat!`;
    messageContainer.appendChild(messageElement);
})

socket.on('new-user-disconnected', function(username) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${username} left chat!`;
    messageContainer.appendChild(messageElement);
})

socket.on('refresh-user-list', function(chatUsers) {
    document.getElementById("users-list").innerHTML = "";
    const listContainer = document.getElementById('users-list');
    for (const user in chatUsers) {
        const listElement = document.createElement('li');
        listElement.innerHTML = chatUsers[user];
        listContainer.appendChild(listElement);
    }
})

document.getElementById('send-message-button').addEventListener('click', function() {
    const message = document.getElementById('message').value;
    const messageColor = document.getElementById('message-color').value;
    document.getElementById('message').value = '';
    socket.emit('send-message', message, messageColor);
});

socket.on('new-message', function(user, message, messageColor) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${user}: <span style='color: ${messageColor};'>${message}</span>`;
    messageContainer.appendChild(messageElement);
});

document.getElementById('leave-chat-button').addEventListener('click', function() {
    socket.emit('leave-chat');
});

socket.on('menu', function() {
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
});







