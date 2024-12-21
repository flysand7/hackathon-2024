<script setup lang="ts">
import * as vue from 'vue'
import { ofetch } from "ofetch";

const faces: {[index: string]: string[]} = {
    'good': ["fa-solid", "fa-face-laugh", "text-5xl", "py-6 px-9"],
    'moderate': ["fa-solid fa-face-confused", "text-5xl", "py-6 px-9"],
    'ufsg': ["fa-solid fa-face-confounded", "text-5xl", "py-6 px-9"],
    'unhealthy': ["fa-solid fa-face-spiral-eyes", "text-5xl", "py-6 px-9"],
    'very_unhealthy': ["fa-solid fa-face-mask", "text-5xl", "py-6 px-9"],
    'hazardous': ["fa-solid fa-face-dizzy", "text-5xl", "py-6 px-9"],
}

const colors: {[index: string]: string[]} = {
    'good': ['card-bg-air-green', 'text-white rounded-lg p-2 shadow-lg'],
    'moderate': ['card-bg-air-yellow','text-white rounded-lg p-2 shadow-lg'],
    'ufsg': ['card-bg-air-orange','text-white rounded-lg p-4 shadow-lg'],
    'unhealthy': ['card-bg-air-red','text-white rounded-lg p-4 shadow-lg'],
    'very_unhealthy': ['card-bg-air-purple','text-white rounded-lg p-4 shadow-lg'],
    'hazardous': ['card-bg-air-maroon','text-white rounded-lg p-4 shadow-lg'],
}

const air = vue.reactive({
    aqi_us: 0,
    air_title: "",
})

ofetch('http://localhost:3000/air', { 
    method: 'GET'
})
.then((data) => {
    air.aqi_us = data.aqi_us;
    air.air_title = getStatusRus(data.aqi_us)
});

function getStatus() {
    let letter = "good";

    if(air.aqi_us > 50 && air.aqi_us < 101) letter = "moderate";
    if(air.aqi_us > 100 && air.aqi_us < 151) letter = "ufsg";
    if(air.aqi_us > 150 && air.aqi_us < 201) letter = "unhealthy";
    if(air.aqi_us > 200 && air.aqi_us < 301) letter = "very_unhealthy";
    if(air.aqi_us > 300) letter = "hazardous";

    return letter;
}

function getStatusRus(num: number) {
    let letter = "Хорошо";

    if(num > 50 && num < 101) letter = "Средне";
    if(num > 100 && num < 151) letter = "Плохо";
    if(num > 150 && num < 201) letter = "Очень плохо";
    if(num > 200 && num < 301) letter = "Ужасно";
    if(num > 300) letter = "Смертельно";

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
            <h1 class="text-lg font-bold">Качество воздуха</h1>
        </div>
    </div>
    <div class="flex justify-around mt-4">
        <div class="w-20 h-20 box-bg rounded-lg mt-2"><h1 class="text-4xl font-bold py-5 px-7">{{ air.aqi_us }}</h1></div>
        <div><h1 class="text-3xl font-bold py-5">{{ air.air_title }}</h1></div>
        <div><i :class="getIconClass"></i></div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.box-bg{
    background: linear-gradient(#0000005b, #0000001a);
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
