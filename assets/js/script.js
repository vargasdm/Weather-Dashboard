var APIKey = "40a12dd5d21fb2676b3f9bbaa7760c97";
var cityName;
var searchHistory = document.getElementById('search-history');
var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var fiveDayBaseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
var geocodeBaseUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var searchArr = JSON.parse(localStorage.getItem("city-name")) || [];
var searchHistoryList = [];
var weatherData;
var currentWeatherEl = document.getElementById('current-weather');
var fiveDayForecastEl = document.getElementById("five-day");
var timeStamps = [];

window.onload = renderSearchHistory();


$("#search").click(function () {
    // sets variable to be the what the user puts in the text area
    let searchText = $(this).siblings('textarea').val(); 
    search(searchText);
})

function search(text) {
    cityName = text;  
    // api fetch request url for the current weather api
    var queryURL = baseUrl + cityName + "&appid=" + APIKey + "&units=imperial";
    // fetching data for the daily forecast
    fetch(queryURL, {})
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        weatherData = data;
        
    // fetching data to for lat and lon values of the searched city to be used in the 5 day forecast fetch request url
    var queryGeoUrl = geocodeBaseUrl + cityName + "&appid=" + APIKey;
    fetch(queryGeoUrl, {})
        .then(function (response) {
            return response.json();
            })
        .then(function (data) {
            var geoData = data;
            var geoLat = geoData[0].lat;
            var geoLon = geoData[0].lon;

    // fetching data for the 5 day forcast
    var queryFiveDayUrl = fiveDayBaseUrl + "lat=" + geoLat + "&lon=" + geoLon + "&appid=" + APIKey + "&units=imperial";
    console.log(queryFiveDayUrl);
    fetch(queryFiveDayUrl, {})
        .then(function (response) {
            return response.json();
            })
        .then(function (data) {
            console.log(data);
                
    // for loop to get the 1 pm weather indexes from data
    var fiveDayWeather = data.list;
    // filters through the five day weather indexes using the onePm function
    var timeStamps = fiveDayWeather.filter(onePm);
    // function that returns values that are true for have a time of 1pm
    function onePm(data) {
        var parsedDate = dayjs.unix(data.dt);
        return parsedDate.$H === 13;                   
    }

// function that creates the elements and adds the appropriate data to them
function displayCurrentWeather() {
    // resets the current weather element
    currentWeatherEl.innerHTML = "";
    currentWeatherEl.classList.add("current-day");
    var currentWeatherName = document.createElement('h2');
    currentWeatherName.textContent = weatherData.name;
    currentWeatherEl.appendChild(currentWeatherName);

    // converts the dt property to a formatted date
    var date = dayjs.unix(weatherData.dt).format('MMM D, YYYY, hh:mm:ss a');
    var currentWeatherDate = document.createElement('p');
    currentWeatherDate.textContent = date;
    currentWeatherEl.appendChild(currentWeatherDate);
                
    var currentWeatherIcon = document.createElement('img');
    // stores the url for the corresponding icon code in a variable 
    var iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    currentWeatherIcon.setAttribute('src', iconUrl);
    currentWeatherEl.appendChild(currentWeatherIcon);

    var currentWeatherTemp = document.createElement('p');
    currentWeatherTemp.textContent = "Temp: " + weatherData.main.temp + "°F";
    currentWeatherEl.appendChild(currentWeatherTemp);

    var currentWeatherHum = document.createElement('p');
    currentWeatherHum.textContent = "Humidity: " + weatherData.main.humidity + "%";
    currentWeatherEl.appendChild(currentWeatherHum);

    var currentWeatherWind = document.createElement('p');
    currentWeatherWind.textContent = "Wind: " + weatherData.wind.speed + " MPH";
    currentWeatherEl.appendChild(currentWeatherWind); 
    }

// function that creates elements for each day and and the appropriate data to them
function fiveDayForecast() {
    fiveDayForecastEl.innerHTML = "";
    for (var i = 0; i < timeStamps.length; i++) {
    var newDayEl = document.createElement('div');
    newDayEl.classList.add("daily");
    fiveDayForecastEl.appendChild(newDayEl);

    var newDate = document.createElement('h3');
    var newDayDate = dayjs.unix(timeStamps[i].dt).format('MMM D, YYYY, hh:mm:ss a');
    newDate.textContent = newDayDate;
    newDayEl.appendChild(newDate);

    var newDayWeatherIcon = document.createElement('img');
    var forecastIconUrl = `https://openweathermap.org/img/wn/${timeStamps[i].weather[0].icon}.png`;
    newDayWeatherIcon.setAttribute('src', forecastIconUrl);
    newDayEl.appendChild(newDayWeatherIcon);

    var newDayTemp = document.createElement('p');
    newDayTemp.textContent = "Temp: " + timeStamps[i].main.temp + "°F";
    newDayEl.appendChild(newDayTemp);

    var newDayHum = document.createElement('p');
    newDayHum.textContent = "Humidity: " + weatherData.main.humidity + "%";
    newDayEl.appendChild(newDayHum);

    var newDayWind = document.createElement('p');
    newDayWind.textContent = "Wind: " + weatherData.wind.speed + " MPH";
    newDayEl.appendChild(newDayWind); 
    }
}
        appendLocalStorage();
        displayCurrentWeather();
        fiveDayForecast();
            });   
        });
    })
}


// function that creates an array in the local storage that holds thee city names searched
function appendLocalStorage() {
    if (cityName !== "") {
        if (searchArr.indexOf(cityName) !== -1) {
            return;
            }
        searchArr.push(cityName);
        localStorage.setItem('city-name', JSON.stringify(searchArr));
        renderSearchHistory();
    }
}

// function that creates button elements with the searched city names
function renderSearchHistory() {
    searchHistory.innerHTML = "";
        for (var i = 0; i < searchArr.length; i++) {
            localStorage.getItem("city-name");
            var searchHistoryItem = document.createElement('button');
            let city = searchArr[i];
            searchHistoryItem.textContent = city;
            searchHistoryItem.classList.add("search-history-button");
            // adds an onclick event listener to every button so when it tis clicked the stored name in the button is used to re search the weather data for that city
            searchHistoryItem.setAttribute("onclick", `search("${city}")`);
            searchHistoryItem.style.display = "block";
            searchHistory.appendChild(searchHistoryItem); 
        };
    };
