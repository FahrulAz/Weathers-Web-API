const inputSearch = document.querySelector('.input-search');
const searchBtn = document.getElementById('searchBtn');

const weather_box = document.querySelector('.weather-box');

const image = document.querySelector('.image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind');

const hideBtn = document.getElementById('hideBtn');

const location_error = document.querySelector('.location-error');

const celcius_convertion = 273.15;

// data = https://openweathermap.org/
async function checkWeather(city){
    const api_key = "ca6a674c5da9fdb2ac3b0647745e3035";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_error.style.display = "flex";
        weather_box.style.display = "none";
        console.log("error");
        return;
    }

    location_error.style.display = "none";
    weather_box.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - celcius_convertion)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clear':
            image.src = "/images/clear.png";
            break;
        case 'Clouds':
            image.src = "/images/cloud.png";
            break;
        case 'Rain':
            image.src = "/images/rain.png";
            break;
        case 'Haze':
            image.src = "/images/mist.png";
            break;
        case 'Snow':
            image.src = "/images/snow.png";
            break;

    }

    console.log(weather_data);
    showWeatherBox();
}

// transition result
function showWeatherBox() {
    weather_box.style.opacity = 1;
    weather_box.style.height = 'min-content';
    weather_box.style.transitionDelay = '0.2s';
}

function hideWeatherBox() {
    weather_box.style.opacity = 0;
    weather_box.style.height = 0;
}

// enter key (alternatif)
function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        checkWeather(inputSearch.value);
    }
}

inputSearch.addEventListener('keypress', handleEnterKeyPress);

searchBtn.addEventListener('click', () => {
    checkWeather(inputSearch.value);
});

hideBtn.addEventListener('click', () => {
    hideWeatherBox();
});