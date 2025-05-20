import { NotFoundError, UnauthorizedError } from "@dwitch/errors";
import {
  createBroadcastRepository,
  createStartBroadcastLog,
  findChannelByIdRepository,
} from "../repositories";
import { createRabbitMQConnection, publishBroadcast } from "../lib/rabbitmq";

interface ICreateBroadcasValidator {
  userIdAuth: string;
  channelId: string;
}
export async function createBroadcastService(data: ICreateBroadcasValidator) {
  const { channelId, userIdAuth } = data;

  const channelFound = await findChannelByIdRepository({
    id: channelId,
  });
  
  if (!channelFound) {
    throw new NotFoundError("Channel not found");
  }

  if (channelFound?.owner_id != userIdAuth) {
    throw new UnauthorizedError("Not allowed");
  }

  const broadcastCreated = await createBroadcastRepository({ channelId });
  await createStartBroadcastLog({
    broadcastId: broadcastCreated.id,
  });

  const message = {
    message: "Broadcast Started",
  };
  const { channel } = await createRabbitMQConnection();

  await publishBroadcast(channel, { ...message, ...channelFound });

  return message;
}
