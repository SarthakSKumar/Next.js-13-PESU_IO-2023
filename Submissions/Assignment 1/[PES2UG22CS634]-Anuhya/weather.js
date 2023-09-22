
document.addEventListener("DOMContentLoaded", () => 
{
    const apiKey = "46632c96a22312028463f05b9bb723f8";
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    searchButton.addEventListener("click", () => 
    {
        const cityName = cityInput.value.trim();
        if (cityName !== "") 
        {
            fetchWeatherData(cityName);
        }
    });

    function fetchWeatherData(cityName) 
    {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const description = data.weather[0].description;
                
                const weatherHTML = 
                `
                    <h2>${cityName}</h2>
                    <div class = "weathercontainer" >
                    <h3>
                    <p>Temperature: ${temperature} Degrees Celsius</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>${description}</p>
                    <h3>
                    </div>
                `;
                weatherInfo.innerHTML = weatherHTML;
            })
            .catch((error) => 
            {
                console.error("Error fetching weather data: ", error);
                weatherInfo.innerHTML = "City not found. Please try again.";
            });
    }

});