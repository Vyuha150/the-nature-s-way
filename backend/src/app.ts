import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { productsRouter } from "./routes/products";
import { ordersRouter } from "./routes/orders";
import { adminRouter } from "./routes/admin";
import { contentRouter } from "./routes/content";
import { paymentsRouter } from "./routes/payments";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/content", contentRouter);
app.use("/admin", adminRouter);

app.use(errorHandler);
