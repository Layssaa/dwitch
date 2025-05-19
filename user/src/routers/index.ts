import { FastifyInstance } from "fastify";
import { getUserController } from "../controllers/user-get.controller";
import { deleteUserController } from "../controllers/delete.controller";
import { getUserChannelController } from "../controllers/user-channel.controller";

export function userRouters(serverApp: FastifyInstance) {
  serverApp.get("/", getUserController);
  serverApp.get("/channels", getUserChannelController);
  serverApp.delete("/:userId", deleteUserController);
}