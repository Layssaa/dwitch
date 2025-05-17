import jwt from "jsonwebtoken";
import { IAuthCodeGenerate, IAuthVerify } from "./types";

function codeGenerate({ email, userId, expiresIn = "24h" }: IAuthCodeGenerate) {
  const SECRET = process.env.JWT_SECRET_KEY ?? "";

  return jwt.sign({ email, userId }, SECRET, { expiresIn });
}

function verify({ token }: IAuthVerify) {
  const SECRET = process.env.JWT_SECRET_KEY ?? "";

  return jwt.verify(token, SECRET);
}

export const authToken = { codeGenerate, verify };
