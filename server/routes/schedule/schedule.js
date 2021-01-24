import express from "express";

import { umd } from "../../models/University.js";

import verify from "./../verifyToken.js";

const router = express.Router();

/* sends all the termsID for a specific university */
router.get("/terms", verify, async (req, res) => {
  try {
    let terms = null;
    if (req.user.university === "umd") {
      terms = await umd.find({}, { termID: 1, termName: 1 });
    }
    res.status(200).send(terms);
  } catch (err) {
    console.log("/terms error: ", err);
    res.status(404).send({ error: err });
  }
});

/* sends all the collegesID and collegeNames for a specific university and termID */
router.get("/colleges", verify, async (req, res) => {
  try {
    let colleges = null;
    if (req.user.university === "umd") {
      colleges = await umd.find(
        { termID: req.query.termID },
        { "colleges.collegeID": 1, "colleges.collegeName": 1 }
      );
    }
    res.status(200).send(colleges);
  } catch (err) {
    console.log("/colleges error: ", err);
    res.status(404).send({ error: err });
  }
});

/* sends all the classes for a specific university, termID, collegeID */
router.get("/classes", verify, async (req, res) => {
  try {
    let classes = null;
    if (req.user.university === "umd") {
      classes = await umd.find(
        {
          termID: req.query.termID,
          "colleges.collegeID": req.query.collegeID,
        },
        { "colleges.classes.$": 1 }
      );
    }
    res.status(200).send(classes);
  } catch (err) {
    console.log("/classes error: ", err);
    res.status(400).send({ error: err });
  }
});

export default router;
