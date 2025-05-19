import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { UnauthorizedError } from "../error";
import { getUserChannelService } from "../services/user-channel.service";

export async function getUserChannelController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError("Not allowed");
    }

    const channel = await getUserChannelService({
      userId: userId,
    });
    
    const response = {
      channel,
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.SUCCESS).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToGetUserChannel");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
