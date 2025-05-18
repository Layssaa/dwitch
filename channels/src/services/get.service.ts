import { NotFoundError } from "../error";
import { findChannelByIdRepository } from "../repositories";

export async function getChannelService(data: { channelId: string }) {
  const { channelId } = data;

  const channelFound = await findChannelByIdRepository({ id: channelId });

  if (!channelFound) {
    throw new NotFoundError("Channel Not Found");
  }

  return channelFound;
}
