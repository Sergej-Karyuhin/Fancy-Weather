function makeHTML() {
  const htmlCode = document.querySelector('#wrapper');
  htmlCode.insertAdjacentHTML('afterbegin', '<section><div class="button-container"><button id="backgroundImage" class="button-container__item"><i class="fas fa-retweet"></i></button><button id="language" class="button-container__item"></button><button id="temperature" class="button-container__item"></button><div class="search"><input id="search__input" class="search__input" placeholder="Enter a city in English"><button id="voice__button" class="voice__button"><i class="fas fa-microphone"></i></button><button id="search__button" class="search__button"><i class="fas fa-search"></i></button></div></div></section><div class="sections_container"><section class="function-block-2"><div><p id="city_country" class="city_country"></p><p id="current_date" class="current_date"></p><p id="current_time" class="current_time"></p><div class="temp-icon"><p id="current_temperature" class="current_temperature"></p><img id="weather_icon"></div><ul class="weather_description"><li id="weather_description"></li><li id="apparent_temperature"></li><li id="wind_speed"></li><li  id="humidity"></li></ul></div></section><div><section class="function-block-3"><div class="function-block-3__item"><p id="first_day"></p><div class="function-block-3__item__data"><div class="function-block-3__item__data__elem-1"><p id="first_day_temperature"></p></div><div><img id="first_day_icon"></div></div></div><div class="function-block-3__item"><p id="second_day"></p><div class="function-block-3__item__data"><div class="function-block-3__item__data__elem-1"><p  id="second_day_temperature"></p></div><div><img id="second_day_icon"></div></div></div><div class="function-block-3__item"><p id="third_day"></p><div class="function-block-3__item__data"><div class="function-block-3__item__data__elem-1"><p id="third_day_temperature"></p></div><div><img id="third_day_icon"></div></div></div></section><section><ul class="coordinates"><li id="latitude"></li><li id="longitude"></li></ul><div class="map" id="map"></div></section></div></div>');
}

module.exports = { makeHTML };