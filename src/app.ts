import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.ADMIN_PORT;
const dbPort = process.env.DB_PORT;

mongoose
  .connect(`mongodb://127.0.0.1:${dbPort}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes.api);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`=====================================`);
  console.log(`App ready at http://localhost:${port}`);
  console.log(`=====================================`);
});

export default app;
