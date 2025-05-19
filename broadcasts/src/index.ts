"use strict";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { startConsumer } from "./lib/rabbitmq";
import { broadcastRouters } from "./routers";

const app = fastify();
const clients = new Set<any>();

app.register(ws);

import type { WebSocket } from "ws";

app.register(async (app) => {
  app.get("/ws", { websocket: true }, (connection) => {
    connection.on("open", () => {
      clients.add(connection.send);

      connection.send("Websocket Connected");
    });

    connection.on("message", (message: any) => {
      connection.send("Websocket Message");
      connection.send(JSON.stringify(message));
    });

    connection.on("close", () => {
      connection.send("Websocket Disconnected");
      clients.delete(connection.send);
    });
  });
});

app.register(broadcastRouters);

startConsumer((data) => {
  console.log("SENDING DATA", data);

  for (const client of clients) {
    client(data).catch(console.error);
  }
});

const start = async () => {
  try {
    await app.listen({ port: 5002 });
    console.log("🚀 Server ready at http://localhost:5002");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);
