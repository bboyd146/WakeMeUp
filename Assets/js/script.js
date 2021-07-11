// Grabbing ids of elements to insert data
var alarmSet = $('#pastAlarms');
var currentW = $('#weather-tab');
var headerTitle = $('#subtitle');
var songEl = $('#music');
var removeBtn = $('#remove');
// modal ids
var amSet = $('#am');
var pmSet = $('#pm');
var addTBtn = $('#add-time');
var userHrs = $("#hours").val();
console.log(userHrs);
var userMins = $('#minutes').val();


// Var to display current date and time
var momentHead = moment().format("dddd, MMMM Do YYYY, h:mm A");
var momentAlarm = moment().format("h:mm A");
var momentWeathr = "dddd, MMMM Do YYYY";
var currentHr = parseInt(moment().format('h hh'));
console.log(currentHr);
var currentMn = parseInt(moment().format('m mm'));
console.log(currentMn);

// var a = parseInt(userHrs);
// var b = parseInt(userMins)
// console.log(a);
// console.log(b);



// inserting moment in elements
headerTitle.text(momentHead);

// var savedTimes = localStorage.getItem('Alarm Set');
// if (savedTimes !== null) {
// writeAlarms();
// }

displaySavedAlarms();
var setAP 
// call-back  function to close modals
addTBtn.on('click', writeAlarms)
function writeAlarms() {

    var userHrs = $("#hours").val();
    var userMins = $('#minutes').val();
    var amOrpm = $('input[name="foobar"]:checked').parent('label').text();
    setAP = userHrs + ":" + userMins + " " + amOrpm;
    localStorage.setItem('Alarm Set', setAP);
    // for (var i = 0; i < localStorage.length; i++){
    //     var alarmLi = $('<div>');
    //     var alarmSpan = $('<span>');
    //     var alarmBtn = $('<button>');
    //     alarmLi.addClass('m-auto p-auto');
    //     alarmSpan.addClass('tag is-danger is-large');
    //     alarmBtn.addClass('delete');
    //     // alarmSpan.text('Delete');

    // alarmLi.append(localStorage.getItem(localStorage.key(i)));
    // alarmSpan.append(alarmBtn);
    // alarmLi.append(alarmSpan);
    // alarmSet.append(alarmLi);
    displaySavedAlarms();
}

// function playpause() {
//     if (songEl.paused) {
//       songEl.play();
//     } else {
//       songEl.pause();
//     }
//   }
const alarmInterval = setInterval(function () {
    if (moment().isSame(setAP)) {
        $('#music').trigger('play');
    }
}, 60000)

function displaySavedAlarms() {
    for (var i = 0; i < localStorage.length; i++) {
        var alarmLi = $('<div>');
        var alarmSpan = $('<span>');
        var alarmBtn = $('<button>');
        alarmLi.addClass('m-auto p-auto');
        alarmSpan.addClass('tag is-danger is-large');
        alarmBtn.addClass('delete');
        alarmBtn.attr('id', 'remove');

        alarmLi.append(localStorage.getItem(localStorage.key(i)));
        alarmSpan.append(alarmBtn);
        alarmLi.append(alarmSpan);
        alarmSet.append(alarmLi);
    }

        var a = parseInt($("#minutes").val());
        var b = parseInt($("#hours").val())
        console.log($("#hours").val());
        console.log(a);
        console.log(b);

        if (b === currentHr && a === currentMn) {
            console.log('it worked');
            // songEl.play();
            $('#music').trigger('play');
            // $('#music').get(0).play();
            
        } 
    
}

// // This function is being called below and will run when the page loads.
// function init() {
//     // Get stored todos from localStorage
//     var storedTodos = localStorage.getItem(localStorage.key(i));

//     // If todos were retrieved from localStorage, update the todos array to it
//     if (storedTodos !== null) {
//       alarmSet = storedTodos;
//     }

//     // This is a helper function that will render todos to the DOM
//     renderTodos();
//   }



// Function to search for city weather based on weather
$('#add-city').on('click', function () {
    localStorage.setItem('savedCity', $('#cityset').val());
    var article = document.createElement("article")
    article.classList.add("tile", "is-child", "notification", "is-info")
    article.setAttribute("id", "weather-content")
    var currentCity = document.createElement("h3")
    currentCity.classList.add("title")
    currentCity.innerText = $('#cityset').val();
    var root = document.getElementById("weather-tab")
    root.appendChild(article)
    article.appendChild(currentCity)
    setWeather($('#cityset').val())
})


//function to display the current weather and forecast
function render(data3) {

    var currentDate = document.createElement("span")
    // currentDate.class = ;'ljn    
    currentDate.innerText = moment.unix(data3.date).format(momentWeathr)
    var currentWeather = document.createElement("p")
    currentWeather.innerText = "temp: " + data3.temp +" ˚F"
    var root = document.getElementById("weather-content")
    root.appendChild(currentDate)
    root.appendChild(currentWeather)
}
// dataArray=[x, y ,z, fdsf, gsd, gsd]
// dataArray.forEach(pppp => render(pppp))

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
            console.log({ lon, lat });
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
        console.log(data.tracks.data[0].preview)
        for (var i = 0; i < data.tracks.data.length; i++) {
            var src = data.tracks.data;
            var randSrc = Math.floor(Math.random() * src.length);
            var song = src[randSrc].preview;
            console.log(song)
            $('#src').attr('src', song);
            // console.log(src)
        }
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


// Show About Us Modal
var modal3 = $("#about-us-modal");

$("#aboutUs").on("click", function () {
    modal3.show();
});
$(".delete").on("click", function () {
    modal3.hide();
});

// Remove set alarm function
removeBtn.on('click', function () {
    $('m-auto p-auto').remove();
    console.log('clicked');
})




// Burger icon 
$('.navbar-burger').click(function() {
    $('#navbarMenuHeroA, .navbar-burger').toggleClass('is-active');
  });  