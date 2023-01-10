import axios from 'axios';
import $ from 'jquery';
import { now } from 'moment';
import { loader } from './loader';
import './component/search-bar.js';

function main() {
  const baseURL = 'https://api.openweathermap.org/data/2.5';
  const key = '3d714d62bd9af8812a0bd4845472789b';
  const searchElement = document.querySelector('search-bar');

  let weatherNow;

  function importAll(r) {
    const images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);
      return images;
    });
    return images;
  }

  importAll(require.context('../asset/img', false, /\.(png|jpe?g|svg)$/));

  let city = 'Jakarta';
  const getWeather = async () => {
    let lat;
    let lon;

    try {
      await axios.get(`${baseURL}/weather?q=${city}&appid=${key}`).then((res) => {
        lat = res.data.coord.lat;
        lon = res.data.coord.lon;
        weatherNow = res.data;
        console.log(weatherNow);
      });
    } catch (err) {
      const $loader = $('<div>').addClass('loader');
      $loader.html(loader);
      $('#main').empty().append($loader);
      const $weather = $('<div>').addClass('weather');
      $weather.html(`
      <div class="center">
        <p class="txt-not-found">
          Could not find this location, please try again
        </p>
      </div>`);
      setTimeout(function () {
        $('#main').empty().append($weather);
      }, 2000);
      return console.log(err);
    }

    try {
      await axios.get(`${baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${key}`).then((res) => renderWheater(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  function renderWheater(data) {
    const $loader = $('<div>').addClass('loader');
    $loader.html(loader);
    $('#main').empty().append($loader);

    const $weather = $('<div>').addClass('weather');
    $weather.html(`
    <div class='wrap-main'>
      <div class="flex-temp">
        <div class='box-temp'>
          <img class="img-icon" src=${`../asset/img/${weatherNow.weather[0].icon}.png`} alt="icon-weather"/>
          <h1 class="temp">
              ${celcius(weatherNow.main.temp)}<span class='cel'>° C</span> 
          </h1>
          <h3>${weatherNow.weather[0].main}</h3>
        </div>
        <div class='card-city'>
          <div class='location'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
              <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
            </svg>
            <h3>${data.city.name}, ${data.city.country}</h3>
          </div>
          <p class='date'></p>
          <div class='time-dt'>
            <span>${getDayName(Date(now), 'en-GB')}</span>
            <span class='time'></span>
          </div>
        </div>
      </div>
      <div class="hum-wind">
        <div class="temp-main wind">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <span>Wind ${weatherNow.wind.speed} m/s<span/>
        </div>
        <div class="temp-main humb">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
            <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
          </svg>
          <span>Hum ${weatherNow.main.humidity} %<span/>
        </div>
        <div class="temp-main">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
            <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>
            <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
          </svg>
          <span>Temp ${celcius(weatherNow.main.temp_min)}°C - ${celcius(weatherNow.main.temp_max)}°C<span/>
        </div>
      </div>
      <div class='flex-card'>
      ${data.list
        .filter((item, i) => i % 8 === 0)
        .map((item, i) => {
          return `<div class='box-nextday'>
            <h4 class='txt-temp'>${celcius(item.main.temp)}°C</h4>
            <img class='icon-card' src=${`../asset/img/${weatherNow.weather[0].icon}.png`} alt="icon-weather+${i}" />
            <p class='name-day'>${getDayName(item.dt_txt, 'en-GB').slice(0, 3)}</p>
          </div>`;
        })
        .slice(1, 5)
        .join('')}
      </div>
    </div>
    `);
    setTimeout(function () {
      $('#main').empty().append($weather);
    }, 2000);
  }

  function celcius(temp) {
    const celcius = temp - 273.15;
    return Math.floor(celcius);
  }

  function getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  const onButtonSearchClicked = () => {
    city = searchElement.value;
    getWeather();
  };

  searchElement.clickEvent = onButtonSearchClicked;

  getWeather();
}
export default main;
