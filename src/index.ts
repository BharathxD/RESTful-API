import express from "express";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./routes";
import dotenv from "dotenv";
import deserializeUser from "./middleware/deserializeUser";
dotenv.config();

const PORT = config.get<number>("port");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

app.listen(PORT, async () => {
  log.info(`Server Running on http://localhost:${PORT}`);
  await connect();
  routes(app);
});
