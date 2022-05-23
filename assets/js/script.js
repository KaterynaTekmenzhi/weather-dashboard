const repoList = document.querySelector('h3');

const fetchButton = document.getElementById('fetch-button');

function getApi() {
    const requestUrl = '';

    fetch(requestUrl)
    .then(function(res){
        return res.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            const listItem = document.createElement('li');
            listItem.innerHTML = data[i].name;
            repoList.appendChild(listItem);
            
        } 
    });
}

fetchButton.addEventListener('click', getApi);