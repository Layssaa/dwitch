import { BadRequestError, NotFoundError } from "../error";
import { authToken } from "../lib/auth";
import { crypto } from "../lib/crypto";
import { findUserRepository } from "../repositories";
import { ILoginUserValidator } from "../validators/login.validator";

export async function loginUserService(userData: ILoginUserValidator) {
  const { email, password } = userData;

  const userFound = await findUserRepository({ email });

  if (!userFound) {
    throw new NotFoundError("User Not Found");
  }

  const verifyPassword = await crypto.validatePassword({
    password,
    hash: userFound.password,
  });

  if (!verifyPassword) {
    throw new BadRequestError("Invalid data");
  }

  const token = authToken.codeGenerate({ email: userFound.email, userId: userFound.id });

  return { token };
}
