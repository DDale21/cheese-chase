import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  prices: {
    small: { type: Number, required: true },
    medium: {type: Number, required: true },
    large: { type: Number, required: true }
  },
  description: {type: String}
});

pizzaSchema.methods.getId = function () {
  return this._id;
}
pizzaSchema.methods.getName = function () {
  return this.name;
}
pizzaSchema.methods.getPriceBySize = function (size) {
  return this.prices[size];
}

const Pizza = mongoose.model("Pizza", pizzaSchema);
export default Pizza;