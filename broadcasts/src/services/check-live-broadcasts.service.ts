import { NotFoundError } from "@dwitch/errors";
import { checkLiveBroadcastRepository } from "../repositories";

export async function checkLiveBroadcastsService({
  channelId,
}: {
  channelId: string;
}) {
  const channelWithBroadcasts = await checkLiveBroadcastRepository({
    channelId,
  });
  console.log("channelWithBroadcasts", channelWithBroadcasts);

  if (!channelWithBroadcasts) {
    throw new NotFoundError("Channel not found");
  }

  return channelWithBroadcasts;
}

interface IChannels {
  id: string;
  name: string;
  about: string;
  owner_id: string;
  subscribers: string[];
}

export interface ILog {
  id: string;
  createdAt: Date;
  status: string;
  broadcastId: string;
}
export interface ILiveBroadcast extends IChannels {
  broadcasts: ILog[];
}
