console.log("Hello World! | Waking up H3 web server")
import { createApp } from "h3";
console.log("Waking Up Routes...");
import router from "./routes/router";
console.log("Routes Woken Up");
console.log("Creating App...");
export const app = createApp();

console.log("Appliening Routes...");
app.use(router);