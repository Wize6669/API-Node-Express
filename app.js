import express from "express";
import { readData } from "./db/db-laboratories.js";
import { readDataE } from "./db/db-emergency-orders.js";
import { generateAccessToken, validateToken } from "./auth/auth.js";
import bodyParser from "body-parser";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT_SERVER ?? 3001;
const url = process.env.URL_SERVER ?? "http://localhost";

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

app.get("/", (_, res) => {
  res.send("Access code: " + accessCodeGenerated);
});

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

app.post("/api/v1/login", (req, res) => {
  const { laboratoryID, branchCode, externalSystemID, accessCode } = req.body;
  const data = readData();
  const branch = data.branchs.find(
    (branch) =>
      branch.laboratoryID === laboratoryID && branch.branchCode === branchCode &&
        branch.externalSystemID === externalSystemID
  );

  if (!branch || accessCode !== accessCodeGenerated) {
    return res.status(401).json({
      message: "Incorrect credentials",
    });
  }

  const accessToken = generateAccessToken(branch);

  res.status(200).json({
    laboratoryName: branch.laboratoryName,
    branchName: branch.branchName,
    subDomain: branch.subDomain,
    token: accessToken,
  });
});

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

app.get("/api/v1/consultStatusEmergencyOrders", validateToken, (_, res) => {
  const data = readDataE();
  let randomId = Math.floor(Math.random() * data.emergencyOrders.length);
  if (randomId === 0) randomId = randomId + 1;
  const emergencyOrderData = data.emergencyOrders.find(
    (emergencyOrder) => emergencyOrder.id === randomId
  );
  if (!emergencyOrderData) {
    return res.status(404).json({
      message: "Emergency order not found",
    });
  }
  const { generated, inProcess, preliminary, reported } = emergencyOrderData

  return res.status(200).json({ generated, inProcess, preliminary, reported });
});

app.get("/api/v1/consultStatusEmergencyOrdersRange", validateToken, (req, res) => {
  const {from, to} = req.body;
  console.log(from, to)
  const data = readDataE();
  let randomId = Math.floor(Math.random() * data.emergencyOrders.length);
  if (randomId === 0) randomId = randomId + 1;
  const emergencyOrderData = data.emergencyOrders.find(
      (emergencyOrder) => emergencyOrder.id === randomId
  );
  if (!emergencyOrderData) {
    return res.status(404).json({
      message: "Emergency order not found",
    });
  }
  const { generated, inProcess, preliminary, reported } = emergencyOrderData

  return res.status(200).json({ generated, inProcess, preliminary, reported });
});

app.get("/api/v1/all-branchs", validateToken, (_, res) => {
  const data = readData();
  res.status(200).json(data.branchs);
});

app.get("/api/v1/branchs", validateToken, (req, res) => {
  const { laboratoryID, branchCode } = req.body;
  const data = readData();
  const branch = data.branchs.find(
    (branch) =>
      branch.laboratoryID === laboratoryID && branch.branchCode === branchCode
  );

  if (!branch) {
    return res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }

  res.status(200).json(branch);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`${url}:${port}`);
});

function getRandomInt(max) {
  let aux1 = Math.floor(Math.random() * max);
  let aux2 = Math.floor(Math.random() * max);
  let aux3 = Math.floor(Math.random() * max);
  let aux4 = Math.floor(Math.random() * max);

  return `${aux1}${aux2}${aux3}${aux4}`;
}

const accessCodeGenerated = getRandomInt(10);

console.log(accessCodeGenerated);
