const apiKey = '6b326a335ade64bf9c7831629bc3804e';

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <p1>${data.name}, ${data.sys.country}</p1>
                <p2>${Math.round(data.main.temp - 273.15)}°C</p2>
                <p3>Weather: ${data.weather[0].description}</p3>
                <p4>Humidity: ${data.main.humidity}%</p4>
                <p5>Feels like:${Math.round(data.main.feels_like-273.15)}°C</p5>
                <p6>Temp Min:${Math.round(data.main.temp_min-273.15)}°C</p6>
                <p7>Temp Max:${Math.round(data.main.temp_max-273.15)}°C</p7>
                <p8>Air Pressure:${(data.main.pressure)}hPa</p8>
                <p9> Visiblity: ${data.visibility}m</p9>
                <p10>Wind:${data.wind.speed}kmph\,${data.wind.deg}° </p10>
                <p13>${data.weather[0].main}</p13>
                <p11>Sunrise:${data.sys.sunrise}UTC</p11>
                <p12>Sunset:${data.sys.sunset}UTC</p12>
                
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
