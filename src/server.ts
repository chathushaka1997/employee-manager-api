import express from "express";
import databaseSetup from "./startup/database";
import dotenv from "dotenv";
import { initRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
const PORT: number | string = process.env.PORT || 3018;

databaseSetup();
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: "*",
    allowedHeaders: ["Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With", "Cache-Control"],
  })
);

initRoutes(app);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("--> HTTPS Server successfully started at port " + PORT);
});
