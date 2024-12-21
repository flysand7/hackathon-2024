<script setup lang="ts">
import * as vue from 'vue'
import { ofetch } from "ofetch";

const weather_icons = {
    'clear': 'fas fa-sun',
    'party-cloudy': 'fa-solid fa-cloud-sun',
    'cloudy':'fa-solid fa-cloud',
    'overcast':'fa-solid-sleet',
    'light-rain':'fa-solid-drizzle',
    'rain':'fa-solid fa-cloud-rain',
    'heavy-rain':'fa-solid fa-cloud-showers-heavy ',
    'showers':'fa-solid fa-cloud-showers',
    'wet-snow':'fa-solid fa-snowflake-droplets',
    'light-snow':'fa-solid fa-cloud-snow',
    'snow':'fa-solid fa-cloud-snow',
    'hail':'fa-solid fa-cloud-hail',
    'thunderstorm':'fa-solid fa-bolt',
    'thunderstorm-with-rain':'fa-solid-bolt',
    'thunderstorm-with-hail':'fa-solid-hail-mixed'
}

const monthNames = [
    "Января", "Февраля", "Марта",
    "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября",
    "Октября", "Ноября", "Декабря",
];

const weatherInfo = vue.reactive({
  city: "",
  today:  "",
  condition: "",
  temperature: {
    current: "",
    day: "",
    sunset: "",
    sunrise: "",
  },
  feels_like: "",
  wind_speed: "",
  humidity: "",
  pressure_mm: "",
})

ofetch('http://localhost:3000/weather', { 
    method: 'GET'
})
.then((data) => {
    let date = new Date(data.today);
    const condition =
        data.condition.charAt(0).toUpperCase()
        + data.condition.slice(1)
    weatherInfo.city = data.city;
    weatherInfo.today = "Сейчас " + date.getDate() + " " + monthNames[date.getMonth()];
    weatherInfo.condition = condition;
    weatherInfo.temperature.current = data.temperature.current + "°C"; 
    weatherInfo.temperature.day = data.temperature.day + "°C"; 
    weatherInfo.temperature.sunset = data.temperature.sunset + "°C"; 
    weatherInfo.temperature.sunrise = data.temperature.sunrise + "°C"; 
    weatherInfo.feels_like = "Ощущается как " + data.feels_like + "°C";
    weatherInfo.wind_speed = data.wind_speed + " м/с, С"; 
    weatherInfo.humidity = data.humidity + "%"; 
    weatherInfo.pressure_mm = data.pressure_mm + " мм рт. ст."; 
});

</script>

<template>
  <div class="card-bg text-white rounded-lg mt-4 shadow-lg">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-lg font-bold" id="city">{{weatherInfo.city}}</h1>
            <p class="text-sm opacity-80" id="today">{{weatherInfo.today}}</p>
        </div>
    </div>
    <div class="flex items-center mt-4 space-x-6">
        <div class="text-6xl font-bold" id="temperature_current">{{weatherInfo.temperature.current}}</div>
        <div><i class="{{weather_icons[weatherInfo.condition]}} text-4xl ml-2"></i></div>
        <div class="ml-2">
            <p class="text-lg" id="condition">{{weatherInfo.condition}}</p>
            <p class="text-sm opacity-80" id="feels_like">{{weatherInfo.feels_like}}</p>
        </div>
    </div>
    <div class="flex justify-around items-center mt-4">
        <div class="flex items-center">
            <i class="fas fa-wind"></i>
            <p class="ml-1" id="wind_speed">{{weatherInfo.wind_speed}}</p>
        </div>
        <div class="flex items-center">
            <i class="fas fa-tint"></i>
            <p class="ml-1" id="humidity">{{weatherInfo.humidity}}</p>
        </div>
        <div class="flex items-center">
            <i class="fas fa-tachometer-alt"></i>
            <p class="ml-1" id="pressure_mm">{{weatherInfo.pressure_mm}}</p>
        </div>
    </div>
    <div class="flex spa"></div>
    <div class="flex justify-around items-center mt-4 space-x-2 overflow-x-auto">
        <div class="text-center">
            <div>Утром</div>
            <i class="fas fa-cloud-sun"></i>
            <div id ="temperature_sunrise">{{weatherInfo.temperature.sunrise}}</div>
        </div>
        <div class="text-center">
            <div>Днём</div>
            <i class="fas fa-cloud-sun"></i>
            <div id = "temperature_day">{{weatherInfo.temperature.day}}</div>
        </div>
        <div class="text-center">
            <div>Вечером</div>
            <i class="fas fa-cloud-sun"></i>
            <div id="temperature_sunset">{{weatherInfo.temperature.sunset}}</div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
