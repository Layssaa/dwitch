import { FastifyInstance } from "fastify";
import { createBroadcastController } from "../controllers/create.controller";
import verifyAuth from "../plugins/auth";

export function broadcastRouters(serverApp: FastifyInstance) {
  serverApp.post(
    "/start",
    {
      preHandler: [verifyAuth],
    },
    createBroadcastController
  );
}
