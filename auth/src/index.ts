import { initalizeTracing } from "./lib/telemetry/tracing";
initalizeTracing();

import Fastify from "fastify";
import { authRouters } from "./routers";
import cors from '@fastify/cors'

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: ['http://localhost:3000'],
});

app.register(authRouters, {
  prefix: "/auth",
});

const start = async () => {
  try {
    await app.listen({ port: 5000 });
    console.log("🚀 Server ready at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);
