// weather.js
// Created by: Bruce Elgort / Spring 2023
// Student: 

// Function to get Latitude and Longitude from the OpenWeather API

// Declare Variables
const weatherContent = document.querySelector('#weather');
const API_KEY = 'YOUR OPENWEATHERAPI API TOKEN'; // Replace this with your API key

const getLatLon = (data,zipCode) => {
    // Check to see if an error occurred
    if (data.cod == '400' || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // Show the initially hidden div
        weatherContent.style.display = 'block';
        weatherContent.innerHTML = 'Please enter a valid Zip Code';
        return; // exit
    } else {
        // return an array of the latitude and longitude
        return [data.lat,data.lon];
    }
}

// Function to get the current weather given the data and zip code
const getCurrentWeather = (data) => {
    // console.log(data);
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '400' || data.cod == '404' || data.cod == '401') {
        // show the initially hidden div
        weatherContent.style.display = 'block';
        weatherContent.innerHTML = 'Please enter a valid Zip Code';
        return; // exit
    }

    let p = document.createElement('p') // create a p element
    let date = new Date(data.dt * 1000);
    let dateStr = date.toLocaleDateString('en-us');
    let timeStr = date.toLocaleTimeString('en-us');

    p.innerHTML = dateStr + ' - ' + timeStr + '<br>' + data.name + '<br>' + data.weather[0].description + '<br>' + data.main.temp; // content for p
    weatherContent.append(p); // add the p to the weatherContent to the DOM
    const icon = document.createElement('img'); // create img element for icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`); // set the src attribute using the data from the API
    weatherContent.append(icon); // add the icon to the DOM
    weatherContent.style.display = 'block';
};

// This function must be used to display the 5 day weather forecast
const getWeatherForecast = (data) => {
    // your code must go here and this line must be removed
};

document.querySelector('#getWeather').addEventListener('click', () => {
    weatherContent.innerHTML = ''; // clear out prior results
    let zipCode = document.querySelector('#zip').value;
        
    // First call the geolocation API to get the latitude and longitude of the zip code
    let url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // Call the getLatLon function which returns an array
            const geo = getLatLon(data,zipCode);
            
            // Now get current weather data
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&appid=${API_KEY}&units=imperial`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    // Call getWeather function
                    getCurrentWeather(data,geo[0],geo[1]);
                }).catch((e) => {
                console.log(`This error occurred: ${e}`);
                });           
        }).catch((e) => {
            console.log(`This error occurred: ${e}`);
        });
});