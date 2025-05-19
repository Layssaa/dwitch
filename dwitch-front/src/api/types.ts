interface IChannels {
  id: string;
  name: string;
  about: string;
  owner_id: string;
  subscribers: string[];
}

enum BroadcastLogsStatus {
  LIVE,
  COMPLETED,
  FAILED,
  INACTIVE
}

interface IBroadcast {
  id: string;
  status: BroadcastLogsStatus;
  channel: IChannels[];
}

export {
  type IChannels,
  type IBroadcast,
}
