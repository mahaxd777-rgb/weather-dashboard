// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherContent = document.getElementById('weatherContent');
const forecastContainer = document.getElementById('forecastContainer');

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
locatonBtn.addEventListener('click', useGeolocation);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

/**
 * Search weather by city name
 */
async function searchWeather() {
    const city = searchInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    await fetchWeather(city);
}

/**
 * Use geolocation to fetch weather
 */
function useGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            showError('Unable to get your location: ' + error.message);
            showLoading(false);
        }
    );
}

/**
 * Fetch weather data from API
 */
async function fetchWeather(city) {
    showLoading(true);
    hideError();

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/weather/current?city=${encodeURIComponent(city)}`),
            fetch(`${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(city)}`)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found. Please check the spelling and try again.');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        searchInput.value = '';
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

/**
 * Fetch weather by coordinates
 */
async function fetchWeatherByCoordinates(lat, lon) {
    hideError();

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/weather/coordinates?lat=${lat}&lon=${lon}`),
            fetch(`${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(lat + ',' + lon)}`)
        ]);

        if (!currentResponse.ok) {
            throw new Error('Unable to fetch weather data for your location.');
        }

        const currentData = await currentResponse.json();
        const forecastData = forecastResponse.ok ? await forecastResponse.json() : null;

        displayCurrentWeather(currentData);
        if (forecastData) {
            displayForecast(forecastData);
        }
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

/**
 * Display current weather
 */
function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind, clouds, visibility } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('weatherDescription').textContent = weather[0].description;
    document.getElementById('temp').textContent = Math.round(main.temp) + '°C';
    document.getElementById('feelsLike').textContent = Math.round(main.feels_like) + '°C';
    document.getElementById('humidity').textContent = main.humidity + '%';
    document.getElementById('windSpeed').textContent = wind.speed + ' m/s';
    document.getElementById('pressure').textContent = main.pressure + ' hPa';
    document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1) + ' km';
    document.getElementById('weatherIcon').src = iconUrl;

    weatherContent.classList.remove('hidden');
}

/**
 * Display 5-day forecast
 */
function displayForecast(data) {
    const forecastList = data.list.filter((_, index) => index % 8 === 0); // Get one forecast per day
    forecastContainer.innerHTML = '';

    forecastList.slice(0, 5).forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="date">${formattedDate}</div>
            <div class="temp">${Math.round(forecast.main.temp)}°C</div>
            <img src="${iconUrl}" alt="${forecast.weather[0].description}">
            <div class="description">${forecast.weather[0].description}</div>
            <div class="humidity">💧 ${forecast.main.humidity}%</div>
        `;
        forecastContainer.appendChild(card);
    });
}

/**
 * Show loading spinner
 */
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        weatherContent.classList.add('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.classList.add('show');
    weatherContent.classList.add('hidden');
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.remove('show');
}

// Load default weather on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});
