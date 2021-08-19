const tennisDB = require("../db/tennisDB");
let scene = {bombX:380,bombY:0,shieldX:487,message:"Game started"};
//let result= tennisDB.saveScene(scene);
//ShowList()

tennisDB.deleteAllScenes().then(

tennisDB.listScenes().then( (scenes) => {
    console.log(scenes);

})
)