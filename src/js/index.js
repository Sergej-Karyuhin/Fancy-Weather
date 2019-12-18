import '../css/style.css';
import { makeHTML } from './makeHTML';

makeHTML();

let lng, temperatureText;
let citySwap = 'Minsk';
let apparentTemperature, currentTemperature, day_1, day_2, day_3;
let weatherURL, coordinatesURL;

const language = document.querySelector('#language');
const buttonTemperature = document.querySelector('#temperature');
const at = document.querySelector('#apparent_temperature');
const ct = document.querySelector('#current_temperature');
const fdt = document.querySelector('#first_day_temperature');
const sdt = document.querySelector('#second_day_temperature');
const tdt = document.querySelector('#third_day_temperature');

if ((!localStorage.getItem('C_F')) && (!localStorage.getItem('En_Ru_Be'))) {
  lng = 0;
  language.textContent = 'En';
  temperatureText = 'C';
  buttonTemperature.textContent = 'C';
}
else {
  lng = localStorage.getItem('En_Ru_Be');
  language.textContent = localStorage.getItem('En_Ru_Be_buttonText');
  temperatureText = localStorage.getItem('C_F');
  buttonTemperature.textContent = localStorage.getItem('C_F_buttonText');
}

const lngURL = ['en', 'ru', 'be'];
const lngDate = ['en-US', 'ru-RU', 'ru-RU'];
const weatherParameters = [
  ['Perceived temperature: ', 'Ощущаемая температура: ', 'Якая адчуваецца тэмпература: '],
  ['Weather description: ', 'Описание погоды: ', 'Апісанне надвор`я: '],
  ['Wind speed (m/s): ', 'Скорость ветра (м/с): ', 'Хуткасць ветру (м/с): '],
  ['Humidity (%): ', 'Влажность (%): ', 'Вільготнасць (%): ']
];
const latLon = [
  ['Latitude: ', 'Широта: ', 'Шырата: '],
  ['Longitude: ', 'Долгота: ', 'Даўгата: ']
];
const dayOfTheWeek = [
  ['Sunday', 'Воскресенье', 'Нядзеля'],
  ['Monday', 'Понедельник', 'Панядзелак'],
  ['Tuesday', 'Вторник', 'Аўторак'],
  ['Wednesday', 'Среда', 'Серада'],
  ['Thursday', 'Четверг', 'Чацьвер'],
  ['Friday', 'Пятница', 'Пятніца'],
  ['Saturday', 'Суббота', 'Субота']
];



async function getWeatherForecast() {
  weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q='
               + citySwap + '&lang=' + lngURL[lng]
               + '&units=metric&APPID=45f7ade72f9c6ceca4d985235bbca756';
  const response = await fetch(weatherURL);
  const data = await response.json();

  const time = new Date();
  const timezone = (data.city.timezone / 3600) - 3;
  const hour = time.getHours() + timezone;
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const newTime = new Date(year, month, day, hour, minute, second);

  (async function () {
    let timeOfTheYear, timesOfDay;
    let weather = data.list[0].weather[0].main;

    if ([11, 0, 1].indexOf(month) != -1) {
      timeOfTheYear = 'Winter';
    }
    if ([2, 3, 4].indexOf(month) != -1) {
      timeOfTheYear = 'Spring';
    }
    if ([5, 6, 7].indexOf(month) != -1) {
      timeOfTheYear = 'Summer';
    }
    if ([8, 9, 10].indexOf(month) != -1) {
      timeOfTheYear = 'Autumn';
    }

    const hours = newTime.getHours();
    if ([0, 1, 2, 3, 4, 5].indexOf(hours) != -1) {
      timesOfDay = 'Night';
    }
    if ([6, 7, 8, 9, 10, 11].indexOf(hours) != -1) {
      timesOfDay = 'Morning';
    }
    if ([12, 13, 14, 15, 16, 17].indexOf(hours) != -1) {
      timesOfDay = 'Day';
    }
    if ([18, 19, 20, 21, 22, 23].indexOf(hours) != -1) {
      timesOfDay = 'Evening';
    }

    const imgURL = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=
    ${timeOfTheYear},${timesOfDay},${weather}
    &client_id=321dcdac4fb60fe899926e683d9c06f77e05446c388cc42b3c53caf63226b692`;

    (async function () {
      const wrapper = document.querySelector('#wrapper');

      const responseImg = await fetch(imgURL);
      const dataImg = await responseImg.json();

      wrapper.style.backgroundImage = `url('${dataImg.urls.regular}')`;
      wrapper.style.backgroundRepeat = 'no-repeat';
      wrapper.style.backgroundSize = 'cover';
    })();
  })();



  (function () {
    const current_time = document.querySelector('#current_time');
    let h = newTime.getHours();
    let m = newTime.getMinutes();

    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }

    current_time.textContent = h + ':' + m;
    const options = { weekday: 'short', month: 'long', day: 'numeric' };
    let localeDate = newTime.toLocaleString(lngDate[lng], options);
    localeDate = localeDate.charAt(0).toLocaleUpperCase() + localeDate.slice(1);
    current_date.textContent = localeDate;
  })();


  // Function block №2
  currentTemperature = Math.round(data.list[0].main.temp);
  document.querySelector('#current_temperature').textContent = currentTemperature;

  apparentTemperature = Math.round(data.list[0].main.temp_kf);
  document.querySelector('#apparent_temperature').textContent = weatherParameters[0][lng] + apparentTemperature;

  const weatherDescription = data.list[0].weather[0].description;
  document.querySelector('#weather_description').textContent = weatherParameters[1][lng] + weatherDescription;

  const windSpeed = Math.round(data.list[0].wind.speed);
  document.querySelector('#wind_speed').textContent = weatherParameters[2][lng] + windSpeed;

  const humidity = data.list[0].main.humidity;
  document.querySelector('#humidity').textContent = weatherParameters[3][lng] + humidity;

  const imgURL = 'http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
  document.querySelector('#weather_icon').src = imgURL;


  // Function block №3
  const dayOfTheWeek_index = new Date().getDay();
  const firstDay = document.querySelector('#first_day');
  const secondDay = document.querySelector('#second_day');
  const thirdDay = document.querySelector('#third_day');

  switch (dayOfTheWeek_index) {
    case 0:
      firstDay.textContent = dayOfTheWeek[0][lng];
      secondDay.textContent = dayOfTheWeek[1][lng];
      thirdDay.textContent = dayOfTheWeek[2][lng];
      break;
    case 1:
      firstDay.textContent = dayOfTheWeek[1][lng];
      secondDay.textContent = dayOfTheWeek[2][lng];
      thirdDay.textContent = dayOfTheWeek[3][lng];
      break;
    case 2:
      firstDay.textContent = dayOfTheWeek[2][lng];
      secondDay.textContent = dayOfTheWeek[3][lng];
      thirdDay.textContent = dayOfTheWeek[4][lng];
      break;
    case 3:
      firstDay.textContent = dayOfTheWeek[3][lng];
      secondDay.textContent = dayOfTheWeek[4][lng];
      thirdDay.textContent = dayOfTheWeek[5][lng];
      break;
    case 4:
      firstDay.textContent = dayOfTheWeek[4][lng];
      secondDay.textContent = dayOfTheWeek[5][lng];
      thirdDay.textContent = dayOfTheWeek[6][lng];
      break;
    case 5:
      firstDay.textContent = dayOfTheWeek[5][lng];
      secondDay.textContent = dayOfTheWeek[6][lng];
      thirdDay.textContent = dayOfTheWeek[0][lng];
      break;
    case 6:
      firstDay.textContent = dayOfTheWeek[6][lng];
      secondDay.textContent = dayOfTheWeek[0][lng];
      thirdDay.textContent = dayOfTheWeek[1][lng];
      break;
  }

  function getAverageTemperature(startPosition) {
    const start = startPosition;
    const end = start + 8;
    let acc = 0;
    for (let i = start; i < end; i++) {
      acc = acc + data.list[i].main.temp;
    }
    return Math.round(acc / 8);
  }

  day_1 = getAverageTemperature(0);
  day_2 = getAverageTemperature(8);
  day_3 = getAverageTemperature(16);

  document.querySelector('#first_day_temperature').textContent = day_1;
  document.querySelector('#second_day_temperature').textContent = day_2;
  document.querySelector('#third_day_temperature').textContent = day_3;

  const imgURL_day_1 = 'http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
  const imgURL_day_2 = 'http://openweathermap.org/img/wn/' + data.list[8].weather[0].icon + '@2x.png';
  const imgURL_day_3 = 'http://openweathermap.org/img/wn/' + data.list[16].weather[0].icon + '@2x.png';
  document.querySelector('#first_day_icon').src = imgURL_day_1;
  document.querySelector('#second_day_icon').src = imgURL_day_2;
  document.querySelector('#third_day_icon').src = imgURL_day_3;

  if (temperatureText === 'F') {
    at.textContent = 'Perceived temperature: ' + swap(apparentTemperature);
    ct.textContent = swap(currentTemperature);
    fdt.textContent = swap(day_1);
    sdt.textContent = swap(day_2);
    tdt.textContent = swap(day_3);
    buttonTemperature.textContent = 'F';
    temperatureText = 'F';
  }
}



async function getCoordinatesAndMap() {
  coordinatesURL = 'https://api.opencagedata.com/geocode/v1/json?q='
                 + citySwap + '&language=' + lngURL[lng]
                 + '&key=73a33fec465547f59ce28e6a365d2761&pretty=1&no_annotations=1';
  const response = await fetch(coordinatesURL);
  const data = await response.json();

  const city = (data.results[0].components.city == undefined)
            ? data.results[0].components.state
            : data.results[0].components.city;
  const country = data.results[0].components.country;

  const latitude = data.results[0].geometry.lat;
  const longitude = data.results[0].geometry.lng;
  document.querySelector('#latitude').textContent = latLon[0][lng] + latitude;
  document.querySelector('#longitude').textContent = latLon[1][lng] + longitude;

  mapboxgl.accessToken = "pk.eyJ1IjoiaXZhbjIyODMyMiIsImEiOiJjazNoOGlhcWMwOWFpM2JtdXhlbmZzczhxIn0.O8OTQ_I9qj1-fPUgNEKbUw";
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });

  document.querySelector('#city_country').textContent = city + ', ' + country;
}



function changeCity() {
  citySwap = document.querySelector('#search__input').value;
  getWeatherForecast();
  getCoordinatesAndMap();
}



function changeLanguage() {
  if (lng == 2) {
    lng = 0;
  }
  else {
    lng++;
  }

  switch (lng) {
    case 0:
      language.textContent = 'En';
      break;
    case 1:
      language.textContent = 'Ru';
      break;
    case 2:
      language.textContent = 'Be';
      break;
  }

  getWeatherForecast();
  getCoordinatesAndMap();
}



function swap(temperature) {
  return Math.round((9 / 5) * temperature + 32);
}



function swapTemperature() {
    if (temperatureText === 'C') {
      at.textContent = 'Perceived temperature: ' + swap(apparentTemperature);
      ct.textContent = swap(currentTemperature);
      fdt.textContent = swap(day_1);
      sdt.textContent = swap(day_2);
      tdt.textContent = swap(day_3);
      buttonTemperature.textContent = 'F';
      temperatureText = 'F';
    }
    else {
      at.textContent = 'Perceived temperature: ' + apparentTemperature;
      ct.textContent = currentTemperature;
      fdt.textContent = day_1;
      sdt.textContent = day_2;
      tdt.textContent = day_3;
      buttonTemperature.textContent = 'C';
      temperatureText = 'C';
    }
}



// function checkLettersKey(key) {
//   return (key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z');
// }



function findByVoice() {
  const input_search = document.querySelector('#search__input');
  const button_voice = document.querySelector('#voice__button');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  button_voice.addEventListener('click', () => {
    recognition.start();
  });
  recognition.addEventListener('result', (event) => {
    input_search.value = event.results[0][0].transcript;
  });
}




findByVoice();
getWeatherForecast();
getCoordinatesAndMap();



document.querySelector('#search__button').addEventListener('click', changeCity);
document.addEventListener('keydown', function(event) {
  if (event.code == 'Enter') {
    changeCity();
  }
});

document.querySelector('#backgroundImage').addEventListener('click', getWeatherForecast);
document.addEventListener('keydown', function(event) {
  if (event.code == 'Digit1') {
    getWeatherForecast();
  }
});

language.addEventListener('click', changeLanguage);
document.addEventListener('keydown', function(event) {
  if (event.code == 'Digit2') {
    changeLanguage();
  }
});

document.querySelector('#temperature').addEventListener('click', swapTemperature);
document.addEventListener('keydown', function(event) {
  if (event.code == 'Digit3') {
    swapTemperature();
  }
});

setInterval(() => getWeatherForecast(), 60000);

window.onbeforeunload = function() {
  localStorage.setItem('En_Ru_Be', lng);
  localStorage.setItem('En_Ru_Be_buttonText', language.textContent);
  localStorage.setItem('C_F', temperatureText);
  localStorage.setItem('C_F_buttonText', buttonTemperature.textContent);
};
