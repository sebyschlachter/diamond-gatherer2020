class Game{
    constructor(options,gameLoop){
        this.id = options.id;
        this.players = options.players;
        this.gameLoop = gameLoop;
        this.start();
    }
    start(){
        const that = this;
        setInterval(function(){that.gameLoop(that.id)},1000/60);
    }
}
module.exports = Game;