const repoList = document.getElementById('weather-data');

const fetchButton = document.getElementById('fetch-button');

const temp = document.getElementById('temp');
const city = document.getElementById('wind');
const humid = document.getElementById('humidity');
const uvIndex = document.getElementById('uv-index');

// function getApi() {
//     const requestUrl = 'https://api.github.com/users/katerynatekmenzhi/repos';

//     fetch(requestUrl)
//         .then(function(res){
//             console.log(res);
//             return res.json();
//         })
//         .then(function (data) {
//             // looping through the data and inserting the repo name into the h3
//             console.l**
//             for (var i = 0; i < data.length; i++) {
//                 const listItem = document.createElement('li');
//                 listItem.innerHTML = data[i].name;
//                 repoList.appendChild(listItem);

//             } 
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// fetchButton.addEventListener('click', getApi);

// var users = fetch('https://api.github.com/users/katerynatekmenzhi/repos')
// .then(function(res){
//     logGitHubData(res);
// })

// var logGitHubData = function(myUserList) {
//     console.log(myUserList);
// }