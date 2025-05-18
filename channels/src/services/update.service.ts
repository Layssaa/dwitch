import { NotFoundError, UnauthorizedError } from "../error";
import {
  findChannelByIdRepository,
  updateChannelRepository,
} from "../repositories";
import { IUpdateChannelValidator } from "../validators/update.validator";

export async function updateChannelService(
  data: IUpdateChannelValidator & { userId: string }
) {
  const { channelId, userId, about, name } = data;
  const channelFound = await findChannelByIdRepository({ id: channelId });

  if (!channelFound) {
    throw new NotFoundError("Not found");
  }

  if (channelFound?.owner_id != userId) {
    throw new UnauthorizedError("Not allowed");
  }

  await updateChannelRepository({
    id: channelId,
    about: about ?? channelFound.about,
    name: name ?? channelFound.name,
  });
}
