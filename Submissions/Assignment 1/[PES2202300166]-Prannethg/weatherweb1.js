document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "b852a2dfabe7bd4e90cf2472b9cc5579";

    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city !== "") { // Check for an empty input, not "value"
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then((response) => response.json())
                .then((data) => {
                    cityName.textContent = data.name;
                    temperature.textContent = `${data.main.temp}°C`;
                    description.textContent = data.weather[0].description;
                    humidity.textContent = `${data.main.humidity}%`;
                    windSpeed.textContent = `${data.wind.speed}Km/H`;
                    console.log(data)
                    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    switch (data.weather[0].main) {
                        case 'Clear':
                            weatherIcon.src ="clear.png";
                            break;
                        case 'Clouds':
                            weatherIcon.src = "clouds.png";
                            break;
                        case 'Drizzle':
                        case 'Light Intensity Drizzle':
                            weatherIcon.src = "drizzle.png";
                            break;
                        case 'Mist':
                        case 'Haze':
                            weatherIcon.src = "mist.png";
                            break;
                        case 'Snow':
                            weatherIcon.src = "snow.png";
                            break;
                        case 'Rain':
                        case 'Light Rain':
                        case 'Moderate Rain':
                            weatherIcon.src = "rain.png";
                            break;
                        default:
                            weatherIcon.src = "unknown.png";
                            break;
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    cityName.textContent = "??";
                    temperature.textContent = "Nothing To See";
                    description.textContent = "Enter a Location!!";
                    humidity.textContent = "-_-";
                    windSpeed.textContent = "-_-";
                    weatherIcon.src = "clear.png";
                });
        }
    });
});
