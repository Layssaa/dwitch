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

export async function getAllChannelsRepository({
  userId,
}: {
  userId?: string;
}) {
  const removeUserChannel = userId ? { 
     AND: {
        NOT: { owner_id: userId },
      }
   } : {};
  return dbClient.channel.findMany({
    where: {
      deletedAt: null,
      ...removeUserChannel
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

  const liveChannels = await dbClient.channel.findMany({
    where: {
      id: {
        in: channelsIds,
      },
      AND: {
        broadcasts: {
          some: {
            logs: {
              some: {
                status: "LIVE",
              },
            },
          },
          none: {
            logs: {
              some: {
                status: "COMPLETED",
              },
            },
          },
        },
      },
    },
    include: {
      broadcasts: {
        include: {
          logs: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  // console.log('broadcasts', broadcasts);
  console.log("CHANNELS", liveChannels);
  console.log("CHANNELS: LOGS");
  liveChannels.forEach((channel) =>
    channel.broadcasts.flat().map((broadcast) => {
      console.log("broadcast logs", broadcast.logs, broadcast.logs.flat());
    })
  );

  return liveChannels;
}
