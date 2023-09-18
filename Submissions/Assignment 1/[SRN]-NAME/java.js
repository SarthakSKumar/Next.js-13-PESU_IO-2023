const apiKey = '4adba9352361d0eee8d0455dc495bd45';

const baseURL = 'https://openweathermap.org/';

//const location = 'Bangalore';

const apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q=Bangalore&appid=4adba9352361d0eee8d0455dc495bd45';


function getApiUrl(place) {
    return `${baseURL}/current?location=${encodeURIComponent(place)}&key=${apiKey}`
}


function setWeatherValue(place) {
    let url = getApiUrl(place);
    console.log(url);
    fetch(url)
    .then((resp) => {
        console.log(resp);
        if(!resp.ok) {
            throw new Error('Response was not ok');
        }
        return resp.json;
    })
    .then((data) => {
        let elem = document.getElementById('value');
        elem.innerText = data;
    });
}



alert('from file');