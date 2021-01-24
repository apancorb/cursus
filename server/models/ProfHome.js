import mongoose from "mongoose";

/* The prof home schema for users in CursusDB */
const profHomeSchema = new mongoose.Schema({
  university: {
    type: String,
  },
  profName: {
    type: String,
  },
  profExp: {
    type: Number,
    default: 0,
  },
});

// choose CursusDB
const myDB = mongoose.connection.useDb("CursusDB");
// Create the User collection (users)
const ProfHome = myDB.model("profHome", profHomeSchema);

export default ProfHome;
