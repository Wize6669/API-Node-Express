import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  // Extract the Bearer token from the Authorization header
  if (!req.headers.authorization) {
    return res.status(401).send("Access denied, Authorization header missing");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token === undefined) {
    return res.status(401).send("Access denied, token expired or incorrect");
  }

  // Verify the token using an appropriate authentication mechanism
  jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY, (error, laboratory) => {
    if (error) {
      return res.status(401).send("Access denied, token expired or incorrect");
    }
    req.laboratory = laboratory;
    next();
  });
};

export { validateToken };
