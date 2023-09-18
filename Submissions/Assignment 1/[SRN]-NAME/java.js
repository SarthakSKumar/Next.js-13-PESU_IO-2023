const apiKey = '4adba9352361d0eee8d0455dc495bd45';

const baseUrlGeocode = 'http://api.openweathermap.org/geo/1.0/direct?';
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?';



function getGeocodeApiUrl(place) {
    return `${baseUrlGeocode}q=${place}&limit=5&appid=${apiKey}`
}

function getWeatherApiUrl(lat, lon) {
    return `${baseUrlWeather}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

}


function displayValueInDocument(text) {
    let elem = document.getElementById('value');
    elem.innerHTML = text;
}

function displayErrorInDocument(text) {
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
    .then((resp) => {
        console.log('Response from Geocode API');
        console.log(resp);
        if(!resp.ok) throw new Error('Response not ok for Geocode API');
        return resp.json();
    })
    .then((data) => {
        console.log("Geo code data");
        console.log(data);
        if(data.length == 0) throw new Error(`Unknown city ${place} from Geocode API`);
        let geoData = data[0];
        let lat = geoData.lat;
        let lon = geoData.lon;
        console.log(`Lat:${lat}, Lon:${lon}`);
        return {'lat': lat, 'lon': lon}; // JSON object contaiing lat and lon
    })
    .then((data) => {
        console.log(`Lat/Lon of ${place}`);
        console.log(data);
        // Got lat/lon so prepare the weather API
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

        let weather = data.main;
        return weather;

    })
    .then((weather) => {
        /*
        feels_like : 301.51
        grnd_level: 911
        humidity: 68
        pressure: 1012
        sea_level: 1012
        temp: 299.94
        temp_max: 299.94
        temp_min: 296.05
        */
        let text = `
            Max temp: ${weather.temp_max} &deg;C<br>
            Min temp: ${weather.temp_min} &deg;C<br>
            Feels like: ${weather.feels_like} &deg;C<br>
        `
        displayValueInDocument(text);
        displayErrorInDocument("");

    })
    .catch((err) => {  // Captures the error from any of 'then' above
        console.log("Caught error");
        console.log(err);
        displayErrorInDocument(err);
        displayValueInDocument("");
    });

}



function showWeatherOfGivenPlace() {
    let place = document.getElementById('place').value;
    setWeatherValue(place);
}


