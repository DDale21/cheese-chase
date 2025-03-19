import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Pizza from "../models/pizzaModel.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  if (!orders) {
    throw new NotFoundError("No order")
  }

  if (orders && orders.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Empty orders",
      orders: orders,
    });
  }

  return res.status(200).json({
    success: true,
    hits: orders.length,
    order: orders,
  });
}

export const getOrderById = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID format")
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new NotFoundError("Order with specified ID not found");
  }

  return res.status(200).json({
    success: true,
    order: order,
  });
}

export const createOrder = async (req, res) => {
  const {
    customerName,
    email,
    phone,
    pizzas,
  } = req.body;

  let totalPrice = 0;
  const orderItems = await Promise.all(
    pizzas.map(async (p) => {
      if (!mongoose.Types.ObjectId.isValid(p.id)) {
        throw new BadRequestError("Invalid Pizza ID format");
      }

      const matchingPizza = await Pizza.findById(p.id);

      if (!matchingPizza) {
        throw new NotFoundError(`No pizza with ID: ${p.id}`);
      }

      const price = matchingPizza.getPriceBySize(p.size);
      totalPrice += (price * p.quantity);
      return { 
        pizza: matchingPizza.getId(),
        name: matchingPizza.getName(),
        size: p.size, 
        quantity: p.quantity, 
        price: price 
      }
    })
  );

  const newOrder = await Order.create({
    customerName: customerName,
    email: email,
    phone: phone,
    pizzas: orderItems,
    totalPrice: totalPrice,
  });

  return res.status(201).json({
    success: true,
    order: newOrder,
  });
}

export const updateOrderStatusById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID format");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id, 
    { status }, 
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!updatedOrder) {
    throw new NotFoundError("Failed to update order, Order not found");
  }

  return res.status(200).json({
    success: true,
    updatedOrder: updatedOrder,
  });
}

export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID format")
  }

  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) {
    throw new NotFoundError("Failed to delete order, Order not found")
  }

  return res.status(200).json({
    success: true,
    message: `Successfully deleted order with ID: ${deletedOrder._id}`,
  });
}