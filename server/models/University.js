import mongoose from "mongoose";

/* The umd (University of Maryland, College Park) schema for umd in UniversityDB */
const umdSchema = new mongoose.Schema({
  termID: {
    type: String,
    required: true,
  },
});

// choose UniversitiesDB
const myDB = mongoose.connection.useDb("UniversitiesDB");
// Create the umd collection
export const umd = myDB.model("umd", umdSchema);
