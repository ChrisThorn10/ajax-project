"use strict";

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    var http = new XMLHttpRequest();
  
    if(cityName.trim().length == 0){
        return alert("Please enter a city name.")
    }
    
    function reqListener () {
        console.log("response text: " + this.responseText);
    }
    
    http.addEventListener("load", reqListener);
    
    http.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&APPID=dfb42252b0b477f1f10fec5a3aab127c");
    
    http.onreadystatechange = function() {
        if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
            
        } else if(http.readyState === XMLHttpRequest.DONE){
            alert("Oops... something went wrong.")
        }
    };
    
        http.send();

    
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;
    
    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}