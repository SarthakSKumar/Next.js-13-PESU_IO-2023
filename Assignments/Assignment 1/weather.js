



    
 var temp=document.getElementById('temp');
 var cityName=document.getElementById('city');
 var humidity=document.getElementById('humidity');
 var windspeed=document.getElementById('windspeed');
 var searchinput=document.getElementById('searchinput');
 var searchbox=document.getElementById('searchbox');
 var body_img=document.getElementById('body_img');
 var body_data=document.getElementById('body_data');
 var detail=document.getElementById('detail');
 var error=document.getElementById('error');
    async function checkWeather(city) {
        let api_key='31ac46c6fd8736a0102813c64f14d4d8'
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
        let data= await response.json();
        



    temp.innerHTML=Math.floor(data.main.temp )+'°C';
    cityName.innerHTML=data.name;
    humidity.innerHTML=data.main.humidity +"%";
    windspeed.innerHTML=data.wind.speed+'km/h';
    console.log(data)


    
    if (data.weather[0].main=="Clouds") {
        body_img.src='clouds.png'
    }
     else if (data.weather[0].main=='Clear') {
        body_img.src='clear.png'
    }
    else if (data.weather[0].main=='Rain') {
        body_img.src='rain.png'
    }
    else if (data.weather[0].main=='Drizzle') {
        body_img.src='drizzle.png'
    }
    else if (data.weather[0].main=='Mist') {
        body_img.src='mist.png'
    }
    else if (data.weather[0].main=='Haze') {
        body_img.src='snow.png'
    }
     body_data.style.display='flex';
     detail.style.display='flex';
   

     }
     

      searchbox.addEventListener('click',()=>
      {
          let cityIn = searchinput.value;
          checkWeather(cityIn);
         
      })