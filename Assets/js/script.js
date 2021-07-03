// Grabbing ids of elements to insert data
var alarmSet = $('#timeset');
var currentW = $('#weather-tab');
var headerTitle = $('#subtitle');

// Var to display current date and time
var momentHead = moment().format("dddd, MMMM Do YYYY, h:mm A");
var momentAlarm = moment().format("h:mm A");
var momentWeathr = moment().format("dddd, MMMM Do YYYY");
console.log(momentHead);
console.log(momentAlarm);
console.log(momentWeathr);


// Weather API
var weatherKey = "259bd6474c5faa56865476f0e7617266";
var city = "houston";
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherKey + "";

{
    fetch(weatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
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
{/* <button class="button is-danger is-large is-fullwidth is-rounded is-focused">STOP ALARM</button> */}

// inserting moment in elements
headerTitle.text(momentHead);