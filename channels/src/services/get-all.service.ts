import { getAllChannelsRepository } from "../repositories";

export async function getAllChannelsService({ userId }: { userId?: string }) {
  return await getAllChannelsRepository({ userId });
}
