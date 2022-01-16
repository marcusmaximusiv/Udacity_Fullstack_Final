// Personal API Key for Geonames API
let geoURL = 'http://api.geonames.org/searchJSON?q=';
let geoKey = '&username=marcusmaximusii';
// Personal API Key for WeatherBit API
let weatherURL = 'https://api.weatherbit.io/v2.0/current?city=';
let weatherKey = '&key=fe124a0a145849bea341a8c0fcb6dc63';
// Personal API Key for Pixabay API
let pixaURL = 'https://pixabay.com/api/?key=24892556-bbc7094902e61376495938437&q=';
let pixaKey = '&image_type=photo';
// Event listener to add function to existing HTML DOM element
// Function called by event listener */
// Set an event listener on botton id called 'plantrip'
document.getElementById('plantrip').addEventListener('click', scrollToTrip());
//This function controls the scroll to function for plantrip 
function scrollToTrip() {
// Get the div of the plantrip section of index.html
let planTripSec = document.getElementById('plan_trip');
// Scroll to plan trip section
planTripSec.scrollIntoView({behavior: "smooth"});
}
// Set an event listener on botton id called 'itinerary'
document.getElementById('itinerary').addEventListener('click', scrollToItinerary());
//This function controls the scroll to function for itinerary section
function scrollToItinerary() {
// Get the div of the itinerary section of index.html
let ItinerarySec = document.getElementById('your_itinerary');
// Scroll to plan trip section
ItinerarySec.scrollIntoView({behavior: "smooth"});
};
//Event Listener to clear elements 
document.getElementById('removetrip').addEventListener('click', performClear);
//Function to GET Web API Data
function performClear(e){
  document.getElementById('date').innerHTML = "";
  document.getElementById('city').innerHTML = "";
  document.getElementById('temp').innerHTML = "";
  document.getElementById('weather').innerHTML = "";
  document.getElementById('locationphoto').innerHTML = "";
}
export {performClear};
function performAction(e){
    let newDestination = document.getElementById('destination').value;
    console.log(newDestination)
    LocationInfo(geoURL,newDestination, geoKey).then((geoData) => {
      LocationWeather(weatherURL,newDestination, weatherKey).then((weatherData) => {
        LocationPhoto(pixaURL,newDestination, pixaKey).then((pixaData) => {
           const data = {
              city: geoData.city,
              date: geoData.date,
              temp: weatherData.temp,
              weather: weatherData.weather,
              locationphoto: pixaData.locationphoto,
           };
            postData("/addDate", data).then(() => {
              updateUI();
          });
        });
      });
    });
  }
  export {performAction};
//This section of the code retrieves the data from GeoNames API
const LocationInfo = async (geoURL,destination,geoKey)=>{
  const res = await fetch(geoURL+destination+geoKey)
  let departureDate = document.getElementById('departuredate').value;
  try{
    const data = await res.json();
    console.log(data)
    console.log(data.geonames[0].name)
    console.log(departureDate)
    return {date: departureDate, city: data.geonames[0].name};
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
    console.log(data.data[0].temp)
    console.log(data.data[0].weather.description)
    return{temp: data.data[0].temp, weather: data.data[0].weather.description}
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
    console.log(data.hits[0].largeImageURL)
    return{locationphoto: data.hits[0].largeImageURL}
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
//UPDATE UI DEMO 
const updateUI = async () => {
  const request = await fetch('/all')
  try{
      const allData = await request.json()
      console.log(allData);
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('city').innerHTML = allData.city;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('weather').innerHTML = allData.weather;
      document.getElementById('locationphoto').innerHTML = '<img id= "location_photo" src="'+allData.locationphoto+'" />';
  }catch(error){
      console.log("error",error)
  }
}



