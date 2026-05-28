import { Router } from "express";
import { validateQuery } from "../middlewares/validate";
import { productQuerySchema } from "../validators/products";
import * as productsController from "../controllers/productsController";

export const productsRouter = Router();

productsRouter.get("/", validateQuery(productQuerySchema), async (req, res, next) => {
  try {
    const data = await productsController.listProducts({ ...req.query, includeAll: false });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await productsController.getProduct(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
