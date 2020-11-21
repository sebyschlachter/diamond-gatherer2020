import { Animal } from './animal.js';
import { Person } from './person.js';

const canvas =  document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const myPet = new Animal('Rocky');
myPet.canEat();

/*context.fillStyle = "red";
context.fillRect(30, 20, 32, 39);*/

const geoerge = new Image();
geoerge.src = 'assets/george.png'
const GEORGE_WIDTH = 40;
const GEORGE_HEIGHT = 45;
let georgeX = 100;
let georgeY = 100;
geoerge.onload = () => {
    context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
}

const mario = new Image();
mario.src = 'assets/mario.png'
const MARIO_WIDTH = 30;
const MARIO_HEIGHT = 39;
let marioX = 30;
let marioY = 20;
mario.onload = () => {
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 30, 20, MARIO_WIDTH, MARIO_HEIGHT)
}

const button = document.getElementById("myButton");
button.addEventListener("click", function() {
    console.log(this);
    context.fillStyle = "green";
    context.fillRect(480, 20, 40, 20);
});

document.addEventListener("keydown", function(event) {
    context.clearRect(0, 0, 600, 400);
    switch(event.key) {
        case 'ArrowUp': {
            if(georgeY>=0)
                georgeY -= 10;
            break;
        }
        case 'ArrowDown': {
            if((georgeY+GEORGE_WIDTH)< canvas.height)
                georgeY += 10;
            break;
        }
        case 'ArrowLeft': {
            if(georgeX>=0)
                georgeX -= 10;
            break;
        }
        case 'ArrowRight': {
            if((georgeX+GEORGE_WIDTH) < canvas.width)
                georgeX += 10;
            break;
        }
        case 'w': {
            console.log(marioY)
            if(marioY>0)
                marioY-=10;
            break;
        }
        case 'a': {
            if(marioX>0)
                marioX-=10;
            break;
        }
        case 'd': {
            if((marioX+MARIO_WIDTH) <= canvas.width)
                marioX+=10;
            break;
        }
        case 's': {
            if((marioY+MARIO_WIDTH)< canvas.height)
                marioY+=10;
            break;
        }
    }
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
    context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
});
//ex1
let array = ["Love", "I", "Javascript"]
console.log(array);
array.splice(1,1);
array.unshift("I");
console.log(array);
//ex2
let array2 = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ];
array2.forEach(function(item, index){
    console.log(`Pozitia: ${index},  Valoare:  ${item},  Tipul:  ${typeof item}`);
});
//ex6
const person1 = new Person('Seby','Schlachter',25,'Skoda',true);
person1.getName();
person1.getAge();
person1.getCar();
person1.hasJob();

const person2 = new Person('Alex','Pop',30,'Opel',true);
person2.getName();
person2.getAge();
person2.getCar();
person2.hasJob();

const person3 = new Person('Andrei','Mitu',23,'Dacia',false);
person3.getName();
person3.getAge();
person3.getCar();
person3.hasJob();