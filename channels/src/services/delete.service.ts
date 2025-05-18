import { NotFoundError, UnauthorizedError } from "../error";
import {
  deleteChannelRepository,
  findChannelByIdRepository,
} from "../repositories";
import { IDeleteChannelValidator } from "../validators/delete.validator";

export async function deleteChannelService(
  data: IDeleteChannelValidator & { userId: string }
) {
  const { channelId, userId } = data;
  const channelFound = await findChannelByIdRepository({ id: channelId });

  if (!channelFound) {
    throw new NotFoundError("Not found");
  }

  if (channelFound?.owner_id != userId) {
    throw new UnauthorizedError("Not allowed");
  }

  await deleteChannelRepository({
    id: channelId,
  });
}
