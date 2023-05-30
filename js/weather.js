// weather.js
// Created by: Bruce Elgort / Spring 2023
// Student: Emiri Sato

// Function to get Latitude and Longitude from the OpenWeather API

// Declare Variables
const weatherContent = document.querySelector('#weather');
const error = document.querySelector('.error');
const hourlyForecast = document.querySelector('#hourly_forecast');
const daysForecast = document.querySelector('#days_forecast');
const airCondition = document.querySelector('#airCondition');
const API_KEY = '1bdd854b1b73830a2830717e1c3b7c13'; // Replace this with your API key

const getLatLon = (data, zipCode) => {
    // Check to see if an error occurred
    if (data.cod == '400' || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // Show the initially hidden div
        error.style.display = 'block';
        error.innerHTML = '<div class="alert alert-sm alert-danger" role="alert">⚠️ Please enter a valid Zip Code</div>';

        return; // exit
    } else {
        // return an array of the latitude and longitude
        return [data.lat, data.lon];
    }
};

// Function to get the current weather given the data and zip code
const getCurrentWeather = (data) => {
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '400' || data.cod == '404' || data.cod == '401') {
        // show the initially hidden div
        error.style.display = 'block';
        error.innerHTML = 'Please enter a valid Zip Code';
        return; // exit
    } else {
        error.innerHTML = "";
    }

    let date_sunrise = new Date(data.sys.sunrise * 1000);
    let date_sunset = new Date(data.sys.sunset * 1000);
    let sunrise = date_sunrise.toLocaleTimeString('en-us').replace(/:\d+ /, ' ');
    let sunset = date_sunset.toLocaleTimeString('en-us').replace(/:\d+ /, ' ');
    console.log(sunrise);

    let location = document.querySelector('.d-location');
    location.innerHTML = `<p class="text-center mt-3 fs-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                            </svg> ${data.name},${data.sys.country}
                                        </p>`;

    // get current weather in #the weather
    weatherContent.innerHTML = `<div class="weather_form border rounded-5 p-3 mt-4">
                                <div class="row">
                                    <div class="col-6">
                                        <h1 class="display-1 text-center">${parseInt(data.main.temp)}°</h1>
                                        <h3 class="text-center">${data.weather[0].description}</h3>
                                        <h3 class="text-center">H:${data.main.temp_min}°&nbsp;&nbsp;&nbsp;L: ${data.main.temp_max}°</h3>
                                    </div>
                                    <div class="col-6 text-center">
                                    <span class="icon"></span>
                                    </div>
                                    <hr>
                                <div class="" id="airCondition">
                                    <p>Air Condition</p>
                                    <div class="d-flex justify-content-around flex-wrap">
                                        <div class="box">
                                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                        </svg> Sunrise: <strong>${sunrise}</strong></p>
                                        </div>
                                        <div class="box">
                                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                                        </svg> Sunset: <strong>${sunset}</strong></p>
                                        </div>
                                        <div class="box">
                                            <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16">
                                            <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
                                            </svg> Humidity: <strong>${data.main.humidity}%</strong></p>
                                        </div>
                                        <div class="box">
                                            <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                                                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                                                </svg> Feels Like: <strong>${Math.floor(data.main.feels_like)}°</strong></p>
                                        </div>
                                        <div class="box">
                                            <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                                                </svg> Wind Speed: <strong>${data.wind.speed}mph</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>`;


    const icon = document.createElement('img'); // create img element for icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`); // set the src attribute using the data from the API
    const weather_icon = document.querySelector('.icon');
    weather_icon.append(icon); // add the icon to the DOM
};

// This function must be used to display the 5 day weather forecast
const getWeatherForecast = (data) => {
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

    const hourlyForecastContainer = document.querySelector('#hourlyForecastContainer');
    hourlyForecast.classList = "border rounded-5 weather_form mt-4 p-4";

    // get hourly forecast
    document.querySelector('#hourlyForecastTitle').innerHTML = 'Hourly Forecast' + '<hr>';
    for (let i = 0; i < 6; i++) {
        let hourlyDateTime = new Date(data.list[i].dt * 1000);
        const dateStr = hourlyDateTime.toLocaleDateString('en-us');
        let hourStr = hourlyDateTime.toLocaleTimeString('en-us', { hour12: true, hour: 'numeric', minute: '2-digit' });
        const currentDate = new Date().toLocaleDateString('en-us');
        let hourlyWeatherText = document.querySelector('#hfText_' + [i + 1]);
        hourlyWeatherText.innerHTML = hourStr;
        // console.log(hourlyWeatherText);

        // handle with hf Icon
        let hfIcon = document.querySelector(`#hf-icon_${i + 1}`);
        hfIcon.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;

        // handle with hourly forecast Temp
        const hfTemp = document.querySelector(`#hf-temp-${i + 1}`);
        hfTemp.innerText = data.list[i].main.temp + '°';
        // console.log(hfTemp);

    }
    hourlyForecastContainer.innerHTML = hourlyHTML;
};


// handle with data-weather-data
const dailyWeatherData = document.querySelector('[data-weather-data]');
// function displays the daily weather forecast
const getDailyWeatherForecast = (data) => {
    // check to see if there is valid zip code
    if (data.cod == '400' || data.cod == '404' || data.cod == '401') {
        // show the initially hidden div
        error.style.display = 'block';
        error.innerHTML = 'Please enter a valid Zip Code';
        return; // exit
    } else {
        // default value
        error.innerHTML = "";
    }

    document.querySelector('#days_forecast_container').classList = "rounded-5 weather_form p-5";
    document.querySelector('#dailyForecastTitle').innerHTML = 'Weekly Forecast' + '<hr>';
    for (let i = 1; i < data.list.length; i++) {
        document.querySelector('.days_forecast_' + [i]).classList = "day border rounded mt-2 text-center fs-5";
        // handle with weekdays id
        const dailyForecastDays = document.querySelector('#dfText_' + [i]);
        dailyForecastDays.innerHTML = new Date(data.list[i].dt * 1000).toLocaleDateString('en-us', { weekday: 'long' });
        // handle with daily weather icon
        let dailyForecastIcon = document.querySelector('#dfIcon_' + [i]);
        dailyForecastIcon.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        dailyForecastIcon.alt = data.list[i].weather[0].description;
        // handle with daily weather temperature
        const dailyForecastMainTemp = document.querySelector('#dfTemp_' + [i]);
        dailyForecastMainTemp.innerText = data.list[i].temp.day + '°';
        // console.log(dailyForecastMainTemp);
    };
};

// function dailyForecastDetail() shows each date detail of weather forecast 
const dailyForecastDetail = (data, dayNumber) => {
    // clear the data
    // dailyWeatherData.innerHTML = '';
    //get array number from daily weather array
    const daysWeather = data.list[dayNumber];

    for (let i = 1; i < data.list.length; i++) {
        let dfDateTime = new Date(daysWeather.dt * 1000);
        const dfDate = dfDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', day: 'numeric', month: 'short' });
        const dfTempMax = Math.floor(daysWeather.temp.max);
        const dfTempMin = Math.floor(daysWeather.temp.min);
        const dfSunrise = new Date(daysWeather.sunrise * 1000).toLocaleTimeString('en-us', { hour12: true, hour: 'numeric', minute: '2-digit' });
        const dfSunset = new Date(daysWeather.sunset * 1000).toLocaleTimeString('en-us', { hour12: true, hour: 'numeric', minute: '2-digit' });
        const dfFeelsLike = Math.floor(daysWeather.feels_like.day);
        const dfHumidity = daysWeather.humidity;
        const dfWindSpeed = daysWeather.speed;
        dailyWeatherData.innerHTML = `<div class=" p-4 mt-4 rounded-5">
                                        <p class="fs-3">${dfDate}</p>
                                        <hr>
                                        <div class="d-flex justify-content-around flex-wrap">
                                            <div class="box">
                                                <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                                </svg> Sunrise: ${dfSunrise}</p>
                                            </div>
                                            <div class="box">
                                                <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                                                </svg> Sunset: ${dfSunset}</p>
                                            </div>
                                            <div class="box">
                                                <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16">
                                                <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
                                                </svg> Humidity: ${dfHumidity}%</p>
                                            </div>
                                            <div class="box">
                                                <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                                                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                                                    </svg> Feels Like: ${dfFeelsLike}°</p>
                                            </div>
                                            <div class="box">
                                                <p class=""><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                                                    </svg> Wind Speed: ${dfWindSpeed} mph</p >
                                            </div >
                                        </div >
                                    </div > `;
    }
};

let display = document.querySelector('.searchDisplay');
display.classList = "col-12 weather_form p-5";
// let currentTime = new Date().toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' });
// let displayTime = document.querySelector('#currentTime');
// displayTime.innerHTML = `<h1 class="display-1">${currentTime}</h1>`;
document.querySelector('#getWeather').addEventListener('click', () => {
    let zipCode = document.querySelector('#zip').value;
    display.classList = "col-12 col-lg-2 mt-4";
    document.querySelector('#display-1').classList = 'd-none';
    document.querySelector('#display-2').classList = 'd-none';

    // First call the geolocation API to get the latitude and longitude of the city name
    let url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // Call the getLatLon function which returns an array
            const geo = getLatLon(data, zipCode);

            // Now get current weather data
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&appid=${API_KEY}&units=imperial`;
            // url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    // Call getWeather function
                    getCurrentWeather(data, zipCode);
                }).catch((e) => {
                    console.log(`This error occurred: ${e}`);
                });

            // Now get 5 days/3hrs forecast data
            url = `http://api.openweathermap.org/data/2.5/forecast?lat=${geo[0]}&lon=${geo[1]}&appid=${API_KEY}&units=imperial`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    // call getWeatherForecast function
                    getWeatherForecast(data);
                }).catch((e) => {
                    console.log(`This error occurred: ${e}`);
                });

            // get daily forecast data
            url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geo[0]}&lon=${geo[1]}&cnt=8&appid=${API_KEY}&units=imperial`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // call getDailyWeatherForecast function
                    getDailyWeatherForecast(data);

                    const days = document.querySelectorAll("[data-weather-day]");
                    const weather_data = document.querySelector("[data-weather-data]");

                    days.forEach(day => {
                        day.addEventListener('click', () => {

                            // get the number attribute from data-day-number
                            const dayNumber = parseInt(day.getAttribute('data-weather-day-number'));
                            dailyForecastDetail(data, dayNumber);
                        });

                        day.addEventListener('mouseout', () => {
                            weather_data.style.background = "rgba(26, 25, 25, 0.716)";
                        });
                    });
                }).catch((e) => {
                    console.log(`This error occurred: ${e}`);
                });

        }).catch((e) => {
            console.log(`This error occurred: ${e}`);
        });
});
