function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  let dateNow = document.querySelector("#current-date");
  dateNow.innerHTML = `${day}`;
  return `${day} ${formatHours(timestamp)}`;
}
function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let tempNow = document.querySelector("#current-temp");
  let cityNow = document.querySelector("#current-city");
  let dateNow = document.querySelector("#current-date");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityNow.innerHTML = response.data.name;
  tempNow.innerHTML = `${celsiusTemperature}`;
  dateNow.innerHTML = formatDate(response.data.dt * 1000);
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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h2>${formatHours(forecast.dt * 1000)}</h2>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png""
        alt=""
        class="forecast-img"
      />
      <div class="forecast-temp">
        <h3>
          <span class="max-temp">${Math.round(forecast.main.temp_max)}°</span> |
          <span class="min-temp">${Math.round(forecast.main.temp_min)}°</span>
        </h3>
      </div>
    </div>
  `;
  }
}
function search(city) {
  let units = "metric";
  let apiKey = "e1d312b915e056eb1a20e8be1c78c46a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
  //let currentCity = document.querySelector("#current-city");
  //currentCity.innerHTML = `${city.value}`;
}
let searchCityForm = document.querySelector("#city-form");
searchCityForm.addEventListener("submit", submitCity);

//Unit conversion
function showTempCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempNow.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", showTempCelsius);

function showTempFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
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

search("Addis Ababa");
