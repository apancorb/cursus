import express from "express";

import Review from "./../../models/Review.js";
import ClassHome from "./../../models/ClassHome.js";
import ProfHome from "./../../models/ProfHome.js";

import verify from "./../verifyToken.js";

const router = express.Router();

/* most wanted here */

/* sends all the top review */
router.get("/topReviews", verify, async (req, res) => {
  try {
    const docs = await Review.aggregate([
      { $match: { votes: { $exists: true } } },
      { $sort: { votes: -1 } },
    ]).limit(10);
    res.send(docs);
  } catch (err) {
    console.log("/topReviews error: ", err);
    res.status(400).send({ error: err });
  }
});

/* sends courses with high reviews */
router.get("/topCourses", verify, async (req, res) => {
  try {
    const docs = await ClassHome.find({ university: req.user.university })
      .sort({ classExp: -1 })
      .limit(10);
    res.send(docs);
  } catch (err) {
    console.log("/topCourses error: ", err);
    res.status(400).send({ error: err });
  }
});

/* sends top instructors */
router.get("/topProfs", verify, async (req, res) => {
  try {
    const docs = await ProfHome.find({ university: req.user.university })
      .sort({ profExp: -1 })
      .limit(10);
    res.send(docs);
  } catch (err) {
    console.log("/topProfs error: ", err);
    res.status(400).send({ error: err });
  }
});

export default router;
