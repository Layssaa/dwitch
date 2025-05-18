import { FastifyInstance } from "fastify";
import { getUserController } from "../controllers/user-get.controller";
import { deleteUserController } from "../controllers/delete.controller";

export function userRouters(serverApp: FastifyInstance) {
  serverApp.get("/", getUserController);
  serverApp.delete("/:userId", deleteUserController);
}