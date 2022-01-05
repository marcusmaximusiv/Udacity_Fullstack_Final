// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
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
app.use(express.static('dist'));
const port = 8000;
// Setup Server
const server = app.listen(port, listening);
//port that is being listened on 
function listening(){
    console.log("Server running");
    console.log('Running on localhost: ${port}')
};
// GET route
app.get('/all', getData)
function getData(req, res){
  res.send(projectData)
  console.log(data)
}
//POST  data
app.post('/addDate', addDate)

function addDate (req, res){
   
  newEntry ={
    city: req.body.city,
    date: req.body.date,
    temp: req.body.temp,
    weather: req.body.weather,
    locationphoto: req.body.locationphoto
  }

  projectData = newEntry
  res.send(projectData)
  console.log(projectData)

}

