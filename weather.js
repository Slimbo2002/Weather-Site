const key = "a210a163b6f041b7b6a204824262311&q";

const locationInput = document.querySelector('#location-input')
const goButton = document.querySelector("#go-button");
const currentLocation = document.querySelector('#location-text');
const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const feelsLike = document.querySelector('#feels-like')


async function GetCurrentWeather(location){
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}=${location}`);
    const data = await res.json();
    return data;
}
async function GetForecastWeather(location){
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}=${location}`);
    const data = await res.json();
    return data;
}
async function UpdateUI(){
    let location = locationInput.value;
    let currentWeather = await GetCurrentWeather(location);
    let forecastWeather = await GetForecastWeather(location)
    

    currentLocation.textContent = currentWeather.location.name + ", " + currentWeather.location.region;
    temperature.textContent = currentWeather.current.temp_c + "°";
    feelsLike.textContent = "Feels Like: " + currentWeather.current.feelslike_c + "°";
    weatherIcon.src = currentWeather.current.condition.icon;
}

goButton.addEventListener("click", UpdateUI);
locationInput.addEventListener("keypress", function (e){
    if(e.key == "Enter"){
        UpdateUI();
    }
});