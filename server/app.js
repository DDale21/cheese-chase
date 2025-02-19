import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config();
const app = express();

app.use("/api/v1/orders", orderRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});