// Grabbing ids of elements to insert data
var alarmSet = $('#pastAlarms');
var currentW = $('#weather-tab');
var headerTitle = $('#subtitle');
// modal ids
var amSet = $('#am');
var pmSet = $('#pm');
var addTBtn = $('#add-time');

// Var to display current date and time
var momentHead = moment().format("dddd, MMMM Do YYYY, h:mm A");
var momentAlarm = moment().format("h:mm A");
var momentWeathr = "dddd, MMMM Do YYYY";


// inserting moment in elements
headerTitle.text(momentHead);

// call-back  function to close modals
addTBtn.on('click', function () {

    var userHrs = $("#hours").val();
    var userMins = $('#minutes').val();
    var amOrpm = $('input[name="foobar"]:checked').parent('label').text();
    var setAP = userHrs + ":" + userMins + " " + amOrpm;
    localStorage.setItem('Alarm Set', setAP);
    for (var i = 0; i < localStorage.length; i++){
        var alarmLi = $('<div>');
        var alarmSpan = $('<span>');
        var alarmBtn = $('<button>');
        alarmLi.addClass('m-auto p-auto');
        alarmSpan.addClass('tag is-danger is-large');
        alarmBtn.addClass('delete');
        // alarmSpan.text('Delete');

        alarmLi.append(localStorage.getItem(localStorage.key(i)));
        alarmSpan.append(alarmBtn);
        alarmLi.append(alarmSpan);
        alarmSet.append(alarmLi);

    }
})




// Show City Modal
var modal2 = $("#city-modal");

$("#setCity").on("click", function () {
    modal2.show();
});
$(".delete").on("click", function () {
    modal2.hide();
});

// Function to search for city weather based on weather
$('#add-city').on('click', function () {
    localStorage.setItem('savedCity', $('#cityset').val());
    var currentCity = document.createElement("h3")
    currentCity.innerText = $('#cityset').val();
    var root = document.getElementById("weather-tab")
    root.appendChild(currentCity)
    setWeather($('#cityset').val())
})


//function to display the current weather and forecast
function render(data3) {
    var currentDate = document.createElement("span")
    currentDate.innerText = moment.unix(data3.date).format(momentWeathr)
    var currentWeather = document.createElement("p")
    currentWeather.innerText = "temp: " + data3.temp +" ˚F"
    var root = document.getElementById("weather-tab")
    root.appendChild(currentDate)
    root.appendChild(currentWeather)
}

var weatherKey = "259bd6474c5faa56865476f0e7617266";
//Weather API
function setWeather(x) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + x + "&units=imperial&appid=" + weatherKey + "";
    fetch(weatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var lon = data.coord.lon;
        var lat = data.coord.lat;
        console.log({lon, lat});
        var dataWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + weatherKey + "";
        fetch(dataWeatherAPI)
            .then(function (response) {
                return response.json();
            })
            
            .then(function (data2) {
                console.log(data2);
                
                for (let index = 0; index < 5; index++) {
                    var day = data2.daily[index];
                    var obj = {
                        temp: day.temp.day,
                        date: day.dt
                    }
                    render(obj)
                }
            })
    })
}

//Deezer API - Track
fetch("https://deezerdevs-deezer.p.rapidapi.com/track/1109737", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "Ut55yncQpLmshFtmNkz05x0K4gZ7p1lfFWzjsnuN3hmhNoFgqU",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
})
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    })

//Deezer API - Playlist
fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/1699332611", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "fc59fffe7fmshcb89d5a6a9a2b0dp186e8bjsna0d4d2f97c64",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
})
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    })
// code for stop alarm button
{/* <button class="button is-danger is-large is-fullwidth is-rounded is-focused">STOP ALARM</button> */ }

//Show Alarm Modal
var modal1 = $("#alarm-modal");

$("#setAlarm").on("click", function () {
    modal1.show();
});
$(".delete").on("click", function () {
    modal1.hide();
});



// Show About Us Modal
var modal3 = $("#about-us-modal");

$("#aboutUs").on("click", function(){
    modal3.show();
});
$(".delete").on("click", function(){
    modal3.hide();
});
