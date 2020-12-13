const RIGHT_EDGE = 860;
const DOWN_EDGE = 540;
class Diamond{
    constructor(){
        this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
        this.y = Math.floor(Math.random() * DOWN_EDGE + 50);
        this.imageId = 'diamond';
        this.width = 26;
        this.height = 21;
    }

    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.x,
                this.y
            ]
        }
    }
}
module.exports = Diamond;