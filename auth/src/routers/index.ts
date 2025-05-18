import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/creater.controller";
import { loginUserController } from "../controllers/login.controller";
import { validateTokenController } from "../controllers/validate-token.controller";

export function authRouters(serverApp: FastifyInstance) {
  serverApp.post("/create", createUserController);
  serverApp.post("/login", loginUserController);
  serverApp.get("/validate-token", validateTokenController);
}