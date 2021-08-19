const express = require('express')
const http    = require('http') 
const path    = require('path')
//const cors    = require('cors') 
const Tennis = require('./model/tennis')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json());
app.use(express.static(__dirname+"/public"))
//app.use(cors()) // Dont't need access to other sites anymore

app.get('/', (req, res) => {
  res.send('Hello Table Tennis!')
})

app.get('/api/games/tableTennis', (req, res) => {
  //res.sendFile('index.html', {root:__dirname+'/public/html'})
  res.redirect('/html/index.html')
})

app.get('/api/games/tableTennis/makeNextScene/:button', async (req, res) => { 
  let button = req.params.button
  let tb
  if (button == ":ArrowLeft"){
    tb = "Left";
  }else if(button == ":ArrowRight"){
    tb = "Right";
  }else{
    tb ="";
  }
  //console.log('Next scene "'+button+'"  tb=', tb)

  let scene = await Tennis.calculateNextScene(tb)
  //console.log('Next scene ' + scene.toString())
  res.send(scene) 
}) 
/*
app.get('/api/games/tableTennis/makeNextScene/ArrowLeft', async (req, res) => { 
  res.send(await Tennis.calculateNextScene("Left")) 
}) 


app.get('/api/games/tableTennis/makeNextScene/ArrowRight', async (req, res) => { 
  res.send(await Tennis.calculateNextScene("Right")) 
}) 
*/
app.get('/api/games/tableTennis/startGame', async (req, res) => { 
  console.log("Start game");
  let scene = await Tennis.startGame();
  res.send(scene) 
}) 

app.get('/api/games/tableTennis/startPlayBackGame', async (req, res) => { 
  console.log("Start play back game")
  let scene = await Tennis.startPlayBackGame();
  res.send(scene) ;
})

app.get('/api/games/tableTennis/playBackGame', async (req, res) => { 
  //console.log("Play back game")
   res.send(await Tennis.playBackGame()) 
})

app.listen(port, () => {
  console.log(`Table tennis server listening at http://localhost:${port}`)
})