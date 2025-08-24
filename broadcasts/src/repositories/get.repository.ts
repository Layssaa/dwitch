import { dbClient } from "../database";

interface IFindChannelById {
  id: string;
}
export function findChannelByIdRepository({ id }: IFindChannelById) {
  return dbClient.channel.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });
}

export function findBroadcastByIdRepository({ id }: { id: string }) {
  return dbClient.broadcast.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      channel: {
        select: {
          owner_id: true,
        },
      },
    },
  });
}

export async function checkLiveBroadcastRepository({
  channelId,
}: {
  channelId: string;
}) {
  return dbClient.channel.findUnique({
    where: {
      id: channelId,
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
}
