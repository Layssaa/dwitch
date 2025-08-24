import { NotFoundError, UnauthorizedError } from "@dwitch/errors";
import { findChannelByIdRepository } from "../repositories";
import { subscriberRepository } from "../repositories/subscriber.repository";
import { ISubscribeValidator } from "../validators/subcribe.validator";

export async function subscriberService(
  userData: ISubscribeValidator & { userIdAuth: string }
) {
  const { channelId, userIdAuth } = userData;

  const channelData = await findChannelByIdRepository({
    id: channelId,
  })

  if(!channelData){
    throw new NotFoundError("Channel not found");
  }

  if(channelData?.owner_id == userIdAuth){
    throw new UnauthorizedError("Not allowed to subscribe to your own channel");
  }

  await subscriberRepository({
    userId: userIdAuth,
    channelId,
  });
}
