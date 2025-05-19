import { NotFoundError } from "../error";
import { findChannelByUserIdRepository } from "../repositories";

export async function getUserChannelService(data: { userId: string }) {
  const { userId } = data;

  const channelFound = await findChannelByUserIdRepository({ userId });

  if (!channelFound) {
    throw new NotFoundError("Channel Not Found");
  }

  return channelFound;
}
