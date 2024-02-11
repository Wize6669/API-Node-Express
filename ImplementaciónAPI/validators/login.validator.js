import { body } from "express-validator";
import { validateResult } from "../utils/validateHelper.util.js";
import { getGeneratedPIN } from "../controllers/home.controller.js";

const validateLognIn = [
  body("laboratoryID").notEmpty().withMessage("LaboratoryID required"),
  body("branchCode").notEmpty().withMessage("BranchCode required"),
  body("externalSystemID")
    .notEmpty()
    .withMessage("ExternalSystemID ID required")
    .custom((value, { req }) => {
      if (value !== 523) {
        throw new Error("Invalid credentials");
      }
      return true;
    }),
  body("accessCode")
    .notEmpty()
    .withMessage("PIN or accessCode required")
    .custom((value, { req }) => {
      if (value !== getGeneratedPIN()) {
        throw new Error("Invalid credentials");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateLognIn };
