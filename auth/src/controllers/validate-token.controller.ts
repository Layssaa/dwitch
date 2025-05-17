import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { validateTokenService } from "../services/validate-token.service";
import { UnauthorizedError } from "../error";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";

export async function validateTokenController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Token not found");
    }

    await validateTokenService({ token });

    const response = {
      message: "User authenticated successfully",
    };

    handleSendPayload({ span, payload: response });
    return rep.status(SuccessCodes.SUCCESS).send(response);
  } catch (error) {
    console.error(error);

    const errorHandled = handlerError(error as Error, "ErrorValidateToken");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
