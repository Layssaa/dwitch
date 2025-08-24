interface IChannels {
  id: string;
  name: string;
  about: string;
  owner_id: string;
  subscribers: string[];
}

export interface IMyChannel extends IChannels {
  broadcasts: ILog[]
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

export { type IChannels, type IBroadcast };


export interface ILog {
  id: string;
  createdAt: Date;
  status: string;
  broadcastId: string;
}

export interface ILiveBroadcast {
  logs: ILog[];
  channel: IChannels;
}

export interface ILiveBroadcasts{
  liveBroadcasts: ILiveBroadcast[]
}

export interface ILiveBroadcastV2 extends IChannels{
  broadcasts: ILog[];
}
