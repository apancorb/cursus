import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/authentication/auth.js";

/* APP CONFIG */
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

/* DB CONNECT */
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to the Data Base!")
);

/* MIDDLEWARES */
app.use(express.json());
app.use(cors());

/* ROUTES MIDDLEWARES */
app.use("/api/user", authRoute);

/* API ENDPOINTS */
app.get("/", (req, res) => res.status(200).send("It is working!"));

/* START WEB-SCRAPING INETERVAL */
/* import "./web-scraping/interval.js"; */

/* LISTENER */
app.listen(port, () => console.log(`listening on localhost: ${port}`));
