import { NotFoundError, UnauthorizedError } from "../error";
import { deleteUserRepository, findUserRepositoryById } from "../repositories";
import { IDeleteUserValidator } from "../validators/delete.validator";

export async function deleteUserService(userData: IDeleteUserValidator & { userIdAuth: string }) {
  const { userId, userIdAuth } = userData;
  
  if (userId != userIdAuth) {
    throw new UnauthorizedError("Not allowed");
  }

  const userFound = await findUserRepositoryById({ id: userId });

  if (!userFound) {
    throw new NotFoundError("User Not Found");
  }

  await deleteUserRepository({
    id: userId,
  });
}
