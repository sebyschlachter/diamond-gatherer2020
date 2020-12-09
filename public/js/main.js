// import { Animal } from '/js/animal.js';
// import { Person } from '/js/person.js';
import { Employee } from '/js/employee.js';
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

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

socket.on('menu', function () {
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('game-container').classList.add('display-none');
});

document.getElementById('create-game-button').addEventListener('click', function () {
    const input = document.getElementById('game-name-input');
    const gameName = input.value;
    if (gameName.length > 0) {
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', gameName);
    } else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }
});

socket.on('game-loop', function (objectsForDraw) {
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);

    objectsForDraw.forEach(function (objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
})

socket.on('add-game-to-list', function (options) {
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = options.gameId;

    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = options.gameName;
    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join game!';
    joinGameButton.addEventListener('click', function () {
        socket.emit('join-game', options.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);
    document.getElementById('game-list').appendChild(gameElementContainer);
})

socket.on('remove-game-from-list', function (gameId) {
    document.getElementById(gameId).classList.add('display-none');
})
socket.on('game-over', function (imageId, gameId) {
    console.log('game-over');

    /*context.fillStyle = "#878276";
    context.fillRect(0, 0, 960, 640);
    context.font = "30px Arial";
    context.fillStyle = "red";
    context.fillText("GAME OVER", canvas.width / 3, canvas.height / 4);
    context.fillText(reason, canvas.width / 3, canvas.height / 3);
    document.getElementById('go-back-button-container').classList.remove('display-none');

    document.getElementById('go-back-button').addEventListener('click', function () {
        document.getElementById('menu').classList.remove('display-none');
        document.getElementById('game-container').classList.add('display-none');
        document.getElementById('go-back-button-container').classList.add('display-none');
    })*/
    context.drawImage(document.getElementById(imageId), 0, 0);
    document.getElementById('back-to-menu').classList.remove('display-none');
    document.getElementById('back-to-menu').dataset.gameId = gameId;
})
document.getElementById('back-to-menu').addEventListener('click', function() {
    socket.emit('back-to-menu', document.getElementById('back-to-menu').dataset.gameId);
})
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'ArrowUp':
            socket.emit('start-moving-player', 'up');
            break;
        case 'ArrowDown':
            socket.emit('start-moving-player', 'down');
            break;
        case 'ArrowLeft':
            socket.emit('start-moving-player', 'left');
            break;
        case 'ArrowRight':
            socket.emit('start-moving-player', 'right');
            break;
    }
});
document.addEventListener("keyup", function (event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            socket.emit('stop-moving-player', 'dy');
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            socket.emit('stop-moving-player', 'dx');
            break;
    }
});

//ex4
let arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined]
console.log("Array initial");
console.log(arr);

let numericElements = arr.filter(item => typeof item == "number");
console.log("Elementele de tip numeric:");
console.log(numericElements);

let multipleByTen = numericElements.map(item => item * 10);
console.log("Elementele de tip numeric inmultite cu 10:");
console.log(multipleByTen);

let result = multipleByTen.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
});
console.log(`Suma elementelor de tip numeric inmultite cu 10: ${result}`);

//ex3
const em1 = new Employee("seby", "schlachter", 25, 6, "Engineer", true);
em1.getContractLength();
em1.employeeTitle();
em1.workStatus();
em1.showDetails();
em1.showExperience();

const em2 = new Employee("Andrei", "Pop", 35, 12, "Manager", true);
em2.getContractLength();
em2.employeeTitle();
em2.workStatus();
em2.showDetails();
em2.showExperience();

