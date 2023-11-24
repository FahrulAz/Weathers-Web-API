//api key + url
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=19fb58883aa212835fb6c90c6d10fe03&q=';

//menggunakan fetch (vanilla javascript) ========================================================================
const searchButton = document.querySelector('.btn-search');
searchButton.addEventListener('click', async function() {
    try{
        const inputKeyword = document.querySelector('.input-search');
        const weathers = await getWeather(inputKeyword.value);
        updateUI(weathers);
    }
    catch(err){
        console.log(err);
    }
});


function getWeather(keyword) {
    return fetch(url + keyword)
     .then(response => {
        if (!response.ok) {
            throw new Error (response.statusText);
        }
        return response.json();
     })
     .then(response => {
        if(response.cod == "404") {
            throw new Error (response.message);
        }
        return response;
     });
}

function updateUI(weathers) {
    let city = '';
    weathers.map(c => city += appendCity(c));
    // const cardCity = document.querySelector('.weather-box');
    // cardCity.innerHTML = city;
}


function appendCity(c) {
    return `<img id="weather-image" src="/images/clear.png" />
            <div class="city-name">${c.name}, ${c.sys.country}</div>
            <p id="temperature">${c.main.temp}&deg;c</p>
            <p id="description">${c.weather[0].main}</p>`
}