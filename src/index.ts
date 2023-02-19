import express from "express";
import config from "config";
import connect from "./utils/connect";

const port = config.get<number>('port')

const app = express();

app.listen(3000, async () => {
    console.log(`Listening on PORT: ${3000}`)
    await connect();
})