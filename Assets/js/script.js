
// Weather API
var weatherKey = "259bd6474c5faa56865476f0e7617266";
var city = "houston";
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherKey + "";

fetch(weatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })