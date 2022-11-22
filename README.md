# Weather-Dashboard

## Description

The motivation for this project was to assist people who are traveling. The user will be able to check the curent and future weather fot the city that they are travelling to. I wanted to be able to give the user up-to-date weather information about the current and 5-day weather forecast for the city that they search, and allow them to revisit weather information from cities that they have already searched. 

During this project I learned: 
- how to link jquery, dayjs, libraries in html
- how to format, set, and show the time useing dayjs
- how to add classes to html elements using jquery methods
- how to create a click eventListener using jquery methods
- how to alter html elements in JS using .setAttribute method
- how to use "this" key reference word
- how to store data in the local storage and then retreive and render that data later
- how to use an .onlaod method to run functions when I reload my page
- how to use the .filter method
- how to retrieve data using an api feth request
- how to traverse the data that is fetched and manipulate it in JS
- read documentation

![Screenshot](https://github.com/vargasdm/Weather-Dashboard/blob/main/assets/images/weather-dashboard.jpg)

## Table of Contents

- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

##Usage

When the page is opened, you are presented with a text area and a search button, where you will input the city of your choice. After the user inputs a city and click search, the current weather data, as well as the 5-day weather forecast data will display, This includes: city name, date, time, icon that represents the current weather, temperature, humidy, and wind speed. At the same time, the searched city name will be stored in local storage and a button will be created with that city's name under the search history section of the page. When the user clicks a button in the search history section with a searched cities name, they will be shown the updated weather information.


There is no istallation required. The project can be viewed at through the following link: https://github.com/vargasdm/Weather-Dashboard.
The GitHub repository can be viewed at https://vargasdm.github.io/Weather-Dashboard/

![Screenshot](https://github.com/vargasdm/Weather-Dashboard/blob/main/assets/images/weather-dashboard-search.jpg)

## Credits

I followed these links and tutorials in the completion of this project:

- https://www.w3schools.com/jsref/prop_html_style.asp
- https://www.javatpoint.com/javascript-setattribute#:~:text=The%20setAttribute()%20method%20is,update%20the%20existing%20attribute's%20value.
- https://www.w3schools.com/howto/howto_css_two_columns.asp
- https://www.w3schools.com/css/css3_gradients.asp
- https://openweathermap.org/api/geocoding-api
- https://openweathermap.org/forecast5
- https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
- https://day.js.org/docs/en/display/format
- https://openweathermap.org/weather-conditions#How-to-get-icon-URL
- https://dev.to/dcodeyt/append-multiple-elements-using-append-302h#:~:text=on%20Parent%20Nodes-,append(),nodes%20to%20a%20parent%20node.&text=As%20you%20can%20see%2C%20you,append%20everything%20to%20the%20parent.
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
- https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
- https://www.w3schools.com/howto/howto_js_add_class.asp

## License

No licenses were used during this project.



