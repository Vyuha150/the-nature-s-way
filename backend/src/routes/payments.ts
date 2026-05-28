import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { razorpayCreateSchema, razorpayVerifySchema } from "../validators/payments";
import * as paymentsController from "../controllers/paymentsController";

export const paymentsRouter = Router();

paymentsRouter.post("/razorpay/order", requireAuth, validateBody(razorpayCreateSchema), async (req, res, next) => {
  try {
    const data = await paymentsController.createRazorpayOrder(req.user!.id, req.body.items, req.body.source);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

paymentsRouter.post("/razorpay/verify", requireAuth, validateBody(razorpayVerifySchema), async (req, res, next) => {
  try {
    const order = await paymentsController.verifyRazorpayPayment(req.user!.id, req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

paymentsRouter.post("/razorpay/refresh/:orderId", requireAuth, async (req, res, next) => {
  try {
    const order = await paymentsController.refreshRazorpayPaymentForUser(req.user!.id, req.params.orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
});
