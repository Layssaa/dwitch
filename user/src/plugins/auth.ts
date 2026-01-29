import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { UnauthorizedError } from "../error";
import { authService } from "../services/auth.service";

async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new UnauthorizedError("Token not found");
  }

  const token = authHeader.split(" ")[1];

  try {
    const response = await authService(token);

    request.user = { userId: response.data.userId };
  } catch (error) {
    const errorHandled = handlerError(error as Error, "ErrorValidateToken");
    return reply.status(errorHandled.statusCode).send(errorHandled);
  }
}

export default verifyAuth;
