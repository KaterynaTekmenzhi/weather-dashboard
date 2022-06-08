const form = document.querySelector('#form');
const cityInput = document.getElementById('city');
const cityButton = document.getElementById('searchButton');
const button = document.getElementById('btn-div');
const dayTitle = document.getElementById('forecast');
const dayTemp = document.getElementById('dayTemp');
const dayWind = document.getElementById('dayWind');
const dayHumidity = document.getElementById('dayHumidity');
const exposure = document.getElementById('dayUV');
const currentDay = document.getElementById('date');
const weatherIcon = document.querySelector('.weather-icon');
const container = document.getElementById('card-container');
let previousSearches = JSON.parse(localStorage.getItem('search-history')) || [];
const deleteButton = document.getElementById('clear-btn');
const historyContainer = document.getElementById('un-list');

// set up time to display in  todaysWeather
const todaysDate = moment();
currentDay.textContent = todaysDate.format('LL');

// retrieval function for weather calls
function getWeather(city) {
    container.innerHTML = "";
    const API_Key = "fd8dcdd160b0be1f8103a8b54146c418";
    console.log(city);

    // queryURL for weather
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_Key;

    fetch(queryURL)
    .then(function(response) {
        if (response.ok) {
            return response.json().then(function (data) {
                console.log(data);

                // lattitude and longitude
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                console.log(lat);
                console.log(lon);

                // forecast values 
                currentDay.textContent = todaysDate.format('LL') + " in " + data.name;
                forecast.textContent = data.name + " " + todaysDate.format('LL');
                dayTemp.textContent = "Temperature: " + Math.floor((data.main.temp - 273.15) * 1.8 + 32) + "&deg;F";
                const {icon} = data.weather[0];
                weatherIcon.innerHTML = `<img src="./assets/icons/${icon}.png" alt="weather icon">`;
                dayWind.textContent = "Wind Speed: " + Math.floor(data.wind.speed * 2.2369) + "mph";
                dayHumidity.textContent = "Humidity: " + data.main.humidity + "%";

                // UV index
                const exposureQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + API_Key;

                fetch(exposureQuery)
                .then(function(response) {
                    if (response.ok) {
                        return response.json().then(function (data) {
                            console.log(data);
                            
                            exposure.textContent = "UV Index: " + data.daily[0].uvi;
                            if (data.daily[0].uvi < 3) {
                                exposure.className = "low";
                            } else if (data.daily[0].uvi < 6) {
                                exposure.className = "moderate";
                            } else if (data.daily[0].uvi < 8) {
                                exposure.className = "high";
                            } else if (data.daily[0].uvi < 11) {
                                exposure.className = "very-high";
                            } else {
                                exposure.className = "extreme";
                            }

                            // loop to populate 5 day forecast
                            for (let i = 1; i < 6; i++) {
                                const day = document.createElement('div');
                                day.className = "col bg-dark text-white rounded mx-2 mb-3 pb-2";
                                container.append(day);

                                const dayDate = document.createElement('h5');
                                dayDate.className = "text-center";
                                dayDate.textContent = moment().add(i, 'days').format('LL');

                                const dayTemp = document.createElement('p');
                                dayTemp.classList.add("card-text");
                                dayTemp.textContent = "Temperature: " + Math.floor((data.daily[i].temp.day - 273.15) * 1.8 + 32) + "&deg;F";

                                const dayWind = document.createElement('p');
                                dayWind.classList.add("card-text");
                                dayWind.textContent = "Wind Speed: " + Math.floor(data.daily[i].wind_speed * 2.2369) + "mph";

                                const dayHumidity = document.createElement('p');
                                dayHumidity.classList.add("card-text");
                                dayHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

                                day.append(dayDate, dayTemp, dayWind, dayHumidity);
                            }
                            
                        })
                    }
                })
            })
        }
    })
};

// event listener for search button
cityButton.addEventListener("click", renderCityWeather);




// render city weather 
function renderCityWeather(event) {event.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
    previousSearches.push(city);
    localStorage.setItem('search-history', JSON.stringify(previousSearches));
    historyContainer.innerHTML = '';

    getHistory();
}


function getHistory() {
    console.log(previousSearches);

    for (let i = 0; i < previousSearches.length; i++) {
        const li = document.createElement('button');
        li.classList.add("list-group-item");
        li.addEventListener("click", function(event) {
            getWeather(event.target.textContent);
        });
        li.textContent = previousSearches[i];
        historyContainer.append(li);
    }
}
getHistory();


// clear button
deleteButton.addEventListener("click", clearHistory);

function clearHistory() {
    localStorage.removeItem('search-history');
    previousSearches = [];
    historyContainer.innerHTML = '';
}
                            


