<script setup lang="ts">

import WeatherInfo from "./components/WeatherInfo.vue";
import AirInfo from "./components/AirInfo.vue";

</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="flex flex-col space-y-4 w-11/12 mt-4">
            <WeatherInfo />
            <AirInfo />
        </div>
    </div>
</template>

<style scoped>
</style>
