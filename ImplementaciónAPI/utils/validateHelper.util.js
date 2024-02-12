import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (e) {
    return res.status(400).json({
      message: e
        .array()
        .map((error) => error.msg)
        .join(", "),
    });
  }
};

export { validateResult };
