import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pizzas: [
    {
      pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true,
      },
      size: {
        type: String,
        enum: ["small", "medium", "large"],
        required: true,
      },
      quantity: { type: Number, required: true},
      price: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true},
  completed: {type: Boolean, required: true, default: false},
});

const Order = mongoose.model("Order", orderSchema);

export default Order;