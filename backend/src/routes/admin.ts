import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/auth";
import { validateBody, validateQuery } from "../middlewares/validate";
import { productCreateSchema, productQuerySchema, productUpdateSchema } from "../validators/products";
import { orderQuerySchema, orderStatusSchema } from "../validators/orders";
import { customerCreateSchema, customerQuerySchema, customerUpdateSchema } from "../validators/customers";
import { pageCreateSchema, pageUpdateSchema, sectionCreateSchema, sectionQuerySchema, sectionUpdateSchema } from "../validators/content";
import { analyticsQuerySchema } from "../validators/analytics";
import * as productsController from "../controllers/productsController";
import * as ordersController from "../controllers/ordersController";
import * as adminController from "../controllers/adminController";
import * as contentController from "../controllers/contentController";
import * as analyticsController from "../controllers/analyticsController";
import * as paymentsController from "../controllers/paymentsController";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/products", validateQuery(productQuerySchema), async (req, res, next) => {
  try {
    const data = await productsController.listProducts({ ...req.query, includeAll: true });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/products", validateBody(productCreateSchema), async (req, res, next) => {
  try {
    const product = await productsController.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/products/:id", validateBody(productUpdateSchema), async (req, res, next) => {
  try {
    const product = await productsController.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/products/:id", async (req, res, next) => {
  try {
    await productsController.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/orders", validateQuery(orderQuerySchema), async (req, res, next) => {
  try {
    const data = await ordersController.adminListOrders(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/orders/:id", async (req, res, next) => {
  try {
    const order = await ordersController.getOrder(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/orders/:id/status", validateBody(orderStatusSchema), async (req, res, next) => {
  try {
    const order = await ordersController.updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/orders/:id", async (req, res, next) => {
  try {
    await ordersController.deleteOrder(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/orders/:id/refresh-payment", async (req, res, next) => {
  try {
    const order = await paymentsController.refreshRazorpayPayment(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/customers", validateQuery(customerQuerySchema), async (req, res, next) => {
  try {
    const data = await adminController.listCustomers(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/customers", validateBody(customerCreateSchema), async (req, res, next) => {
  try {
    const customer = await adminController.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/customers/:id", validateBody(customerUpdateSchema), async (req, res, next) => {
  try {
    const customer = await adminController.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/customers/:id", async (req, res, next) => {
  try {
    await adminController.deleteCustomer(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/content/pages", async (req, res, next) => {
  try {
    const pages = await contentController.listPages();
    res.json(pages);
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/content/pages", validateBody(pageCreateSchema), async (req, res, next) => {
  try {
    const page = await contentController.createPage(req.body);
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/content/pages/:slug", validateBody(pageUpdateSchema), async (req, res, next) => {
  try {
    const page = await contentController.updatePage(req.params.slug, req.body);
    res.json(page);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/content/pages/:slug", async (req, res, next) => {
  try {
    await contentController.deletePage(req.params.slug);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/content/sections", validateQuery(sectionQuerySchema), async (req, res, next) => {
  try {
    const sections = await contentController.listSections(req.query);
    res.json(sections);
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/content/sections", validateBody(sectionCreateSchema), async (req, res, next) => {
  try {
    const section = await contentController.createSection(req.body);
    res.status(201).json(section);
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/content/sections/:id", validateBody(sectionUpdateSchema), async (req, res, next) => {
  try {
    const section = await contentController.updateSection(req.params.id, req.body);
    res.json(section);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/content/sections/:id", async (req, res, next) => {
  try {
    await contentController.deleteSection(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/analytics/overview", validateQuery(analyticsQuerySchema), async (req, res, next) => {
  try {
    const data = await analyticsController.getAnalyticsOverview(req.query.from, req.query.to);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/analytics/dashboard", async (_req, res, next) => {
  try {
    const data = await analyticsController.getDashboardOverview();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
