import {
  createChannelRepository,
} from "../repositories";
import { ICreateChannelValidator } from "../validators/create.validator";

export async function createChannelService(
  userData: ICreateChannelValidator & { userId: string }
) {
  const { about, name, userId } = userData;

  await createChannelRepository({
    name,
    about,
    userId,
  });
}
