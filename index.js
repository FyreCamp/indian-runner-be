import express, { json, urlencoded } from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routers/auth.router.js";
import adminRoutes from "./routers/admin.router.js";
import dotenv from "dotenv";
import morgan from "morgan";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
