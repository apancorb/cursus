import express from "express";

import Banner from "./../../models/Banner.js";

import verify from "./../verifyToken.js";

const router = express.Router();

/* Get one random document from the Banner collection. */
router.get("/", verify, async (req, res) => {
  try {
    const randomDoc = await Banner.aggregate([
      { $match: { university: req.user.university } },
      { $sample: { size: 1 } },
    ]);
    res.status(200).json(randomDoc);
  } catch (err) {
    console.log("Error /", err);
    res.status(400).send({ error: err });
  }
});

export default router;
