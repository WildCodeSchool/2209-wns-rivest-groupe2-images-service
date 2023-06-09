import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 18000;

app.use(express.json());

app.use(cors());

app.get("/images", (_, res) => {
  res.send("Hello World!");
});

app.use(router);

// Initialisation
const start = async (): Promise<void> => {
  app.listen(port, () => console.log(`Server started on ${port}`));
};

void start();
