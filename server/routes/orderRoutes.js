import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatusById,
  deleteOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrderById).patch(updateOrderStatusById).delete(deleteOrderById);

export default router;