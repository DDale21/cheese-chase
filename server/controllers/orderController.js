import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Pizza from "../models/pizzaModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No orders found",
        orders: [],
      });
    }
    return res.status(200).json({
      success: true,
      order: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
}

export const getOrderById = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order with specified ID not found"
      });
    }
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
  
}

export const createOrder = async (req, res) => {
  const {
    customerName,
    email,
    phone,
    pizzas,
  } = req.body;

  // TODO: Calculate price
  let totalPrice = 0;
  const orderItems = await Promise.all(
    pizzas.map(async (p) => {
      const matchingPizza = await Pizza.findById(p.pizza);
      const price = matchingPizza.prices[p.size];
      totalPrice += (price * p.quantity);
      return { pizza: matchingPizza._id, size: p.size, quantity: p.quantity, price: price }
    })
  );

  const newOrder = await Order.create({
    customerName: customerName,
    email: email,
    phone: phone,
    pizzas: orderItems,
    totalPrice: totalPrice,
  });

  res.status(201).json({
    success: true,
    message: 'Successfully created an order',
    order: newOrder,
  });
}


// deciding if updating of order is needed
export const updateOrderById = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    message: `Successfully updated an order with an ID of ${id}`,
  });
}

export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Cannot delete Order, order with specified ID does not exists",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully deleted order with ID: ${deletedOrder._id}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
}