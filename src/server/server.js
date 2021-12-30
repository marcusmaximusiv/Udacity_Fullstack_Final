// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
const path = require('path');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'))

//console.log(__dirname + '/src')

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./src/client/views/index.html'))
})


const port = 8000;
// Setup Server
const server = app.listen(port, listening);
//port that is being listened on 
function listening(){
    console.log("Server running");
    console.log('Running on localhost: ${port}')
};
// GET route
const data = [];

app.get('/all', getData)
function getData(req, res){
  res.send(projectData)
  console.log(data)
}
/*
//POST weather data
app.post('/addWeather', addWeather)

function addWeather (req, res){
   
  newEntry ={
    date: req.body.date,
    city: req.body.city,
    temp: req.body.temp,
    content: req.body.content
  }

  projectData = newEntry
  res.send(data)
  console.log(data)

}
*/