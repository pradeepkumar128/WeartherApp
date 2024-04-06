function searchWeather() {
  let searchInput = document.getElementById("searchInput").value;
  let apiKey = "88286337c79ca97d70823f75a48eca29";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let location = data.name + ", " + data.sys.country;
      let temperature = (data.main.temp - 273.15).toFixed(2) + "°C"; // Converting temperature from Kelvin to Celsius
      let description = data.weather[0].description;
      let weatherIcon = getWeatherIcon(data.weather[0].icon);

      document.getElementById("location").innerText = location;
      document.getElementById("temperature").innerText =
        "Temperature:" + temperature;
      document.getElementById("description").innerText =
        "Description:" + description;
      document.getElementById("weatherIcon").className = weatherIcon;
      document.getElementById("error").innerText = "";
    })
    .catch((error) => {
      document.getElementById("error").innerText = +error.message;
      document.getElementById("error").style.color = "red";
    });
}

function getWeatherIcon(iconCode) {
  switch (iconCode) {
    case "01d":
      return "fas fa-sun"; // clear sky, day
    case "01n":
      return "fas fa-moon"; // clear sky, night
    case "02d":
    case "03d":
    case "04d":
      return "fas fa-cloud-sun"; // cloudy, day
    case "02n":
    case "03n":
    case "04n":
      return "fas fa-cloud-moon"; // cloudy, night
    case "09d":
    case "10d":
      return "fas fa-cloud-showers-heavy"; // rain, day
    case "09n":
    case "10n":
      return "fas fa-cloud-showers-heavy"; // rain, night
    case "11d":
    case "11n":
      return "fas fa-bolt"; // thunderstorm
    case "13d":
    case "13n":
      return "fas fa-snowflake"; // snow
    case "50d":
    case "50n":
      return "fas fa-smog"; // mist
    default:
      return "fas fa-question"; // default icon
  }
}
