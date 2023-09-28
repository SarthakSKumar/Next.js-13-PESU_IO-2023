const apiKey = 'f562ada09f0786a051eb7daf94c10be5';
const searchButton = document.getElementById('search-button');
const searchBox = document.getElementById('search-box');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const city = searchBox.value;
    getWeatherData(city);
    searchBox.value = '';
});

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${(data.main.temp - 273.15).toFixed(2)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch((error) => {
            console.error('Error fetching weather data: ', error);
        });
}
