let weather = {
  apiKey: "95a62e630698bba2e261e9be18afcfbe",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey,
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name, weather, main, wind } = data;
    const { description } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;
    console.log(name, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity = " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed = " + speed + " km/h";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

weather.fetchWeather("Bangalore");