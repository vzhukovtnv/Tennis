class Bomb {
    constructor(canvasWidth, canvasHight, width, hight, averageSpeedX, averageSpeedY){
        this.canvasWidth    = canvasWidth;
        this.canvasHight    = canvasHight;
        this._width          = width;
        this.hight          = hight;
        this.averageSpeedX  = averageSpeedX;
        this.averageSpeedY  = averageSpeedY;
    }
  
    get width()     { return this._width;}
    get X()         { return this._x}
    set X(value)    { this._x = value;}
    get Y()         { return this._y}
    set Y(value)    { this._y = value;}


    randomSet(){
        this.Y = 0;
        
        let width3 = Math.floor(this.canvasWidth / 3);        
        this.X = width3 + Math.floor(width3 * Math.random());
     
        this.speedY = this.averageSpeedY;
        this.speedX = Math.floor( (1 + Math.random()) * this.averageSpeedX);
        if (Math.random >= 0.5){
            this.speedX  = -this.speedX;
        }
    }

    calculateNextPosition(){
        this.X += this.speedX;
        if (this.X < 0){
            this.X = 0;
            this.speedX = -this.speedX;
        }
        let limit = this.canvasWidth - this.width;
        if (this.X > limit){
            this.X = limit;
            this.speedX = -this.speedX;
        }

        this.Y += this.speedY;
        if (this.Y < 0){
            this.Y = 0;
            this.speedY = -this.speedY;
        }
        limit = this.canvasHight - this.hight
        if (this.Y > limit){
            this.Y = limit;
            this.speedY = -this.speedY;
        }
        //console.log(`speedX=${this.speedX} speedY=${this.speedY}`)
    }

    bottomTouched(){
        return  this.Y >= (this.canvasHight - this.hight);
    }
}

module.exports = Bomb