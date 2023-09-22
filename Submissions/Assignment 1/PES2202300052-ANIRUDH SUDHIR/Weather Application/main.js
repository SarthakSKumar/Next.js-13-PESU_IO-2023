//Function to retrieve latitudes and longitudes of requested city
async function getCityData(cityName) {
    try {
        let geocodeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
        //Fetching location data from API endpoint
        let rawLocationData = await fetch(geocodeEndpoint);
        let locationData = await rawLocationData.json();
        //Storing data required for weather API request
        cityLatitude = locationData[0]["lat"];
        cityLongitude = locationData[0]["lon"];
    } catch {
        //Throwing error if location API fetch fails
        throw new Error("Location Data Unavailable!");
    }
}

//Function to retrieve weather data for given latitude and longitude
async function getWeatherData() {
    try {
        let weatherEndpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=metric`;
        //Fetching weather data from API endpoint
        let rawWeatherData = await fetch(weatherEndpoint);
        weatherData = await rawWeatherData.json();
    } catch (error) {
        //Throwing error if weather API fetch fails
        throw new Error("Weather Data Unavailable!");
    }
}

//Function to create weather card columns
function createDataColumns() {
    weatherDataDay.textContent = "";
    for (let i = 1; i <= 6; i++) {
        //Adding six data-columns to the DOM on mouse click
        const dataColumn = document.createElement("div");
        dataColumn.classList.add("data-column");
        let dataColumnID = `datacolumn-${i}`;
        dataColumn.setAttribute("id", dataColumnID);
        weatherDataDay.appendChild(dataColumn);
    }
}

//Function to fill API data in data columns
function fillWeatherData() {
    let blankImage = new Image();
    //Adding row headings to first column
    const firstColumn = document.querySelector("#datacolumn-1");
    firstColumn.innerHTML += `Date<br>`;
    //Appending blank image to fix icon spacing in first column
    firstColumn.appendChild(blankImage);
    firstColumn.innerHTML += `Temperature<br>Feels Like<br>`;
    firstColumn.innerHTML += `Humidity<br>Description<br>`;
    firstColumn.innerHTML += `Chance of Rain<br>`;
    let jsonIndex = 0;
    for (let i = 2; i <= 6; i++) {
        let currentWeatherData = weatherData["list"][jsonIndex];
        //Calculating the index of the required element from the JSON object
        if (jsonIndex === 0) {
            let currentDayHours = new Date().getHours();
            let dayWeatherCount = 8 - Math.trunc(currentDayHours / 3);
            jsonIndex += dayWeatherCount + 3;
        } else jsonIndex += 8;
        let columnSelectorID = `#datacolumn-${i}`;
        const selectedColumn = document.querySelector(columnSelectorID);
        weatherIcon = document.createElement("img");
        //Retrieving weather icon
        weatherIcon.src = `https://openweathermap.org/img/wn/${currentWeatherData["weather"][0]["icon"]}@2x.png`;
        //Addine weather information to data cards
        selectedColumn.innerHTML += `${currentWeatherData["dt_txt"]
            .substring(0, 10)
            .split("-")
            .reverse()
            .join("-")}<br>`;
        selectedColumn.appendChild(weatherIcon);
        selectedColumn.innerHTML += `<br>${currentWeatherData["main"]["temp"]}&deg;C<br>${currentWeatherData["main"]["feels_like"]}&deg;C<br>`;
        selectedColumn.innerHTML += `${Math.trunc(
            Number(currentWeatherData["main"]["humidity"])
        )}%<br>`;
        let weatherDescription = currentWeatherData["weather"][0]["description"];
        selectedColumn.innerHTML += `${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
            }<br>`;
        selectedColumn.innerHTML += `${Math.trunc(
            Number(currentWeatherData["pop"]) * 100
        )}% <br>`;
    }
}

async function searchCity() {
    //Checking if user has entered a city or region
    if (searchBox.value === "") {
        weatherDataDay.textContent = "Please enter a city or region!";
    } else {
        //Attempting to fetch and display weather API data
        try {
            await getCityData(searchBox.value);
            await getWeatherData();
            createDataColumns();
            fillWeatherData();
        } catch (error) {
            //Printing message if API fetch throws errors
            weatherDataDay.textContent = error;
        }
    }
}

let apiKey = "66cab58a00be0e1b64b6ac3f24d0eb2b";
let cityLatitude, cityLongitude, weatherData;
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const weatherDataDay = document.querySelector("#weatherdata-day");

//Calling the primary function on mouse click
searchButton.addEventListener("click", searchCity);
