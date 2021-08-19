
class Shield {
    
    constructor( canvasWidth,  width, speed){
        this.speed          = speed;
        this.canvasWidth    = canvasWidth;
        this._width          = width;
    }

    get width()     { return this._width;}
    get X()         { return this._x}
    set X(value)    { this._x = value;}

    moveRight(){
        this.X += this.speed;
        if ( (this.X + this.width ) > this.canvasWidth)
        {
            this.X =  this.canvasWidth - this.width;
        }
    }

    moveLeft(){
        this.X -= this.speed;
        if ( this.X < 0)
        {
            this.X = 0;
        }
    }

    moveCenter(){
        this.X = (this.canvasWidth - this.width)/2;
    }

}

module.exports = Shield