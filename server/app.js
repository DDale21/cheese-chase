import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import express from "express";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import connectToDB from "./db/connect.js";
import orderRoutes from "./routes/orderRoutes.js"
import pizzaRoutes from "./routes/pizzaRoutes.js"


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/pizzas", pizzaRoutes);

app.use(errorHandlerMiddleware);
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