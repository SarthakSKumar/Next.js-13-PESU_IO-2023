

const apiUrl = 'https://openweathermap.org/api';

fetch(apiUrl).then((response) => {
    if (!response.ok) {
        throw new Error('HTTP error! Status: ${response.status}');
    }
    return response.json()
})
.then((data) => {
    console.log('Data fetched:',data);
})
.catch((error) => {
    console.error('Fetch error:',error);
})
    

    const apiKey = "a40809e64a6fa7b2c4a600041906122d";
    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const location = document.getElementById("location");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    searchButton.addEventListener("click", () => {
        const city = cityInput.value;

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod===200) {
                    location.textContent = 'Location'
                    temperature.textContent = 'Temperature'
                    description.textcontent = 'Description'
                } else {
                    alert("City has not been found. Please enter valid city name");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    } else {
        alert("Please enter valid city name");
    }
})



