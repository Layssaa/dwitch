import { NotFoundError } from "../error";
import { findUserRepositoryById } from "../repositories";

export async function getUserService(userData: { userId: string }) {
  const { userId } = userData;

  const userFound = await findUserRepositoryById({ id: userId });

  if (!userFound) {
    throw new NotFoundError("User Not Found");
  }

  return userFound
}
