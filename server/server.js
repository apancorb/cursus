import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import Cards from "./dbCards.js";

/* APP CONFIG */
const app = express();
const port = process.env.PORT || 8000;
const mongo_conection_url = "";

/* MIDDLEWARES */
app.use(bodyParser.json());
app.use(cors());

/* console.log(process.env.DB_CONNECTION); */
/* DB CONFIG */
/* mongoose.connect(mongo_conection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}); */

/* API ENDPOINTS */
app.get("/", (req, res) => res.status(200).send("It is working!"));

/* app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;
    console.log(dbCard)

    Cards.create(dbCard, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            // 500 => internal status error
        } else {
            res.status(201).send(data);
            // 201 => succesfully created since this is a post call
        }
    });
}); */

/* START WEB-SCRAPING INETRVAL */
import "./web-scraping/interval.js";

/* LISTENER */
app.listen(port, () => console.log(`listening on localhost: ${port}`));
