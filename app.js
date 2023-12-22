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
 * /login:
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
 *             accessCode:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [success]
 *             subDomain:
 *               type: string
 *             accessToken:
 *               type: string
 *       401:
 *         description: Invalid access code
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [error]
 *             message:
 *               type: string
 */

app.post("/api/v1/login", (req, res) => {
  const { laboratoryID, branchCode, accessCode } = req.body;
  const data = readData();
  const branch = data.branchs.find(
    (branch) =>
      branch.laboratoryID === laboratoryID && branch.branchCode === branchCode
  );

  if (!branch || accessCode !== accessCodeGenerated) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect credentials",
    });
  }

  const accessToken = generateAccessToken(branch);

  res.status(200).json({
    status: "success",
    subDomain: branch.subDomain,
    token: accessToken,
  });
});

app.get("/api/v1/consultStatusEmergencyOrders", validateToken, (_, res) => {
  const data = readDataE();
  const emergencyOrderData = data.emergencyOrders.find(
    (emergencyOrder) =>
      emergencyOrder.id ===
      Math.floor(Math.random() * data.emergencyOrders.length)
  );
  const emergencyOrder = {
    orders: emergencyOrderData.orders,
  };
  return res.status(200).json(emergencyOrder);
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
