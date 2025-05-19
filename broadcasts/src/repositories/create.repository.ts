import { dbClient } from "../database";

interface ICreateBroadcastRepository {
  channelId: string;
}
export function createBroadcastRepository({
  channelId,
}: ICreateBroadcastRepository) {
  return dbClient.broadcast.create({
    data: {
      channelId: channelId,
      createdAt: new Date(),
    },
  });
}

interface ICreateBroadcastLogsRepository {
  broadcastId: string;
  status: "LIVE" | "COMPLETED" | "FAILED";
}
function createBroadcastLogsRepository({
  broadcastId,
  status,
}: ICreateBroadcastLogsRepository) {
  return dbClient.broadcastLogs.create({
    data: {
      status: status,
      broadcastId,
      createdAt: new Date(),
    },
  });
}

export function createStartBroadcastLog({
  broadcastId,
}: Omit<ICreateBroadcastLogsRepository, "status">) {
  return createBroadcastLogsRepository({
    broadcastId,
    status: "LIVE",
  });
}

export function createCompletedBroadcastLog({
  broadcastId,
}: Omit<ICreateBroadcastLogsRepository, "status">) {
  return createBroadcastLogsRepository({
    broadcastId,
    status: "COMPLETED",
  });
}
