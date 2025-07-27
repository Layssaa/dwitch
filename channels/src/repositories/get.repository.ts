import { dbClient } from "../database";

interface IFindChannelById {
  id: string;
}
export async function findChannelByIdRepository({ id }: IFindChannelById) {
  return dbClient.channel.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });
}

export async function getAllChannelsRepository() {
  return dbClient.channel.findMany({
    where: {
      deletedAt: null,
    },
  });
}

export async function getLiveBroadcastsRepository({
  userId,
}: {
  userId: string;
}) {
  // CORRIGIR FILTRO
  const channels = await dbClient.user.findUnique({
    where: {
      id: userId,
      deletedAt: null,
    },
    select: {
      subcriptions: true,
    },
  });

  const channelsIds = channels?.subcriptions.map((channel) => channel.id);

  const broadcasts = await dbClient.broadcast.findMany({
    where: {
      channelId: {
        in: channelsIds,
      },
      AND: [
        {
          logs: {
            every: {
              status: "LIVE",
            },
          },
        },
      ],
    },
    select: {
      logs: true,
      channel: true,
    },
  });

  return broadcasts;
}