const apikey = 'ed0beda6e33df59091bcb831b67ddc9e';
const weatherInfo = document.getElementById('weather-info');
const cityinput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const getWeatherLocationButton = document.getElementById('get-weather-location')

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const max= data.main.temp_max;
            const min= data.main.temp_min;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;

            const weatherinfo = `
                <h2>whether in ${city}</h2>
                <p>temperature: ${temperature}°C</p>
                <p>min: ${min}°C max: ${max}°C</p>
                <p>description: ${description}</p>
                <p>huemidity: ${humidity}%</p>
            `;
            weatherInfo.innerHTML = weatherinfo;
        })
        .catch(error => {
            console.error('Error:', error);
            weatherInfo.innerHTML = 'Error. Try Agaun';
        });
}

getWeatherButton.addEventListener('click', () => {
    const city = cityinput.value;
    if (city === '') {
        alert('enter a city name.');
        return;
    }
    fetchWeatherData(city);
});

getWeatherLocationButton.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(lat,lon);

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const city = data.name;
                    fetchWeatherData(city);
                })
                .catch(error => {
                    console.error('Error', error);
                    weatherinfo.innerHTML = 'Error 5690';
                });
        });
    });


window.addEventListener('load', () => {
    const savedCity = localStorage.getItem('weatherAppCity');
    if (savedCity) {
        cityinput.value = savedCity;
        fetchWeatherData(savedCity);
    }
});