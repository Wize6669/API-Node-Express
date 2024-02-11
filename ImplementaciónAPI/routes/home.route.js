import { Router } from "express";
import * as Home from "../controllers/home.controller.js";

const router = Router();

router.get("/", Home.generatePIN);

export { router };
