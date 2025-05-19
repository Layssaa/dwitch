import { initalizeTracing } from "./lib/telemetry/tracing";
initalizeTracing();

import Fastify from "fastify";
import { authRouters } from "./routers";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

const CLIENT_URL = process.env.CLIENT_URL as string;
const API_USER = process.env.API_USER_URL as string;
const API_CHANNELS = process.env.API_CHANNEL_URL as string;
const API_BROADCAST = process.env.API_BROADCAST_URL as string;

const allowedOrigins = [CLIENT_URL, API_USER, API_CHANNELS, API_BROADCAST];

app.register(cors, {
  origin: allowedOrigins,
});

app.register(authRouters, {
  prefix: "/auth",
});

const PORT = (process.env.PORT as unknown as number) ?? 5000 
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
