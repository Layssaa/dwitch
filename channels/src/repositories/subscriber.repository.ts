import { dbClient } from "../../../user/src/database";

interface ISubscriberRepository {
  userId: string;
  channelId: string;
}
export async function subscriberRepository({
  channelId,
  userId,
}: ISubscriberRepository) {
  return dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      subcriptions: { connect: { id: channelId } },
    },
  });
}
