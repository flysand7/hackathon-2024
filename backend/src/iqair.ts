import { ofetch } from "ofetch";
import * as api from "./api";

const API_TOKEN = `f1e096fe-d257-433e-8657-4ef10a2ea01a`;

const lat = 46.9641;
const lon = 142.7285;

export const get_aq_data = async (): Promise<api.AtmosphereInfo> => {
    const res = await ofetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${API_TOKEN}`);
    const data = res.data.current.pollution;
    return {
        aqi_us: data.aqius,
        main_us: data.mainus,
    };
};
