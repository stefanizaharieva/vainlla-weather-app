function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`; 
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`; 
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]; 
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast"); 

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML +
    
            `
            <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                src="http://openweathermap.org/img/wn/03d@2x.png"
                alt=""
                width="43"
                />
        <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-maximum">
            18°</span>
        <span class="weather-forecast-temperature-minimum">
            12°</span>
        </div>
    </div>
`;
    }); 
        
    forecastHTML = forecastHTML + `</div>`; 
    forecastElement.innerHTML = forecastHTML;

}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city"); 
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
    celsiusTemperature = response.data.main.temp; 
    
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name; 
    descriptionElement.innerHTML = response.data.weather[0].description; 
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt", response.data.weather[0].description); 
}

function search(city) {
    let apiKey = "4c09a5cae9d6b252db4b54c2b9ab1b65";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value); 
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTempterature(event) {
    event.preventDefault(); 
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active"); 
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32; 
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}

function displayCelsiusTempterature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

let celsiusTemperature = null;  

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", displayFahrenheitTempterature); 

let celsiusLink = document.querySelector("#celsius-link"); 
celsiusLink.addEventListener("click", displayCelsiusTempterature); 


search("London");
displayForecast(); 