import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToDB from "./db/connect.js";

import orderRoutes from "./routes/orderRoutes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/orders", orderRoutes);

try {
  await connectToDB(process.env.MONGO_URI);
  console.log("Successfully connected to Database");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
  });
} catch (error) {
  console.log(error);
}