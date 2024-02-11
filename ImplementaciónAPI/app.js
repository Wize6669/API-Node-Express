import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

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

app.use(
  cors({
    origin: `${urlFront}:${portFront}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", HomeRoute);
app.use("/api/v1/login", validateLognIn, LoginRoute);
app.use("/api/v1/orders-sumary", OrdersSummaryRoute);

export { app };
