function initScript() {
    const inputOp = document.getElementById('city-input');
    const searchOp = document.getElementById('search-button');
    const clearOp = document.getElementById('clear-history');
    const nameOp = document.getElementById('city-name');
    const currentPictureOp = document.getElementById('current-pic');
    const currentTempOp = document.getElementById('temperature');
    const currentHumidityOp = document.getElementById('humidity');
    const currentWindOp = document.getElementById('wind-speed');
    const currentUVOp = document.getElementById('UV-index');
    const historyOp = document.getElementById("history");
    let historyLog = JSON.parse(localStorage.getItem("history")) || [];
    console.log(historyLog);
    

    // Search button event listener

    const API_Key = "fd8dcdd160b0be1f8103a8b54146c418";

    function getWeather(citySearch) {
    // using saved city name, execute a current condition get request from open weather API
    
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + API_Key;
        axios.get(queryURL).then(function(response) {
            console.log(response);
// parse response to display current weather info
            const currentDate = new Date(response.data.dt * 1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameOp.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ")";
            // let currentPic = response.data.weather[0].main;
            currentPictureOp.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.weather[0].icon + ".png");
            currentPictureOp.setAttribute("alt", response.data.weather[0].description);
            currentTempOp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176°F";
            currentHumidityOp.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindOp.innerHTML = "Wind Speed: " + response.data.wind.speed + " mph";
        let latitude = response.data.coord.lat;
        let longitude = response.data.coord.lon;
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_Key + "&cnt=1";
        axios.get(uvURL).then(function(response) {
            let uvIndex = document.createElement("p");
            uvIndex.setAttribute("class", "badge badge-primary");
            uvIndex.innerHTML = response.data[0].value;
            currentUVOp.innerHTML = "UV Index: ";
            currentUVOp.append(uvIndex);
        });
    }).catch(function(error) {
        console.log(error);
    }
    );
    }
    // function to convert Kelvin to Fahrenheit
}

initScript();

