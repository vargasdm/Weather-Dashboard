var APIKey = "40a12dd5d21fb2676b3f9bbaa7760c97";
var cityName;
var searchHistory = document.getElementById('search-history');
var baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
var fiveDayBaseUrl = "http://api.openweathermap.org/data/2.5/forecast?"
var geocodeBaseUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
var searchArr = JSON.parse(localStorage.getItem("city-name")) || [];
var searchHistoryList = [];
var weatherData;
var currentWeatherEl = document.getElementById('current-weather');
var fiveDayForecastEl = document.getElementById("five-day");
var timeStamps = []
// will need to figure this out eventually
window.onload = renderSearchHistory();


// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    // need text area where I can input a city
    // need a click event listener for search button
        // need a function that will use the textarea input as parameters ( somhow convert the name into coordinates that can be used by the api ) for the fetch function
$("#search").click(function () {
    let searchText = $(this).siblings('textarea').val(); 
    search(searchText);
})

function search(text) {
    cityName = text; //$(this).siblings('textarea').val();  
    var queryURL = baseUrl + cityName + "&appid=" + APIKey + "&units=imperial";
    //    fetching data for the daily forecast
    fetch(queryURL, {})
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        weatherData = data;
        
        // fetching data to get eh lat and lon values for the searched city to be used in teh 5 day forecast fetch request
    var queryGeoUrl = geocodeBaseUrl + cityName + "&appid=" + APIKey
    fetch(queryGeoUrl, {})
        .then(function (response) {
            return response.json();
            })
        .then(function (data) {
            var geoData = data
            var geoLat = geoData[0].lat
            var geoLon = geoData[0].lon

            // fetching data for the 5 day forcast
            var queryFiveDayUrl = fiveDayBaseUrl + "lat=" + geoLat + "&lon=" + geoLon + "&appid=" + APIKey + "&units=imperial";
            console.log(queryFiveDayUrl);
        fetch(queryFiveDayUrl, {})
            .then(function (response) {
               return response.json();
                })
            .then(function (data) {
                console.log(data);
                
                // for loop to get the 12 pm weather indexes from data
            var fiveDayWeather = data.list;
            var timeStamps = fiveDayWeather.filter(onePm);
            function onePm(data) {
                var parsedDate = dayjs.unix(data.dt);
                return parsedDate.$H === 13;                   
            }
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
            
function displayCurrentWeather() {
    currentWeatherEl.innerHTML = "";
    var currentWeatherName = document.createElement('h2');
    currentWeatherName.textContent = weatherData.name;
    currentWeatherEl.appendChild(currentWeatherName);

    var date = dayjs.unix(weatherData.dt) //.format('MMM D, YYYY, hh:mm:ss a');
    var currentWeatherDate = document.createElement('p');
    currentWeatherDate.textContent = date;
    currentWeatherEl.appendChild(currentWeatherDate);
                
    var currentWeatherIcon = document.createElement('img');
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

function fiveDayForecast() {
    fiveDayForecastEl.innerHTML = ""
    for (var i = 0; i < timeStamps.length; i++) {
    var newDayEl = document.createElement('div');
    fiveDayForecastEl.appendChild(newDayEl);

    var newDate = document.createElement('h3');
    var newDayDate = dayjs.unix(timeStamps[i].dt).format('MMM D, YYYY, hh:mm:ss a')
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
        fiveDayForecast()
            });   
        });
    })
}


   // local storage
function appendLocalStorage() {
    if (cityName !== "") {
        if (searchArr.indexOf(cityName) !== -1) {
            return;
            }
        searchArr.push(cityName) 
        localStorage.setItem('city-name', JSON.stringify(searchArr))
        renderSearchHistory()
    }
}

function renderSearchHistory() {
    searchHistory.innerHTML = "";
        for (var i = 0; i < searchArr.length; i++) {
            localStorage.getItem("city-name")
            var searchHistoryItem = document.createElement('button');
            let city = searchArr[i];
            searchHistoryItem.textContent = city;
            searchHistoryItem.classList.add("search-history-button")
            searchHistoryItem.setAttribute("onclick", `search("${city}")`)
            searchHistoryItem.style.display = "block";
            searchHistory.appendChild(searchHistoryItem); 
        }
    };


          


            // need fetch function to grab current city name, date, icon that represents weather conditions (Im not sure if that is somehting included in the api or something I have to make), temp, humidity, and windspeed all based on teh input from the text area
                // this info will need to be rendered to speciofic div 
            
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
                // need another fetch function to grabs the 5-day forecast date, icon that represents weather conditions (Im not sure if that is somehting included in the api or something I have to make), temp, humidity, and windspeed all based on teh input from the text area
                // not sure if it will all go in one div or 5 different divs for each date
        // need function that will save the data that is fetched in other functions (current and 5 day forecast) to the local storage as an object or an object array????????? (with each  of teh fetch parameters as properties?????  if so then I need to strigify the data??????)
        // need a function that creates a button with the key of the stored city data displayed
            // might need to use for loop to create the buttons and render the names of the cities in previously stored object array ???????
    
    
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city  
            // need click event listener (similar to one in daily planner that runs no matter what button is clicked) the executes code when button from search history is clicked
        // need a function that pulls the data stored in the local storage back to thier appropriate divs


