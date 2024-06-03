
const apiKey = '30d38b26954359266708f92e1317dac0';

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Mínima: ${data.main.temp_min}°C / Máxima: ${data.main.temp_max}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
    `;
}

function searchCity() {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
}

// Load default city weather
getWeather('Barcelona');