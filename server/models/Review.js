import mongoose from "mongoose";

/* The Review Schema */
const reviewSchema = new mongoose.Schema({
  university: {
    type: String,
    required: true,
  },
  classID: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  profName: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  review: {
    madeBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    grade: {
      type: String,
    },
    gradeNum: {
      type: Number,
      default: null,
    },
    classExp: {
      type: String,
    },
    classExpNum: {
      type: Number,
      default: null,
    },
    profExp: {
      type: String,
    },
    profExpNum: {
      type: Number,
      default: null,
    },
  },
  comments: [],
  votesBy: [],
});

// choose UniversitiesDB
const myDB = mongoose.connection.useDb("CursusDB");
// Create the umd collection
const Review = myDB.model("Review", reviewSchema);
// export
export default Review;
