const apiKey = "4aa369c77d9c547063c0c9ba3bdf8a11";
const city = document.querySelector(".city");
const btn = document.querySelector(".btn");
const weatherInfo = document.querySelector(".div3");

btn.addEventListener("click", () => {
  const cityName = city.value.trim();
  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;

      const weatherHtml = `
                <h2>Weather in ${cityName}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <p>Humidity: ${humidity}%</p>
            `;

      weatherInfo.innerHTML = weatherHtml;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherInfo.innerHTML = "Error fetching weather data. Please try again.";
    });
});
