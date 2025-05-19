import { channelsApi } from './axios';

channelsApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

async function getAllChannels (){
  const response = await channelsApi.get('/channels');
  return response.data.channels
}

interface ICreateChannel {
  name: string,
  about: string
}
async function createChannel (data: ICreateChannel){
  const response = await channelsApi.post('/channels/create', data);
  return response.data.channels
}

export {
  getAllChannels,
  createChannel,
}
