// weather.js
// Created by: Bruce Elgort / Spring 2023
// Student: Emiri Sato

// Function to get Latitude and Longitude from the OpenWeather API

// Declare Variables
const weatherContent = document.querySelector('#weather');
const error = document.querySelector('.error');
const todayForecast = document.querySelector('#today_forecast');
const airCondition = document.querySelector('#airCondition');
const API_KEY = '1bdd854b1b73830a2830717e1c3b7c13'; // Replace this with your API key

const getLatLon = (data, zipCode) => {
    // Check to see if an error occurred
    if (data.cod == '400' || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // Show the initially hidden div
        error.style.display = 'block';
        error.innerHTML = '<div class="alert alert-sm alert-danger" role="alert">⚠️ Please enter a valid Zip Code</div>';
        // weatherContent.classList = 'alert alert-warning';

        return; // exit
    } else {
        // return an array of the latitude and longitude
        return [data.lat, data.lon];
    }
};

// Function to get the current weather given the data and zip code
const getCurrentWeather = (data) => {
    // console.log(data);
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '400' || data.cod == '404' || data.cod == '401') {
        // show the initially hidden div
        error.style.display = 'block';
        error.innerHTML = 'Please enter a valid Zip Code';
        // weatherContent.classList = 'alert alert-warning';
        return; // exit
    } else {
        error.innerHTML = "";
    }

    let p = document.createElement('p'); // create a p element
    let date = new Date(data.dt * 1000);
    let dateStr = date.toLocaleDateString('en-us');
    let timeStr = date.toLocaleTimeString('en-us');

    // p.innerHTML = dateStr + ' - ' + timeStr + '<br>' + data.name + '<br>' + data.weather[0].description + '<br>' + data.main.temp; // content for p
    p.innerHTML = `<div class="weather_form rounded-5 border p-3 text-center">
                    <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg> ${data.name}</h1>
                    <h1 class="display-1">${parseInt(data.main.temp)}℉<span class="icon"></span></h1>
                    <h3>${data.weather[0].description}</h3>
                    <h3>H:${data.main.temp_min}℉&nbsp;&nbsp;&nbsp;L: ${data.main.temp_max}℉</h3>
                    </div>`;

    airCondition.innerHTML = `<div class="rounded-5 p-3 mt-3 border weather_form">
                                <h3>Air Condition</h3>
                                <p class="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
                                <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
                                </svg>Humidity: ${data.main.humidity}%</p>
                                <p class="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>
                                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
                                </svg>Feels Like: ${data.main.feels_like}℉</p>
                                <p class="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
                                </svg>Wind Speed: ${data.wind.speed}mph</p>
                                </div>
                            </div>`;
    console.log(data);
    todayForecast.innerHTML = `<div class="border rounded-5 weather_form d-flex justify-content-between">
                                    <div class="text-center mx-3 mt-3">
                                        <p>${data.dt}</p>
                                        <p>☀️</p>
                                        <p>76℉</p>
                                    </div>
                                    <div class="text-center mx-3 mt-3">
                                        <p>6:00am</p>
                                        <p>☀️</p>
                                        <p>76℉</p>
                                    </div>
                                    <div class="text-center mx-3 mt-3">
                                        <p>6:00am</p>
                                        <p>☀️</p>
                                        <p>76℉</p>
                                    </div>
                                    <div class="text-center mx-3 mt-3">
                                        <p>6:00am</p>
                                        <p>☀️</p>
                                        <p>76℉</p>
                                    </div>
                                    <div class="text-center mx-3 mt-3">
                                        <p>6:00am</p>
                                        <p>☀️</p>
                                        <p>76℉</p>
                                    </div>
                                </div>`

    weatherContent.append(p); // add the p to the weatherContent to the DOM
    const icon = document.createElement('img'); // create img element for icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`); // set the src attribute using the data from the API
    icon.style.width = 40;
    icon.style.height = 40;
    const weather_icon = document.querySelector('.icon');
    weather_icon.append(icon); // add the icon to the DOM
    weatherContent.style.display = 'block';
};

// This function must be used to display the 5 day weather forecast
const getWeatherForecast = (data) => {
    console.log(data);
    // check to see if there is valid zip code
    if (data.cod == '400' || data.cod == '404' || data.cod == '401') {
        // show the initially hidden div
        error.style.display = 'block';
        error.innerHTML = 'Please enter a valid Zip Code';
        // weatherContent.classList = 'alert alert-warning';
        return; // exit
    } else {
        // default value
        error.innerHTML = "";
    }


};

document.querySelector('#getWeather').addEventListener('click', () => {
    weatherContent.innerHTML = ''; // clear out prior results
    airCondition.innerHTML = '';
    let zipCode = document.querySelector('#zip').value;

    // First call the geolocation API to get the latitude and longitude of the zip code
    let url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // Call the getLatLon function which returns an array
            const geo = getLatLon(data, zipCode);

            // Now get current weather data
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&appid=${API_KEY}&units=imperial`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    // Call getWeather function
                    getCurrentWeather(data, geo[0], geo[1]);
                }).catch((e) => {
                    console.log(`This error occurred: ${e}`);
                });
        }).catch((e) => {
            console.log(`This error occurred: ${e}`);
        });
});