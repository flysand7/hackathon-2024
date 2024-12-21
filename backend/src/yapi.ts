
import { ofetch } from "ofetch";

import * as api from "./api";

const TOKEN = '4926fcc5-73a3-4b3c-88a3-16bdb2614b42';

const lat = '46.9641'
const lon = '142.7285'

const headers = {
    'X-Yandex-Weather-Key': TOKEN,
};

export const get_weather = async (): Promise<api.WeatherInfo> => {
    const res = await ofetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`, {
        headers,
    });
    const now = new Date(Date.now());
    const yyyy =  now.getFullYear().toString().padStart(4);
    const mm = (1+now.getMonth()).toString().padStart(2);
    const dd = now.getDate().toString().padStart(2);
    const date = `${yyyy}-${mm}-${dd}`;
    let found = false;
    let cur_fc;
    for(const fc of res.forecasts) {
        if(fc.date == date) {
            found = true;
            cur_fc = fc;
            break;
        }
    }
    const a: api.WeatherInfo = {
        today: date,
        city: "Южно-Сахалинск",
        pressure_mm: res.info.def_pressure_mm,
        condition: res.fact.condition,
        temperature: {
            current: res.fact.temp,
            sunrise: cur_fc.parts.morning.temp_avg,
            sunset: cur_fc.parts.evening.temp_avg,
            day: cur_fc.parts.day.temp_avg,
        },
        wind_speed: res.fact.wind_speed,
        precipitation_mm: cur_fc.parts.day_short.prec_mm,
        feels_like: cur_fc.parts.day_short.feels_like,
        humidity: cur_fc.parts.day_short.humidity,
    }
    console.log(a);
    return a;
}

type Info = {
    lat: number,
    lon: number,
    tzinfo: {},
    offset: number,
    name: string,
    abbr: string,
    dst: boolean,
    def_pressure_mm: number,
    def_pressure_pa: number,
    url: string,
};

type Fact = {
    temp: number,
    feels_like: number,
    temp_water: number,
    icon: string,
    condition: string,
    wind_speed: number,
    wind_gust: number,
    wind_dir: string,
    pressure_mm: number,
    pressure_pa: number,
    humidity: number,
    daytime: string,
    polar: boolean,
    season: string,
    obs_time: number,
    is_thunder: boolean,
    prec_type: number,
    prec_strength: number,
    cloudness: number,
    phenom_icon: string,
};

type Forecasts = {
    date: string,
    date_ts: number,
    week: number,
    rise_begin: string,
    sunrise: string,
    sunset: string,
    set_end: string,
    moon_code: number,
    moon_text: string,
    parts: {},
    temp_min: number,
    temp_max: number,
    teno_avg: number,
    feels_like: number,
    icon: string,
    condition: string,
    daytime: string,
    polar: boolean,
    wind_speed: number,
    wind_gust: number,
    wind_dir: string,
    pressure_mm: number,
    pressure_pa: number,
    humidity: number,
    soil_temp: number,
    soil_moisture: number,
    prec_mm: number,
    prec_preiod: number,
    prec_prob: number,
    prec_type: number,
    prec_strength: number,
    fresh_show_mm: number,
    cloudness: number,
    uv_index: number,
    day_short: {},
    temp: number,
    hours: {},
    hour: string,
    hour_ts: number,
};
