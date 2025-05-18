import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { getUserService } from "../services/get-user.service";
import { UnauthorizedError } from "../error";

export async function getUserController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError("Invalid user");
    }

    const user = await getUserService({
      userId,
    });

    const response = {
      message: "Get user successfully",
      user,
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.SUCCESS).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToGetUser");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
