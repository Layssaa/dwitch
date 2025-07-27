import { channelsApi } from './axios';
import type { ILiveBroadcast } from './types';

channelsApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function getAllChannels () {
  const response = await channelsApi.get('/channels');
  return response.data.channels;
}

interface ICreateChannel {
  name: string;
  about: string;
}
async function createChannel (data: ICreateChannel) {
  const response = await channelsApi.post('/channels/protected/create', data);
  return response.data.channels;
}

async function getLiveChannels (): Promise<ILiveBroadcast[]> {
  const response = await channelsApi.get('/channels/protected/live-channels');
  return response.data.liveBroadcasts;
}

async function subscriberInChannel (data: {
  channelId: string | number;
}): Promise<unknown> {
  const response = await channelsApi.post(
    '/channels/protected/subscribe',
    data
  );
  return response.data.liveBroadcasts;
}

export { getAllChannels, createChannel, getLiveChannels, subscriberInChannel };
