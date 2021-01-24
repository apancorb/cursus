import mongoose from "mongoose";

/* The umd (University of Maryland, College Park) schema for umd in UniversityDB */
const bannerSchema = new mongoose.Schema({
  university: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  imageDescription: {
    type: String,
    required: true,
  },
});

// choose CursusDB
const myDB = mongoose.connection.useDb("CursusDB");
// Create the umd collection
const Banner = myDB.model("Banner", bannerSchema);

export default Banner;
