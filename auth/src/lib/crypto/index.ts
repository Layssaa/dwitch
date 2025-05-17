import bcrypt from "bcrypt";
import { IGeneratePasswordCripto, IValidatePassword } from "./types";

const saltRounds = Number(process.env.saltRounds) ?? 12;

async function generateHashPassword(data: IGeneratePasswordCripto) {
  const { password } = data;

  return await bcrypt.hash(password, saltRounds);
}

async function validatePassword({ hash, password }: IValidatePassword) {
  return await bcrypt.compare(password, hash);
}

export const crypto = {
  generateHashPassword,
  validatePassword,
};
