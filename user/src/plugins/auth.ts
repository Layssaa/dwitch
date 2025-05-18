import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import { handlerError } from "../error/handler";
import { UnauthorizedError } from "../error";

async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new UnauthorizedError("Token not found");
  }

  const token = authHeader.split(" ")[1];

  try {
    const response = await axios.get(
      `${process.env.API_AUTH_URL}/auth/validate-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    request.user = { userId: response.data.userId };
  } catch (error) {
    const errorHandled = handlerError(error as Error, "ErrorValidateToken");
    return reply.status(errorHandled.statusCode).send(errorHandled);
  }
}

export default verifyAuth;
