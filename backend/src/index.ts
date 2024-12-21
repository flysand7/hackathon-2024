
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import * as yapi from "./yapi";
import * as iqair from "./iqair";

const port = 3000;

new Elysia()
    .use(cors({}))
    .use(swagger({
        path: "/docs",
    }))
    .get("/", "Hello, world")
    .get("/weather", yapi.get_weather)
    .get("/air", iqair.get_aq_data)
    .listen({
        hostname: "0.0.0.0",
        port,
    });

console.log(`Server running at http://localhost:${port}!`);
