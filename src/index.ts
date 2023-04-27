import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";

const app = express()
const port = process.env.PORT ?? 8000;
app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
    res.send("Hello World!");
});
app.use(router);

const start = async (): Promise<void> => {
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
};
void start();
  