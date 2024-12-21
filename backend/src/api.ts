
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
    | "light"
    | "snow"
    | "snow"
    | "hail"
    | "thunderstorm"
    | "thunderstorm"
    | "thunderstorm";

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
    condition: string,
    wind_speed: number,
};
