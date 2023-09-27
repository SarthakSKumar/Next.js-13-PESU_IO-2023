const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const city = document.getElementById('city');
    const cityName = city.value;

    const apiKey = '31ca7ce672b4854fd83a288a5b75fe08';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            weatherInfo.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
                <p>Pressure: ${pressure} hPa</p>
                <p>Humidity: ${humidity}%</p>
                <p>Description: ${description}</p>
                <img src="${weatherIcon}" alt="Weather Icon">
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Unable to fetch weather data.</p>';
        });
});
