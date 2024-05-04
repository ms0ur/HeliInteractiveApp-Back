import { createApp, createRouter, defineEventHandler } from "h3";

export const app = createApp();

const router = createRouter();
app.use(router);

router.get("/",
    defineEventHandler((event) => {
        return "HeliInteractiveApp Backend service 0.0.1 working here! Github: <a href='https://github.com/ms0ur/HeliInteractiveApp-Back'>https://github.com/ms0ur/HeliInteractiveApp-Back</a>"
    })
)