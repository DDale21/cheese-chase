import mongoose from "mongoose";
import Pizza from "../models/pizzaModel.js"

export const getAllPizzas = async (req, res) => {
  const pizzas = await Pizza.find({});
  if (pizzas.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Cannot find any pizzas",
    });
  }
  return res.status(200).json({
    success: true,
    pizzas: pizzas,
  });
}

export const getPizzaById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing ID property",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const pizza = await Pizza.findById(id);
    return res.status(200).json({
      success: true,
      pizza: pizza,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export const createPizza = async (req, res) => {
  try {
    const newPizza = await Pizza.create(req.body);
    return res.status(200).json({
      success: true,
      pizza: newPizza,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create pizza"
    });
  }
}