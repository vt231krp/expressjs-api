import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoute from "./routes/product.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`API listening: http://localhost:${PORT}/api/`),
);
