"use strict";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { broadcaster, startConsumer } from "./lib/rabbitmq";
import { broadcastRouters } from "./routers";
import type WebSocket from "ws";
import cors from "@fastify/cors";

const app = fastify();
const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

const allowedOrigins = [CLIENT_URL];

app.register(cors, {
  origin: allowedOrigins,
});

const clients = new Set<WebSocket>();

app.register(ws);

app.register(async (app) => {
  app.get("/ws", { websocket: true }, (connection) => {
    broadcaster.on("broadcast-started", (data) => {
      connection.send(JSON.stringify({ ...data, status: "broadcast-started" }));
    });

    connection.on("open", () => {
      clients.add(connection);
      connection.send("Websocket Connected");
    });

    connection.on("message", (message: any) => {
      connection.send("Websocket Message");
      connection.send(JSON.stringify(message));
    });

    connection.on("close", () => {
      connection.send("Websocket Disconnected");
      clients.delete(connection);
    });
  });
});

app.register(broadcastRouters, {
  prefix: "/broadcasts",
});

startConsumer();

const PORT = (process.env.PORT as unknown as number) ?? 5003;
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
