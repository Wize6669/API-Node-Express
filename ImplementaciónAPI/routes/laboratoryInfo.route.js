import { Router } from "express";
import * as LaboratoryInfoController from "../controllers/laboratoryInfo.controller.js";

const router = Router();

router.get("/", LaboratoryInfoController.getLaboratoryInfoByIDs);
router.post("/create", LaboratoryInfoController.createLaboratoryInfo)

export { router };