import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();
const urlFront = process.env.NEXT_PUBLIC_FRONT_END_URL;
const portFront = process.env.NEXT_PUBLIC_FRONT_END_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
import { router as HomeRoute } from "./routes/home.route.js";
import { router as LoginRoute } from "./routes/login.route.js";
import { router as OrdersSummaryRoute } from "./routes/ordersSummary.route.js";
import { validateLognIn } from "./validators/login.validator.js";
import { validateToken } from "./middleware/jwt.middleware.js";
import {validateOrdersSummary} from "./validators/ordersSummary.validator.js";

app.use(
  cors({
    origin: `${urlFront}:${portFront}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Documentation
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API for Skill Orion",
      description:
        "The Orion Skill API makes it easy to integrate the Orion skill with the Orion system, allowing you to efficiently query the status of emergency orders for a specific laboratory",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *   TokenResponse:
 *     type: object
 *     properties:
 *       laboratoryName:
 *         type: string
 *       branchName:
 *         type: string
 *       subDomain:
 *         type: string
 *       accessToken:
 *         type: string
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

app.use("/", HomeRoute);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     description: Login in to the Orion system
 *     tags:
 *       - Group Skill Orion
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             laboratoryID:
 *               type: integer
 *             branchCode:
 *               type: integer
 *             externalSystemID:
 *               type: integer
 *             accessCode:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/TokenResponse'
 *       401:
 *         description: Invalid access code
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
app.use("/api/v1/login", validateLognIn, LoginRoute);

/**
 * @swagger
 * /api/v1/consultStatusEmergencyOrders:
 *   get:
 *     description: Get Order Status
 *     tags:
 *       - Group Orders
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *                 generated:
 *                   type: integer
 *                   description: Number of orders generated.
 *                   example: 2
 *                 inProcess:
 *                   type: integer
 *                   description: Number of orders in process.
 *                   example: 6
 *                 preliminary:
 *                   type: integer
 *                   description: Number of preliminary orders.
 *                   example: 1
 *                 reported:
 *                   type: integer
 *                   description: Number of reported orders.
 *                   example: 10
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message.
 *               example: Unauthorized. Please provide a valid Bearer token in the Authorization header.
 */
app.use("/api/v1/orders-sumary", [validateToken, validateOrdersSummary], OrdersSummaryRoute);

export { app };
