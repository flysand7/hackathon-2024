<script setup lang="ts">
import * as vue from 'vue'
import { ofetch } from "ofetch";

const faces: {[index: string]: string[]} = {
    'good': ["fa-regular fa-face-laugh", "text-4xl", "ml2"],
    'moderate': ["fa-regular fa-face-confused", "text-4xl", "ml2"],
    'ufsg': ["fa-regular fa-face-confounded", "text-4xl", "ml2"],
    'unhealthy': ["fa-regular fa-face-spiral-eyes", "text-4xl", "ml2"],
    'very_unhealthy': ["fa-regular fa-face-mask", "text-4xl", "ml2"],
    'hazardous': ["fa-regular fa-face-dizzy", "text-4xl", "ml2"],
}

const colors: {[index: string]: string[]} = {
    'good': ['card-bg-air-green', 'text-white rounded-lg mt-4 shadow-lg'],
    'moderate': ['card-bg-air-yellow','text-white rounded-lg mt-4 shadow-lg'],
    'ufsg': ['card-bg-air-orange','text-white rounded-lg mt-4 shadow-lg'],
    'unhealthy': ['card-bg-air-red','text-white rounded-lg mt-4 shadow-lg'],
    'very_unhealthy': ['card-bg-air-purple','text-white rounded-lg mt-4 shadow-lg'],
    'hazardous': ['card-bg-air-maroon','text-white rounded-lg mt-4 shadow-lg'],
}

const air = vue.reactive({
    aqi_us: "",
})

ofetch('http://localhost:3000/air', { 
    method: 'GET'
})
.then((data) => {
    air.aqi_us = data.aqi_us;
});

function getStatus() {
    let letter = "good";

    if(air.aqi_us > 50 & air.aqi_us < 101) letter = "moderate";
    if(air.aqi_us > 100 & air.aqi_us < 151) letter = "ufsg";
    if(air.aqi_us > 150 & air.aqi_us < 201) letter = "unhealthy";
    if(air.aqi_us > 200 & air.aqi_us < 301) letter = "very_unhealthy";
    if(air.aqi_us > 300) letter = "hazardous";

    return letter;
}

const getIconClass = vue.computed(() => {
    return faces[getStatus()];
});

const getBgClass = vue.computed(() => {
    return colors[getStatus()];
});

</script>

<template>
  <div :class="getBgClass">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-lg font-bold" id="city"></h1>
            <p class="text-sm opacity-80" id="today"></p>
        </div>
    </div>
    <div class="flex items-center mt-4 space-x-6">
        <div class="text-6xl font-bold" id="temperature_current"></div>
        <div><i :class="getIconClass"></i></div>
        <div class="ml-2">
            <p class="text-lg" id="condition"></p>
            <p class="text-sm opacity-80" id="feels_like"></p>
        </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.card-bg-air-green {
    background: linear-gradient(#00bb00, #61da61);
}

.card-bg-air-yellow {
    background: linear-gradient(#fffb00, #fffc50);
}

.card-bg-air-orange {
    background: linear-gradient(#ff8000, #ffb062);
}

.card-bg-air-red {
    background: linear-gradient(#ff0000, #ff4848);
}

.card-bg-air-purple {
    background: linear-gradient(#a900bc, #f175ff);
}

.card-bg-air-maroon {
    background: linear-gradient(#5d0019, #a3052f);
}
</style>
