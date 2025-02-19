import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrderById).patch(updateOrderById).delete(deleteOrderById);

export default router;