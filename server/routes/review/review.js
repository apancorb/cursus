import express from "express";

import Review from "./../../models/Review.js";

import verify from "./../verifyToken.js";
import { classHomeUpdate, profHomeUpdate } from "./homeUpdate.js";

const router = express.Router();

/* sends a list with all the profs that have reviews */
router.get("/getProfs", verify, async (req, res) => {
  try {
    const getProfs = await Review.find({
      university: req.user.university,
    }).distinct("profName");
    if (!getProfs)
      res.status(404).send({ message: "No proffessors have reviews" });
    res.status(200).send(getProfs);
  } catch (err) {
    console.log("/getProfs error: ", err);
    res.status(400).send({ error: err });
  }
});

/* sends a list with all the classIDs that have reviews */
router.get("/getClassID", verify, async (req, res) => {
  try {
    const getClassID = await Review.find({
      university: req.user.university,
    }).distinct("classID");
    if (!getClassID)
      res.status(404).send({ message: "No classID have reviews" });
    res.status(200).send(getClassID);
  } catch (err) {
    console.log("/getClassID error: ", err);
    res.status(400).send({ error: err });
  }
});

/* sends a list with all the classNames that have reviews */
router.get("/getClassName", verify, async (req, res) => {
  try {
    const getClassName = await Review.find({
      university: req.user.university,
    }).distinct("className");
    if (!getClassName)
      res.status(404).send({ message: "No className have reviews" });
    res.status(200).send(getClassName);
  } catch (err) {
    console.log("/getClassName error: ", err);
    res.status(400).send({ error: err });
  }
});

/* returns all the avilable reviews for a professor */
router.get("/prof", verify, async (req, res) => {
  try {
    // get all the reviews for that proffessor
    const profs = await Review.find({
      university: req.user.university,
    }).find({ profName: req.query.param });
    // if there are no reviews for the proffessor send an error
    if (!profs)
      res.status(404).send({
        message: `No reviews found for this proffesor: ${req.query.param}`,
      });
    res.status(200).send(profs);
  } catch (err) {
    console.log("/profs error: ", err);
    res.status(400).send({ error: err });
  }
});

/* returns all the avilable reviews for a class */
router.get("/classID", verify, async (req, res) => {
  try {
    // get all the reviews for that classID
    const classesByID = await Review.find({
      university: req.user.university,
    }).find({ classID: req.query.param });
    // if there are no reviews for the classID send an error
    if (!classesByID)
      res.status(404).send({
        message: `No reviews found for this classID: ${req.query.param}`,
      });
    res.status(200).send(classesByID);
  } catch (err) {
    console.log("/classes error: ", err);
    res.status(400).send({ error: err });
  }
});

/* returns all the avilable reviews for a class */
router.get("/className", verify, async (req, res) => {
  try {
    // get all the reviews for that classID
    const classesByName = await Review.find({
      university: req.user.university,
    }).find({ className: req.query.param });
    // if there are no reviews for the classID send an error
    if (!classesByName)
      res.status(404).send({
        message: `No reviews found for this className: ${req.query.param}`,
      });
    res.status(200).send(classesByName);
  } catch (err) {
    console.log("/classes error: ", err);
    res.status(400).send({ error: err });
  }
});

/* creates a new review */
router.post("/create/review", verify, async (req, res) => {
  console.log(req);
  try {
    // we create a new review document to be stored under reviews in CursusDB
    const review = new Review({
      university: req.user.university,
      classID: req.body.classID,
      className: req.body.className,
      profName: req.body.profName,
      votes: 0,
      votesBy: [],
      review: {
        madeBy: req.user._id,
        title: req.body.title,
        description: req.body.description,
        grade: req.body.grade,
        gradeNum: req.body.gradeNum,
        classExp: req.body.classExp,
        classExpNum: req.body.classExpNum,
        profExp: req.body.profExp,
        profExpNum: req.body.profExpNum,
      },
      comments: [],
    });

    // save the review in the database
    const savedReview = await review.save();
    // update the class and prof home asyncly
    classHomeUpdate(req);
    profHomeUpdate(req);
    // success!
    res.status(201).send(savedReview);
  } catch (err) {
    console.log("/create/review error: ", err);
    res.status(400).send({ error: err });
  }
});

/* create a new comment for a review */
router.post("/create/comment", verify, async (req, res) => {
  try {
    // find the review and push a new comment object to the comments array
    await Review.updateOne(
      { _id: req.body.reviewID },
      {
        $push: {
          comments: {
            madeBy: req.user._id,
            comment: req.body.comment,
            votes: 0,
            date: new Date(),
          },
        },
      }
    );
    res.status(201).send(req.body.comment);
  } catch (err) {
    console.log("/create/comment error: ", err);
    res.status(400).send({ error: err });
  }
});

/* get the status of the vote for that user */
router.get("/getVote", verify, async (req, res) => {
  try {
    const hasUserVoted = await Review.findOne({
      _id: req.query.reviewID,
      votesBy: { $elemMatch: { user: req.user._id } },
    });
    if (!hasUserVoted) {
      res.status(404).send("None");
    } else {
      let type = null;
      hasUserVoted.votesBy.forEach((v) => {
        if (v.user === req.user._id) type = v.type;
      });
      res.status(200).send(type);
    }
  } catch (err) {
    console.log("/getVote error: ", err);
    res.status(400).send({ error: err });
  }
});

/* update the votes for a review */
router.patch("/vote", verify, async (req, res) => {
  try {
    // find the appropiate review
    const review = await Review.findOne({
      _id: req.body.reviewID,
    });
    // get the current number of votes from the document
    let votes = review.votes;
    if (req.body.type === "up" || req.body.type === "none-up") {
      votes += 1;
    } else if (req.body.type === "down" || req.body.type === "none-down") {
      votes -= 1;
    }
    // check if the user has voted in that review in the past
    let hasUserVoted = false;
    review.votesBy.forEach((v) => {
      if (v.user === req.user._id) hasUserVoted = true;
    });
    // if the user has voted in the past then update it
    if (hasUserVoted) {
      await Review.updateOne(
        { _id: req.body.reviewID, "votesBy.user": req.user._id },
        {
          $set: {
            votes: votes,
            "votesBy.$.type": req.body.type,
          },
        }
      );
      // if the user has not voted in the past, make a new vote
    } else {
      await Review.updateOne(
        { _id: req.body.reviewID },
        {
          $set: {
            votes: votes,
          },
          $push: {
            votesBy: {
              user: req.user._id,
              type: req.body.type,
            },
          },
        }
      );
    }
    res.status(200).send({ votes: votes });
  } catch (err) {
    console.log("/vote error: ", err);
    res.status(400).send({ error: err });
  }
});

export default router;
