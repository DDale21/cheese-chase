import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: {type: String, required: true},
  size: {type: String, required: true, default: "medium"},
  price: {type: Number, required: true},
  description: {type: String}
});

const Pizza = mongoose.model("Pizza", pizzaSchema);
export default Pizza;