import { FastifyInstance } from "fastify";
import { getChannelController } from "../controllers/get.controller";
import { deleteChannelController } from "../controllers/delete.controller";
import { createChannelController } from "../controllers/create.controller";
import { getAllChannelsController } from "../controllers/get-all.controller";
import { updateChannelController } from "../controllers/update.controller";

export function channelsPublicRouters(serverApp: FastifyInstance) {
  serverApp.get("/", getAllChannelsController);
  serverApp.get("/:channelId", getChannelController);
}

export function channelsPrivateRouters(serverApp: FastifyInstance) {
  serverApp.post("/create", createChannelController);
  serverApp.delete("/:channelId", deleteChannelController);
  serverApp.put("/", updateChannelController);
}