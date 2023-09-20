//javascript code which sends inputted City to openweathermap URL 
//to recieve weather information 

//inputting API key received from openweathermap website 
const apiKey = '4adba9352361d0eee8d0455dc495bd45';

/**
 * 1. URL for converting inputted city to its geographical coordinates
 * 2. URL for recieveing weather conditions of inputted geographical coordinates
 * */
const baseUrlGeocode = 'http://api.openweathermap.org/geo/1.0/direct?';
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?';

//funtion receives inputted city by the user to process weather forecast
function showWeatherOfGivenPlace() {
    let place = document.getElementById('place').value;
    setWeatherValue(place);
}

//API coding for processing user-inputted city
function getGeocodeApiUrl(place) {
    return `${baseUrlGeocode}q=${place}&limit=5&appid=${apiKey}`
}

//API coding for processing city's latitude and longitude received from previous URL
function getWeatherApiUrl(lat, lon) {
    return `${baseUrlWeather}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

}

//function returns the information received by the website and displays on the HTML page for the user
function displayValueInDocument(text) {
    //'value' is the id of html function to display result
    let elem = document.getElementById('value');
    elem.innerHTML = text;
}

//funtion that returns the error received by the program while processing the user's request and diplays it on the HTML page
function displayErrorInDocument(text) {
    //'error' is the name of the html function to display an error that is developed
    let elem = document.getElementById('error');
    elem.innerText = text;
}

/**
 * setWeatherValue needs to API calls
 *  1. API call to convert City name to Lat/Lon --> getGeocodeApiUrl
 *  2. API call to get weather from Lat/Lon     --> getWeatherApiUrl
 * 
 *  Use promise chaining .... .then(...).then(...).then(...).catch(...)
 *  Call to 'fetch' javascript api return a promise that can be used for chaining
 */
function setWeatherValue(place) {
    let apiGeocode = getGeocodeApiUrl(place);
    console.log(apiGeocode);
    fetch(apiGeocode) // Caling geocode API
    .then((resp) => { //receives response from 
        console.log('Response from Geocode API');
        console.log(resp);
        if(!resp.ok) throw new Error('Response not ok for Geocode API');
        return resp.json();
    })
    .then((data) => {
        console.log("Geo code data");
        console.log(data);
        //error thrhown if the city inputted has no valid coordinates
        if(data.length == 0) throw new Error(`Unknown city ${place} from Geocode API`);
        let geoData = data[0];
        let lat = geoData.lat;
        let lon = geoData.lon;
        console.log(`Lat:${lat}, Lon:${lon}`);
        return {'lat': lat, 'lon': lon}; // JSON object containing latitude and longitude
    })
    .then((data) => {
        console.log(`Lat/Lon of ${place}`);
        console.log(data);
        // Got latitude/longitude so prepare the weather API
        let apiWeather = getWeatherApiUrl(data.lat, data.lon);
        console.log(apiWeather);

        return fetch(apiWeather); // Calling weather API
    })
    .then((resp) => {
        console.log('Response from Weather API');
        console.log(resp);
        if(!resp.ok) throw new Error('Response not ok for Weather API');
        return resp.json();
    })
    .then((data) => {
        console.log("Weather data");
        console.log(data);
        //picking relevant data from the information received from the website 
        let weather = data.main;
        return weather;

    })
    .then((weather) => {
        /*
        example information received to pick out user relavant data: 
        feels_like : 301.51
        grnd_level: 911
        humidity: 68
        pressure: 1012
        sea_level: 1012
        temp: 299.94
        temp_max: 299.94
        temp_min: 296.05
        */

       /**
        * Text that contains data to be displayed to the user
        * Syntax to get value in Celcius: &deg;C
        * The reason for doing so is that the temperature value is automatically given in 
        * Fahrenheit and needs an external command to be given in Celcius
          */
        let text = `
            Max temp: ${weather.temp_max} &deg;C<br> 
            Min temp: ${weather.temp_min} &deg;C<br>
            Feels like: ${weather.feels_like} &deg;C<br>
            Humidity: ${weather.humidity} <br>
        `;
        //code to prevent viewing previous request result
        displayValueInDocument(text);
        displayErrorInDocument("");

    })
    .catch((err) => {  
        // Captures the error from any of 'then' above
        console.log("Caught error");
        console.log(err);

        //code to prevent viewing previous request result
        displayErrorInDocument(err);
        displayValueInDocument("");
    });

}






