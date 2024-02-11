import jwt from "jsonwebtoken";

function generateAccessToken(laboratory) {
  return jwt.sign(laboratory, process.env.NEXT_PUBLIC_SECRET_KEY);
}

export { generateAccessToken };
