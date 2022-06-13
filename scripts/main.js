// Get user location data

const userContainer = document.querySelector('.hidden');

const successCallback = (position) => {
	const lat = position.coords.latitude.toFixed(6);
	const lon = position.coords.longitude.toFixed(6);
	userContainer.classList.remove('hidden');
	getWeatherByLonLat(lat, lon);
};

const errorCallback = (error) => {
	console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// -------------------------------------------

const form = document.forms['weather-search'];
const API_KEY  = '6e55d48adff6a34af29e6922dd82682b';
const defaultLocation = 'London';

// Getting elements from HTML for manual weather search app

const location = document.querySelector('.location');
const tempMin = document.querySelector('.min-temp');
const tempMax = document.querySelector('.max-temp');
const weatherSummary = document.querySelector('.weather-summary');
const currentTemp = document.querySelector('.current-temp');
const submitBtn = document.querySelector('.submit');

// Getting elements from HTML for automatic weather search app

const userLocation = document.querySelector('.user-location');
const userTempMin = document.querySelector('.user-min-temp');
const userTempMax = document.querySelector('.user-max-temp');
const userWeatherSummary = document.querySelector('.user-weather-summary');
const userCurrentTemp = document.querySelector('.user-current-temp');

// Getting location name from input box

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const userFormInput = form.elements[0].value;
	getWeather(userFormInput);
	form.elements[0].value = '';
});

// Getting weather as a default 

async function getWeatherAuto() {
	await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${API_KEY}`)
		.then((res) => {
		return res.json();
		})
		.then((data) => {
			const results = data;
			updateManualUI(results);
		})
};

getWeatherAuto();

// Getting Weather by Lon & Lat

async function getWeatherByLonLat (lat, lon) {
	await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
		.then((res) => {
		return res.json();
		})
		.then((data) => {
			const results = data;
			updateAutoUI(results);
		})
}


// Getting weather data by City Name


async function getWeather (userInput) {
	await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${API_KEY}`)
		.then((res) => {
		return res.json();
		})
		.then((data) => {
			const results = data;
			updateManualUI(results);
		})
}

// Updating the UI

async function updateManualUI(data) {
	location.innerHTML = `${data.name}`;
	currentTemp.innerHTML = `${data.main.temp} &deg;`;
	tempMin.innerHTML = `${data.main.temp_min} &deg;`;
	tempMax.innerHTML = `${data.main.temp_max} &deg;`;
	weatherSummary.textContent = `${data.weather[0].main}`;
}

// Updating the automated UI

async function updateAutoUI(data) {
	userLocation.innerHTML = `${data.name} - Current Location`;
	userCurrentTemp.innerHTML = `${data.main.temp} &deg;`;
	userTempMin.innerHTML = `${data.main.temp_min} &deg;`;
	userTempMax.innerHTML = `${data.main.temp_max} &deg;`;
	userWeatherSummary.textContent = `${data.weather[0].main}`;
}






