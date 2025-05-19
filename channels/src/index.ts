import { initalizeTracing } from "./lib/telemetry/tracing";
initalizeTracing();

import Fastify from "fastify";
import { channelsPrivateRouters, channelsPublicRouters } from "./routers";
import cors from "@fastify/cors";
import verifyAuth from "./plugins/auth";

const app = Fastify({
  logger: true,
});

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

const allowedOrigins = [CLIENT_URL];

app.register(cors, {
  origin: allowedOrigins,
});

app.register(channelsPublicRouters, {
  prefix: "/channels",
});

app.addHook("onRequest", verifyAuth);
app.register(channelsPrivateRouters, {
  prefix: "/channels",
});

const PORT = (process.env.PORT as unknown as number) ?? 5002 
const start = async () => {
  try {
    await app.listen({ port: PORT });
    console.log("🚀 Server ready at ", PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);
