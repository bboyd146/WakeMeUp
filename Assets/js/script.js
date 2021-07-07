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
var momentWeathr = moment().format("dddd, MMMM Do YYYY");


// inserting moment in elements
headerTitle.text(momentHead);

// call-back  function to close modals
addTBtn.on('click', function () {

    var userHrs = $("#hours").val();
    var userMins = $('#minutes').val();
    var amOrpm = $('input[name="foobar"]:checked').parent('label').text();
    var setAP = userHrs + ":" + userMins + " " + amOrpm;
    localStorage.setItem('Alarm Set', setAP);
})

// Function to search for city weather based on weather
$('#add-city').on('click', function () {

    // Weather API
    var weatherKey = "259bd6474c5faa56865476f0e7617266";
    var userCity = $('#cityset').val();
    localStorage.setItem('City', userCity);

    //function to display the current weather and forecast
    function render(data2) {

        var currentCity = document.createElement("h3")
        currentCity.innerText = userCity + " + "
        var currentDate = document.createElement("span")
        currentDate.innerText = moment().format(momentWeathr)
        currentCity.appendChild(currentDate)
        var currentWeather = document.createElement("p")
        currentWeather.innerText = "temp: " + data2.current.temp + " ˚F"
    }

    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + weatherKey + "";
    {
        fetch(weatherAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                console.log({ lon, lat });
                var dataWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + weatherKey + "";
                fetch(dataWeatherAPI)
                    .then(function (response) {
                        return response.json();
                    })

                    .then(function (data2) {
                        console.log(data2);
                        var arr = [];
                        for (let index = 1; index < 6; index++) {
                            var day = data2.daily[index];
                            var obj = {
                                temp: day.temp.day
                            }
                            arr.push(obj)
                            console.log({ obj });
                        }
                        render();
                    })
            })
    }
})
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

// Show City Modal
var modal2 = $("#city-modal");

$("#setCity").on("click", function () {
    modal2.show();
});
$(".delete").on("click", function () {
    modal2.hide();
});

// Function to save inputs to local storage and hide modal
function StoreAndHide() {
    localStorage.setItem('Alarm Time',)

}