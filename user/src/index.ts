import { initalizeTracing } from "./lib/telemetry/tracing";
initalizeTracing();

import Fastify from "fastify";
import { userRouters } from "./routers";
import cors from "@fastify/cors";
import verifyAuth from "./plugins/auth";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: ["http://localhost:3000"],
});

app.addHook("onRequest", verifyAuth);

app.register(userRouters, {
  prefix: "/user",
});

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) ?? 5001 });
    console.log("🚀 Server ready at http://localhost:5001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);
