
export type WeatherCondition =
    | "clear"
    | "partly"
    | "cloudy"
    | "overcast"
    | "light"
    | "rain"
    | "heavy"
    | "showers"
    | "wet"
    | "snow"
    | "hail"
    | "thunderstorm";

export type Condition_Map = {
    [index: string]: string,
};

export const condition_map: Condition_Map = {
    "clear":                  "ясно",
    "partly-cloudy":          "малооблачно",
    "cloudy":                 "облачно с прояснениями",
    "overcast":               "пасмурно",
    "light-rain":             "небольшой дождь",
    "rain":                   "дождь",
    "heavy-rain":             "сильный дождь",
    "showers":                "ливень",
    "wet-snow":               "дождь со снегом",
    "light-snow":             "небольшой снег",
    "snow":                   "снег",
    "snow-showers":           "снегопад",
    "hail":                   "град",
    "thunderstorm":           "гроза",
    "thunderstorm-with-rain": "дождь с грозой",
    "thunderstorm-with-hail": "гроза с градом",
}

export type WeatherInfo = {
    today: string,
    city: string,
    precipitation_mm: number,
    temperature: {
        sunrise: number,
        day: number,
        sunset: number,
        current: number,
    },
    feels_like: number,
    humidity: number,
    pressure_mm: number,
    condition_code: string,
    condition: string,
    wind_speed: number,
};

export type AtmosphereInfo = {
    aqi_us: number,
    main_us: string,
};
