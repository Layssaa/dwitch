import { NotFoundError, UnauthorizedError } from "../../../user/src/error";
import { deleteUserRepository, findUserRepositoryById } from "../../../user/src/repositories";
import { subscriberRepository } from "../repositories/subscriber.repository";
import { IDeleteUserValidator } from "../../../user/src/validators/delete.validator";
import { ISubscribeValidator } from "../validators/subcribe.validator";

export async function subscriberService(
  userData: ISubscribeValidator & { userIdAuth: string }
) {
  const { channelId, userIdAuth } = userData;

  await subscriberRepository({
    userId: userIdAuth,
    channelId,
  });
}
