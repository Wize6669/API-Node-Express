import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  // Extract the Bearer token from the Authorization header
  const header = req.headers["Authorization"];
  if (!header) {
    return res
      .status(401)
      .send(
        "Access denied, token expired or incorrectAuthentication required. " +
          "Please provide valid credentials in the Authorization header."
      );
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
    console.log(laboratory);
    req.laboratory = laboratory;
    next();
  });
};

export { validateToken };
