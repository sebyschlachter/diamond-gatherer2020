const server = require('../server');
const Diamond = require('./diamond');

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
        this.diamonds = [];
        this.bullets = [];
        this.totalDiamonds = 3;
        this.over = false;
        this.start();
    }

    start() {
        const that = this;
        this.gameInterval = setInterval(function () { server.gameLoop(that.id) }, 1000 / 60);
    }

    update() {
        if(this.inProgress() && this.players[0].score + this.players[1].score === this.totalDiamonds){
            this.over = true;
            this.winner = this.players[0].score > this.players[1].score ? 'space-ranger' : 'pink-lady';
            return;
        }
        this.players.forEach(function (player) {
            player.update();
        })
        this.bullets.forEach((bullet,index) => {
            if(bullet.distance <=0){
                delete this.bullets[index];
            }else{
                bullet.update();
            }
        })
    }

    generateDiamonds(){
        for(let i=0;i<this.totalDiamonds;i++){
            let diamond = this.checkDiamondNotInBase();
            this.diamonds.push(diamond);
        }

    }

    checkDiamondNotInBase(){
        let diamond = new Diamond();
        if(
            (diamond.x > this.players[0].base.width || diamond.y > this.players[0].base.height)
            &&
            ((diamond.x + diamond.width) < this.players[1].base.x || (diamond.y + diamond.height) < this.players[1].base.y)
        ){
            return diamond;
        }else{
            return this.checkDiamondNotInBase();
        }
    }

    inProgress(){
        return this.players.length == 2;
    }
}

module.exports = Game;