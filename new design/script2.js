const container = document.querySelector('.container');
const search = document.querySelector('.btn-search');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-details');
const error = document.querySelector('.not-found')
const cityHide = document.querySelector('.city-hide')

search.addEventListener('click',() => {

    const APIKey = '19fb58883aa212835fb6c90c6d10fe03';
    let city = document.querySelector('.input-search').value;

    if (city == '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${APIKey}&q=${city}`)
      .then(response => response.json())
      .then(data => {

        if(data.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetail.classList.remove('active');
            error.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if(cityHide.textContent == city) {
            return;
        }
        else {
            const cloneWeather = document.querySelectorAll('.active-clone');
            if (cloneWeather.length > 0) {
                cloneWeather.forEach(clone => {
                    clone.remove();
                });
            }

            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetail.classList.add('active');
            error.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'
                    break;
                case 'Rain':
                    image.src = 'images/rain.png'
                    break;
                case 'Snow':
                    image.src = 'images/snow.png'
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png'
                    break;
                case 'Mist':
                    image.src = 'images/mist.png'
                    break;
            
                default:
                    image.src = 'images/cloud.png'
            }
    
            temperature.innerHTML = `${parseInt(data.main.temp)}<span>&deg;c</span>`;
            description.innerHTML = `${data.weather[0].main}`;
            humidity.innerHTML =  `${data.main.humidity} %`;
            wind.innerHTML = `${data.wind.speed} Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll('info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone')
                cloneInfoHumidityFirst.classList.remove('active-clone')
                cloneInfoWindFirst.classList.remove('active-clone')

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }

      })
      document.querySelector('.input-search').value = '';
});

