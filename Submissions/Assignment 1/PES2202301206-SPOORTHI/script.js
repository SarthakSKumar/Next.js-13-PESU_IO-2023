

 

    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

 

    const searchButton = document.getElementById('search');

    const locationInput = document.getElementById('location');

    const locationData = document.getElementById('location-data');

    const temperatureData = document.getElementById('temperature-data');

    const descriptionData = document.getElementById('description-data');

    const humidityData = document.getElementById('humidity-data');

    const weatherIcon = document.getElementById('weather-icon');

 

    searchButton.addEventListener('click', () => {

        const location = locationInput.value;

 

        // Replace with the actual API URL for your chosen weather service

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

 

        fetch(apiUrl)

            .then((response) => response.json())

            .then((data) => {

                locationData.textContent = `${data.name}, ${data.sys.country}`;

                temperatureData.textContent = `${data.main.temp} °C`;

                descriptionData.textContent = data.weather[0].description;

                humidityData.textContent = `${data.main.humidity}%`;

                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                weatherIcon.alt = 'Weather Icon';

            })

            .catch((error) => {

                console.error('Error fetching weather data:', error);

            });

    });

 

 