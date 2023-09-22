const apiKey = 'ddce194336bb0be2cf109d4ec0a2f009';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                cityName.textContent = `CITY: ${data.name}`;
                temperature.textContent = `TEMPERATURE: ${data.main.temp}°C`;
                humidity.textContent = `HUMIDITY: ${data.main.humidity}%`;
                description.textContent = `DESCRIPTION: ${data.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});
