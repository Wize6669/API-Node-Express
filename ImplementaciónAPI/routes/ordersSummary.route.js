import { Router } from "express";
import * as OrdersSummaryController from "../controllers/ordersSummary.controller.js";

const router = Router();

router.get("/", OrdersSummaryController.getStatusEmergencyOrders);

export { router };
