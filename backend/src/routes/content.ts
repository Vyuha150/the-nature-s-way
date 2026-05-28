import { Router } from "express";
import { validateQuery } from "../middlewares/validate";
import { sectionQuerySchema } from "../validators/content";
import * as contentController from "../controllers/contentController";

export const contentRouter = Router();

contentRouter.get("/pages", async (req, res, next) => {
  try {
    const pages = await contentController.listPublishedPages();
    res.json(pages);
  } catch (err) {
    next(err);
  }
});

contentRouter.get("/sections", validateQuery(sectionQuerySchema), async (req, res, next) => {
  try {
    const sections = await contentController.listPublishedSections({ pageSlug: req.query.pageSlug });
    res.json(sections);
  } catch (err) {
    next(err);
  }
});
