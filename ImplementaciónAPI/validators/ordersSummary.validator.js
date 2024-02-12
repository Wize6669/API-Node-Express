import {query} from "express-validator";
import {validateResult} from "../utils/validateHelper.util.js";

const validateOrdersSummary = [
    query("dateFrom").notEmpty().withMessage("DateFrom required"),
    query("dateTo").notEmpty().withMessage("DateTo required"),
    query("emergency")
        .notEmpty()
        .withMessage("Emergency flag required")
        .custom((value, { req }) => {
            if (value !== "true" && value !=="false") {
                throw new Error("Emergency is a boolean flag");
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateOrdersSummary }