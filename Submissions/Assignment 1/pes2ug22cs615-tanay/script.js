document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "put your own api here dumbass";
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();
        if (cityName !== "") {
            fetchWeatherData(cityName);
        }
    });

    function fetchWeatherData(cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;

                const weatherHTML = `
                    <h2>${cityName}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                `;

                weatherInfo.innerHTML = weatherHTML;
            })
            .catch((error) => {
                console.error("Error fetching weather data: ", error);
                weatherInfo.innerHTML = "City not found. Please try again.";
            });
    }

});
