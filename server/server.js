import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

/* APP CONFIG */
const app = express();
const port = process.env.PORT || 8000;
const mongo_conection_url = "";

/* MIDDLEWARES */
app.use(express.json());
app.use(cors());

/* API ENDPOINTS */
app.get("/", (req, res) => res.status(200).send("It is working!"));

/* START WEB-SCRAPING INETERVAL */
import "./web-scraping/interval.js";

/* LISTENER */
app.listen(port, () => console.log(`listening on localhost: ${port}`));
