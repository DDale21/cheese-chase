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
      name: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        enum: ["small", "medium", "large"],
        required: true,
      },
      quantity: { type: Number, required: true},
      price: { type: Number, required: true },
      _id: false, // Prevent mongoose from adding _id
    }
  ],
  totalPrice: { type: Number, required: true},
  status: {
    type: String,
    enum: [
      "preparing",
      "cooking",
      "ready for pickup",
      "getting delivered",
      "delivered",
      "completed"
    ],
    required: true,
    default: "preparing",
  },
}, {timestamps: true});

orderSchema.methods.getId = function () {
  return this._id;
}

const Order = mongoose.model("Order", orderSchema);

export default Order;