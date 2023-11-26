const inputSearch = document.querySelector('.input-search');
const searchBtn = document.getElementById('searchBtn');

const weather_box = document.querySelector('.weather-box');

const image = document.querySelector('.image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind');

const location_error = document.querySelector('.location-error');

const celcius_convertion = 273.15;

// sumber = https://openweathermap.org/
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
        case 'Mist':
            image.src = "/images/mist.png";
            break;
        case 'Snow':
            image.src = "/images/snow.png";
            break;

    }

    console.log(weather_data);
}

// Enter key
function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        checkWeather(inputSearch.value);
    }
}

inputSearch.addEventListener('keypress', handleEnterKeyPress);

searchBtn.addEventListener('click', () => {
    checkWeather(inputSearch.value);
});