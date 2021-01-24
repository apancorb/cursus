import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authentication/auth.js";
import homeRoute from "./routes/home/home.js";
import scheduleRoute from "./routes/schedule/schedule.js";
import reviewsRoute from "./routes/review/review.js";
import bannerRoute from "./routes/banner/banner.js";

/* APP CONFIG */
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

/* DB CONNECT */
mongoose.connect(process.env.CURSUSDB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

/* GLOBAL MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());
app.use(cors());

/* ROUTES MIDDLEWARES */
app.use("/api/user", authRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/home", homeRoute);
app.use("/api/banner", bannerRoute);

/* START WEB-SCRAPING INETERVAL */
/* import "./web-scraping/interval.js"; */

/* LISTENER */
app.listen(port, () => console.log(`listening on localhost: ${port}`));
