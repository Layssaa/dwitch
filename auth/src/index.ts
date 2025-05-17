import { initalizeTracing } from "./lib/telemetry/tracing";
initalizeTracing();

import Fastify from "fastify";
import { authRouters, userRouters } from "./routers";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "./lib/telemetry/payload";

const app = Fastify({
  logger: true,
});

app.register(authRouters, {
  prefix: "/auth",
});

app.register(userRouters, {
  prefix: "/user",
});


const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("🚀 Server ready at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);
