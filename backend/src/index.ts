
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import * as yapi from "./yapi";

new Elysia()
    .use(cors({}))
    .use(swagger({
        path: "/docs",
    }))
    .get("/", "Hello, world")
    .get("/weather", () => yapi.get_weather())
    .get("/test", () => {
        yapi.get_weather();
        return "";
    })
    .listen({
        hostname: "0.0.0.0",
        port: 3000,
    });

console.log(`Elysia running!`);
