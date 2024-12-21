
import { ofetch } from "ofetch";

import * as api from "./api";
import { textChangeRangeIsUnchanged } from "typescript";


const lat_min = '43'
const lat_max='65'
const lon_min = '140'
const lon_max='147'

export const get_rec = async(event_id:string): Promise<api.SeisRec>=>{
    console.log(event_id);
    const ans = await ofetch(`https://api-test.geophystech.ru/api/v1/reports/${event_id}?include=nearestCity`);
    const dt:Date=new Date(Date.parse(ans['data']['locValues']['data']['event_datetime']));
    const a: api.SeisRec={
        id:ans['data']['id'],
        date:`${dt.getFullYear().toString()}-${(1+dt.getMonth()).toString()}-${dt.getDate().toString()}`,
        time:`${dt.getHours().toString()}:${dt.getMinutes().toString()}`,
        coords:{
            lat:ans['data']['locValues']['data']['lat'],
            lon:ans['data']['locValues']['data']['lon'],
        },
        mag:ans['data']['locValues']['data']['mag'],
        depth:ans['data']['locValues']['data']['depth'],
        distance:ans['data']['nearestCity']['data']['ep_dis'],
        location:ans['data']['nearestCity']['data']['settlement']['data']['translation']['data']['title'],
    }
    return a;
}

export const get_seis = async (count:number): Promise<Promise<api.SeisRec[]>>=>{//Promise<api.SeisInfo> => {
    const res = await ofetch(`https://api-test.geophystech.ru/api/v1/reports?lon_min=${lon_min}&lon_max=${lon_max}&lat_min=${lat_min}&lat_max=${lat_max}&id_only=1&limit=${count}`);
    const r:api.SeisRec[]=[];
    for(const iter in res['data']) {
        r.push(await get_rec(res['data'][iter].id));
    }
    return r;
}

