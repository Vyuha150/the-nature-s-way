import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { validateBody, validateQuery } from "../middlewares/validate";
import { orderCreateSchema } from "../validators/orders";
import { z } from "zod";
import * as ordersController from "../controllers/ordersController";

export const ordersRouter = Router();

ordersRouter.post("/", requireAuth, validateBody(orderCreateSchema), async (req, res, next) => {
  try {
    const order = await ordersController.createOrder(req.user!.id, req.body.items, req.body.source);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

const myOrdersQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

ordersRouter.get("/me", requireAuth, validateQuery(myOrdersQuery), async (req, res, next) => {
  try {
    const data = await ordersController.listMyOrders(req.user!.id, req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
});
