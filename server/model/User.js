import mongoose from "mongoose";

/* The user schema in CursusDB */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  university: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
