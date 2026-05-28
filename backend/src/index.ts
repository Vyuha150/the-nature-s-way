import { createServer } from "http";
import { app } from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";

async function start() {
  await connectDb();
  const server = createServer(app);
  server.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on port ${env.PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});
