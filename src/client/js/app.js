// Personal API Key for Geonames API
let geoURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let geoKey = '&appid=9155d1aa8ccb466f3b2cc890f412c65c&units=imperial';
// Personal API Key for WeatherBit API
let weatherURL = 'https://api.weatherbit.io/v2.0/current?city=';
let weatherKey = '&key=fe124a0a145849bea341a8c0fcb6dc63&include=minutely';
// Personal API Key for Pixabay API
let pixaURL = 'https://pixabay.com/api/?key=24892556-bbc7094902e61376495938437&q=';
let pixaKey = '&image_type=photo';
// Event listener to add function to existing HTML DOM element
// Function called by event listener */
document.getElementById('generate').addEventListener('click', performAction);
//Function to GET Web API Data
function performAction(e){
    const newDestination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departuredate').value;
    console.log(newDestination)
    console.log(departureDate)
    LocationInfo(geoURL,newDestination, geoKey)
    LocationWeather(weatherURL,newDestination, weatherKey)
    LocationPhoto(pixaURL,newDestination, pixaKey)
}
//This section of the code retrieves the data from GeoNames API
const LocationInfo = async (geoURL,destination,geoKey)=>{
  const res = await fetch(geoURL+destination+geoKey)
  try{
    const data = await res.json();
    console.log(data)
  } catch(error){
    console.log("error", error);
  }
}
//This area of the code handles the WeatherBit API and all of the information being fetched
const LocationWeather = async (weatherURL,destination, weatherKey) =>{
  const res = await fetch(weatherURL+destination+weatherKey)
  try{
    const data = await res.json();
    console.log(data)
  } catch(error){
    console.log("error", error);
  }
}
//This section of the code retrieves the data from PixaBay and renders the image associated with it 
const LocationPhoto= async (pixaURL,destination,pixaKey)=>{
  const res = await fetch(pixaURL+destination+pixaKey)
  try{
    const data = await res.json();
    console.log(data)
  } catch(error){
    console.log("error", error);
  }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});
  try {
    const newData = await response.json();
    return newData
  }catch(error) {
  console.log("error", error);
  }
}
/* Function to GET Project Data */
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
/*UPDATE UI DEMO 
const updateUI = async () => {
  const request = await fetch('/all')
  try{
      const allData = await request.json()
      console.log(allData);
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('city').innerHTML = allData.city;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
  }catch(error){
      console.log("error",error)
  }
}*/