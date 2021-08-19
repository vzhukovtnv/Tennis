const { ObjectId } = require('mongodb');
const db = require("./db");

async function getStoredGameCollection(){
    return db.getCollection("storedGame");
}

async function saveScene(scene){
    let collection = await getStoredGameCollection();
    await collection.insertOne(scene);
    return scene;
}

async function listScenes(){
    let collection = await getStoredGameCollection();
    let cursor =  collection.find({});
    //console.log('cursor:',cursor);
    let p =cursor.toArray(); 
    //console.log('p:',p);
    return p;
}

async function deleteAllScenes(){
    let collection = await getStoredGameCollection();
    return collection.deleteMany({});
}


module.exports = { getsStoredGameCollection: getStoredGameCollection,
    saveScene,
    listScenes,
    deleteAllScenes
}