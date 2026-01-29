import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { validateTokenService } from "../services/validate-token.service";
import { UnauthorizedError } from "../error";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";

export async function validateTokenController(token: string) {
  const span = trace.getSpan(context.active());
  try {
    if (!token) {
      throw new UnauthorizedError("Token not found");
    }

    const { userId } = await validateTokenService({ token });

    const response = {
      message: "User authenticated successfully",
      userId,
    };

    handleSendPayload({ span, payload: response });
    return response;
  } catch (error) {
    console.error(error);

    const errorHandled = handlerError(error as Error, "ErrorValidateToken");
    handleSendPayload({ span, payload: errorHandled });
    return {
      message: errorHandled.message,
      userId: null,
    };
  }
}
