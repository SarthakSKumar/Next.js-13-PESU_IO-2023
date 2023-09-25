const apiKey = '7ace59472329ddd1fa78ff59fde0c56d';

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
