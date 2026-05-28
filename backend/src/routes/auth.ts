import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import { bootstrapSchema, loginSchema, refreshSchema, registerSchema } from "../validators/auth";
import * as authController from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const tokens = await authController.register(name, email, password);
    res.status(201).json(tokens);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tokens = await authController.login(email, password);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/refresh", validateBody(refreshSchema), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authController.refresh(refreshToken);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/logout", validateBody(refreshSchema.partial()), async (req, res, next) => {
  try {
    const { refreshToken } = req.body ?? {};
    await authController.logout(refreshToken);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

authRouter.post("/bootstrap-admin", validateBody(bootstrapSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const tokens = await authController.bootstrapAdmin(name, email, password);
    res.status(201).json(tokens);
  } catch (err) {
    next(err);
  }
});
