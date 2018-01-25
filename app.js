"use strict";

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
    var cityName = searchCity.value;
    var getWeatherData = new XMLHttpRequest();
    
    if(cityName.trim().length == 0){
        return alert("Please enter a city name.")
    }
    
    function reqListener () {
        console.log(this.responseText);
    }
    
    getWeatherData.addEventListener("load", reqListener);
    
    getWeatherData.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=dfb42252b0b477f1f10fec5a3aab127c");
    
    getWeatherData.onreadystatechange = function() {
        if(getWeatherData.readyState === XMLHttpRequest.DONE && getWeatherData.status === 200) {
            var data = JSON.parse(getWeatherData.responseText);
            console.log("data: " + JSON.stringify(data));
        }   else if(getWeatherData.readyState === XMLHttpRequest.DONE){
            alert("Oops... something went wrong.")
        }
    };
    getWeatherData.send();
    
    displayWeather();
    
}

function displayWeather() {
    alert("in displayWeather");
}