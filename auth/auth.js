import jwt from "jsonwebtoken";

function generateAccessToken(laboratory) {
  return jwt.sign(laboratory, process.env.SECRET_KEY);
}

function validateToken(req, res, next) {
  const accessToken = req.headers["Authorization"];
  // Extract the Bearer token from the Authorization header
  const token = req.headers.authorization.split(" ")[1];

  if (token === undefined) {
    return res.status(401).send("Access denied, token expired or incorrect");
  }

  // Verify the token using an appropriate authentication mechanism
  jwt.verify(token, process.env.SECRET_KEY, (error, laboratory) => {
    if (error) {
      return res.status(401).send("Access denied, token expired or incorrect");
    }
    req.laboratory = laboratory;
    next();
  });
}

export { generateAccessToken, validateToken };
