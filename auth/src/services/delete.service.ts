import { NotFoundError } from "../error";
import { deleteUserRepository, findUserRepositoryById } from "../repositories";
import { IDeleteUserValidator } from "../validators/delete.validator";

export async function deleteUserService(userData: IDeleteUserValidator) {
  const { userId } = userData;

  const userFound = await findUserRepositoryById({ id: userId });

  if (!userFound) {
    throw new NotFoundError("User Not Found");
  }

  await deleteUserRepository({
    id: userId,
  });
}
