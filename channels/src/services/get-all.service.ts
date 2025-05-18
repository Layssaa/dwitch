import { getAllChannelsRepository } from "../repositories";

export async function getAllChannelsService() {
  return await getAllChannelsRepository();
}
