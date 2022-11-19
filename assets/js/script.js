var APIKey = "02033f41b7ba4948cda8476745ac5025";
var cityName;
var searchHistory = document.getElementById('search-history');
var baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
var fiveDayBaseUrl = "api.openweathermap.org/data/2.5/forecast?"
var geocodeBaseUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
var searchArr = localStorage.getItem("city-name") || [];
var searchHistoryList = [];
var weatherData;
var currentWeatherEl = document.getElementById('current-weather');
var fiveDayForecastEl = document.getElementById("five-day");

// will need to figure this out eventually
// window.onload = appendLocalStorage();


// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    // need text area where I can input a city
    // need a click event listener for search button
        // need a function that will use the textarea input as parameters ( somhow convert the name into coordinates that can be used by the api ) for the fetch function
        $("#search").click(function (event) {
            cityName = $(this).siblings('textarea').val();  
            console.log(cityName);
            var queryURL = baseUrl + cityName + "&appid=" + APIKey + "&units=imperial";
        //    fetching data for the daily forecast
            fetch(queryURL, {})
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                console.log(data);
                console.log(data.weather[0].description);
                weatherData = data;
                console.log(weatherData);
                console.log(weatherData.name)
            
            // fetching data to get eh lat and lon values for the searched city to be used in teh 5 day forecast fetch request
                var queryGeoUrl = geocodeBaseUrl + cityName + "&appid=" + APIKey
            fetch(queryGeoUrl, {})
                .then(function (response) {
                    return response.json();
                    })
                    .then(function (data) {
                    console.log(data);
                var geoData = data
                console.log(geoData);
                var geoLat = geoData[0].lat
                console.log(geoLat);
                var geoLon = geoData[0].lon
                console.log(geoLon);

                // fetching data for the 5 day forcast
                var queryFiveDayUrl = fiveDayBaseUrl + "lat=" + geoLat + "&lon=" + geoLon + "&appid=" + APIKey + "&units=imperial";
                console.log(queryFiveDayUrl);
            fetch(queryFiveDayUrl, {})
                .then(function (response) {
                    return response.json();
                    })
                    .then(function (data) {
                    console.log(data);
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
                function displayCurrentWeather() {
                    currentWeatherEl.innerHTML = "";
                    console.log(currentWeatherName)
                    var currentWeatherName = document.createElement('h2');
                    currentWeatherName.textContent = weatherData.name;
                    console.log(currentWeatherName)
                    currentWeatherEl.appendChild(currentWeatherName);

                    console.log(weatherData.dt)
                    var date = dayjs.unix(weatherData.dt).format('MMM D, YYYY, hh:mm:ss a')
                    var currentWeatherDate = document.createElement('p');
                    currentWeatherDate.textContent = date;
                    currentWeatherEl.appendChild(currentWeatherDate);
                    
                    console.log(weatherData.weather[0].icon)
                    var currentWeatherIcon = document.createElement('img');
                    var iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
                    currentWeatherIcon.setAttribute('src', iconUrl);
                    currentWeatherEl.appendChild(currentWeatherIcon);

                    var currentWeatherTemp = document.createElement('p');
                    currentWeatherTemp.textContent = "Temp: " + weatherData.main.temp + "°F";
                    console.log(currentWeatherTemp)
                    currentWeatherEl.appendChild(currentWeatherTemp);

                    var currentWeatherHum = document.createElement('p');
                    currentWeatherHum.textContent = "Humidity: " + weatherData.main.humidity + "%";
                    console.log(currentWeatherHum)
                    currentWeatherEl.appendChild(currentWeatherHum);

                    var currentWeatherWind = document.createElement('p');
                    currentWeatherWind.textContent = "Wind: " + weatherData.wind.speed + " MPH";
                    console.log(currentWeatherWind)
                    currentWeatherEl.appendChild(currentWeatherWind); 
                }

                // function fiveDayForecast() {
                //     fiveDayForecastEl.innerHTML = ""
                //     var dayOneDiv = document.createElement('div');
                //     var  
                // }

            appendLocalStorage();
            displayCurrentWeather();
                });   
            });
        })
    })

   // local storage
   function appendLocalStorage() {
        if (cityName !== "") {
            console.log(searchArr);

            if (searchArr.indexOf(cityName) !== -1) {
                return;
             }
             searchArr.push(cityName) 
             localStorage.setItem('city-name', JSON.stringify(searchArr))
             renderSearchHistory()
        }
        
   }

    function renderSearchHistory() {
        searchHistoryList = searchArr;
        console.log(searchHistoryList);
        searchHistory.innerHTML = "";
        for (var i = searchHistoryList.length - 1; i >= 0; i--) {
            var searchHistoryItem = document.createElement('button');
            searchHistoryItem.textContent = searchHistoryList[i];
            searchHistoryItem.classList.add("search-history-button")
            searchHistoryItem.style.display = "block";
            console.log(searchHistory.textContent);
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


