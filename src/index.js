function formatDate() {
  let now = new Date();
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let todayDate = `${day}, ${date} ${month} ${year}`;
  let timeNow = `${hours}:${minutes}`;
  currentDate.innerHTML = todayDate;
  currentTime.innerHTML = timeNow;
}
formatDate();

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city.value}`;
  let units = "metric";
  let apiKey = "e1d312b915e056eb1a20e8be1c78c46a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function displayTemperature(response) {
  let tempNow = document.querySelector("#current-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  tempNow.innerHTML = `${celsiusTemperature}`;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  conditionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let searchCityForm = document.querySelector("#city-form");
searchCityForm.addEventListener("submit", searchCity);

//Unit conversion
function showTempCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#current-temp");
  tempNow.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", showTempCelsius);

function showTempFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = tempFahrenheit;
}

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", showTempFahrenheit);
let celsiusTemperature = null;

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "e1d312b915e056eb1a20e8be1c78c46a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=${units}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.name);

  function showCurrentTemperature() {
    let currentTemp = Math.round(response.data.main.temp);
    let currentLocation = response.data.name;
    console.log(currentLocation);
    let location = document.querySelector("#current-city");
    location.innerHTML = `${currentLocation}`;
    let temperature = document.querySelector("#current-temp");
    temperature.innerHTML = `${currentTemp}`;
    let conditionElement = document.querySelector("#condition");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    conditionElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }
  let currentLocationButton = document.querySelector("#current-button");
  currentLocationButton.addEventListener("click", showCurrentTemperature);
}
