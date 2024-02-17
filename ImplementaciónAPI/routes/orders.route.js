import { Router } from "express";
import * as OrdersController from "../controllers/orders.controller.js";

const router = Router();

router.post("/create", OrdersController.sendRabbitMQMessage);

export { router };