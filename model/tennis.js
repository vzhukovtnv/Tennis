const Bomb      = require('./bomb')
const Shield    = require('./shield')
const tennisDB  = require('../db/tennisDB')

const canvasX = 1024;
const canvasY = 768;

const myBomb    = new Bomb  (canvasX, canvasY, 50, 50, 10, 10);
const myShield  = new Shield(canvasX,          50,     20);

let scenesArray = []
let scenesArrayCount = 0

function missedTouch(){
    if ( myBomb.bottomTouched()){
        let bombCenter = myBomb.X + myBomb.width/2;
        return ( (bombCenter < myShield.X) || (bombCenter > (myShield.X + myShield.width) ) )
    } 
    return false;
}

async function calculateNextScene(keyPressed){
    if (keyPressed ==='Left')
    {
        myShield.moveLeft();
    } else if (keyPressed ==='Right')
    {
        myShield.moveRight();
    } 
    
    myBomb.calculateNextPosition();
    return createObjectForBrowser2(
        myBomb.X, 
        myBomb.Y,
        myShield.X,
        missedTouch() ? "Game over" : "");   
}

async function startGame() {
    myBomb.randomSet();
    myShield.moveCenter();
    await tennisDB.deleteAllScenes();
    return createObjectForBrowser2(
        myBomb.X, 
        myBomb.Y,
        myShield.X,
        "Game started");
}

async function startPlayBackGame() {   
    scenesArray = await tennisDB.listScenes();
    scenesArrayCount = 0
    return takeOneScene();   
}


async function playBackGame() {
    return  takeOneScene(); 
}


async function takeOneScene(){
    if (scenesArrayCount < scenesArray.length){
        let component = scenesArray[scenesArrayCount++];
        let message = component.message;
        if (message=="Game started"){
            message = "Playing back"
        }

        return createObjectForBrowser2(
            component.bombX, 
            component.bombY,
            component.shieldX,
            message);
    } else{
        return createObjectForBrowser2(
            0, 
            0,
            0,
            "Game over");    
    } 
}



async function createObjectForBrowser2(bombX, bombY, shieldX, message){
    let obj = {  bombX, bombY, shieldX, message}
    await tennisDB.saveScene(obj);
    return obj;
}




module.exports = { calculateNextScene,
    startGame,
    startPlayBackGame,
    playBackGame
}