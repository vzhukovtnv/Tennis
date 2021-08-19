const Tennis = require('./tennis')
const fs     = require('fs')

let obj = Tennis.startGame()
log(obj);
for (let i=1; i <120 ; i++){
    log( Tennis.calculateNextScene(""))
}

  function log(obj){
    let s = JSON.stringify(obj);
    console.log(s);
    /* fs.appendFile('log.txt',s, function (err) {
        if (err) throw err;
        console.log(s);
      }); */
  }