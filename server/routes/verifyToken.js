import jwt from "jsonwebtoken";

/* verification middleware to check if the user has logged in */
export default function (req, res, next) {
  // get the token from the header and check if it exists
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  // verify the user and go to the next step
  try {
    // verified returns the payload of the JWT token
    const verified = jwt.verify(token, process.env.SIGNATURE);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid Token" });
  }
}
