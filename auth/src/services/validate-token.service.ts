import { UnauthorizedError } from "../error";
import { authToken } from "../lib/auth";

export async function validateTokenService(data: { token: string }) {
  const { token } = data;

  const authDecoded = authToken.verify({ token });

  if (!authDecoded) {
    throw new UnauthorizedError("Token Invalid");
  }

  return;
}
