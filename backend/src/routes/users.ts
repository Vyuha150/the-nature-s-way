import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import * as usersController from "../controllers/usersController";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await usersController.getMe(req.user!.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
