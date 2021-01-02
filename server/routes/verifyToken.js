import jwt from "jsonwebtoken";

/* verification middleware to check if the user has logged in */

export default function verify(req, res, next) {
  // get the token from the cookie and check if it exists
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access Denied");
  // verify the user and go to the next step
  try {
    // verified returns the payload of the JWT token
    const verified = jwt.verify(token, process.env.SIGNATURE);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Invalid Token", message: err });
  }
}
