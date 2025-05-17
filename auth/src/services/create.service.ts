import { BadRequestError } from "../error";
import { crypto } from "../lib/crypto";
import { checkPassword } from "../lib/crypto/validate";
import { createUserRepository, findUserRepository } from "../repositories";
import { ICreateUserValidator } from "../validators/create.validator";

export async function createUserService(userData: ICreateUserValidator) {
  const { email, name, password, repeatPassword } = userData;

  const alreadyExists = await findUserRepository({ email });

  if (alreadyExists) {
    throw new BadRequestError("Email already is used");
  }

  if (!checkPassword({ password, repeatPassword })) {
    throw new BadRequestError("Password does not match");
  }

  const hashPassword = await crypto.generateHashPassword({ password });

  await createUserRepository({
    email,
    name,
    password: hashPassword,
  });
}
