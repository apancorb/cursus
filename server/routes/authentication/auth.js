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
  if (error) return res.status(403).send({ error: error.details[0].message });
  // checking if the email already exists in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(409)
      .send({ error: "The Email provided already exists!" });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // we create a new User document to be stored under Users in CursusDB
  const user = new User({
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
    /*  The httpOnly: true setting means that the cookie can’t be 
      read using JavaScript but can still be sent back to the server in HTTP requests.
     Without this setting, an XSS attack could use document.cookie to get a list of 
     stored cookies and their values. */
    res.cookie("token", token, { httpOnly: true }).send({ token });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

/* API endpoint that registers a new user into the Data Base */
router.post("/login", async (req, res) => {
  // validation of data received
  const { error } = loginValidation(req.body);
  if (error) return res.status(403).send({ error: error.details[0].message });

  // checking if the email already exists in the db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send({ error: "Email does not exist!" });

  // checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send({ error: "Invalid password" });

  // create and sign a token
  const token = jwt.sign(
    { _id: user._id, university: user.university },
    process.env.SIGNATURE
  );

  /* res.cookie("auth-token", token).send({ success: token }); */
  res.cookie("token", token, { httpOnly: true }).send({ token });
});

/* API endpoint that removes 'token' cookie and log's out the user */
router.get("/clear", verify, (req, res) => {
  try {
    res.clearCookie("token").send({ message: "Cookie removed!" });
  } catch (err) {
    res.status(404).send({ err, message: "error removing the 'token' cookie" });
  }
});

/* API endpoint to get check if the user has a 'token' cookie and a valid JWT */
router.get("/", verify, (req, res) => {
  res.send(req.user);
});

export default router;
