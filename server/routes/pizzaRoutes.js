import express from "express";

import {
  getAllPizzas,
  getPizzaById,
  createPizza
} from "../controllers/pizzaController.js"

const router = express.Router();

router.route('/').get(getAllPizzas).post(createPizza);
router.route('/:id').get(getPizzaById);

export default router