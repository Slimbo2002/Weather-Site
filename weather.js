const key = "a210a163b6f041b7b6a204824262311";

const locationInput = document.querySelector('#location-input');
const goButton = document.querySelector("#go-button");
const currentLocation = document.querySelector('#location-text');
const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const feelsLike = document.querySelector('#feels-like');

const highText = document.querySelector('#high');
const lowText = document.querySelector('#low');

const todayForecast = document.querySelector('#todays-forecast');


async function GetCurrentWeather(location){
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`);
    const data = await res.json();
    return data;
}
async function GetForecastWeather(location){
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}`);
    const data = await res.json();
    return data;
}
async function UpdateUI(){
    let location = locationInput.value;
    let currentWeather = await GetCurrentWeather(location);
    let forecastWeather = await GetForecastWeather(location);
    let currentTime = new Date().getHours();

    console.log(forecastWeather);
    

    currentLocation.textContent = currentWeather.location.name + ", " + currentWeather.location.region;
    temperature.textContent = currentWeather.current.temp_c + "°";
    feelsLike.textContent = "Feels Like: " + currentWeather.current.feelslike_c + "°";  

    let todaysForecast = forecastWeather.forecast.forecastday[0];

    highText.textContent = `H: ${todaysForecast.day.maxtemp_c}`;
    lowText.textContent = `L: ${todaysForecast.day.mintemp_c}`;

    let hourlyForcast = forecastWeather.forecast.forecastday[0].hour;
    let displayedHours = 0;

    for(let i = 0; i < hourlyForcast.length; i++){
        let currentSubject = hourlyForcast[i];

        if(new Date(currentSubject.time).getHours() >= currentTime && displayedHours<6){
            let formattedTime;
            let forecastHour = new Date(currentSubject.time).getHours();
        
            if(forecastHour == currentTime){
                formattedTime = "Now";
            }
            else{
                formattedTime = new Date(currentSubject.time).getHours();
            }
            
            todayForecast.innerHTML += 
            `
            <div class = "weather-card">
                <h3>${formattedTime}</h3>
                <img src ="${currentSubject.condition.icon}" height="64" width="64">
                <h3>${Math.round(currentSubject.temp_c)}</h3>
            </div>
            `
            displayedHours++;
        }
    }
}

goButton.addEventListener("click", UpdateUI);
locationInput.addEventListener("keypress", function (e){
    if(e.key == "Enter"){
        UpdateUI();
    }
});