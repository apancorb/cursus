import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./../../model/User.js";
import { registerValidation, loginValidation } from "./validation.js";

import verify from "./../verifyToken.js";

const router = express.Router();

/* API endpoint that registers a new user into the Data Base */
router.post("/register", async (req, res) => {
  // validation of data received
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // checking if the email already exists in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ error: "Email already exists!" });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // we create a new User document to be stored under Users in CursusDB
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    university: req.body.university,
  });

  // save the new User to the Data Base
  try {
    const savedUser = await user.save();
    // create and sign a token
    const token = jwt.sign(
      { _id: user._id, university: user.university },
      process.env.SIGNATURE
    );
    res.header("auth-token", token).send({ success: token });
    /* res.send({ user: user._id }); */
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

/* API endpoint that registers a new user into the Data Base */
router.post("/login", async (req, res) => {
  // validation of data received
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // checking if the email already exists in the db
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: "Email or password does not exist!" });

  // checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ error: "Invalid password" });

  // create and sign a token
  const token = jwt.sign(
    { _id: user._id, university: user.university },
    process.env.SIGNATURE
  );
  res.header("auth-token", token).send({ success: token });
});

router.get("/", verify, (req, res) => {
  /*   res.json({
    posts: { title: "my first post", data: "only if auth u can see" },
  }); */
  // since in the verified middleware we set req.user to id we have access to the user for getting their data
  res.send(req.user);
  // user findone id : req.user._id
});

export default router;
