import mongoose from "mongoose";

/* The course home schema for users in CursusDB */
const classHomeSchema = new mongoose.Schema({
  university: {
    type: String,
  },
  classID: {
    type: String,
  },
  className: {
    type: String,
  },
  classExp: {
    type: Number,
    default: 0,
  },
});

// choose CursusDB
const myDB = mongoose.connection.useDb("CursusDB");
// Create the User collection (users)
const ClassHome = myDB.model("classHome", classHomeSchema);

export default ClassHome;
