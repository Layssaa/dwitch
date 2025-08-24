import { NotFoundError, UnauthorizedError } from "@dwitch/errors";
import {
  createCompletedBroadcastLog,
  findBroadcastByIdRepository,
} from "../repositories";
import { createRabbitMQConnection, publishBroadcast } from "../lib/rabbitmq";

interface ICreateBroadcasValidator {
  userIdAuth: string;
  broadcastId: string;
}

export async function finishedBroadcastService(data: ICreateBroadcasValidator) {
  const { broadcastId, userIdAuth } = data;

  const broadcastFound = await findBroadcastByIdRepository({
    id: broadcastId,
  });
  
  if (!broadcastFound) {
    throw new NotFoundError("Channel not found");
  }

  if (broadcastFound?.channel.owner_id != userIdAuth) {
    throw new UnauthorizedError("Not allowed");
  }

  await createCompletedBroadcastLog({
    broadcastId: broadcastId,
  });

  const message = {
    message: "Broadcast Finished",
  };
  const { channel } = await createRabbitMQConnection();

  await publishBroadcast(channel, { ...message, ...broadcastFound });

  return message;
}
