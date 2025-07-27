import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { UnauthorizedError } from "@dwitch/errors";
import { finishedBroadcastValidator } from "../validators/create.validator";
import { finishedBroadcastService } from "../services/finished.service";

export async function finishedBroadcastController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const userdId = req.user?.userId;
    const body = finishedBroadcastValidator.parse(req.body);

    if (!userdId) {
      throw new UnauthorizedError("Not allowed");
    }

    const response = await finishedBroadcastService({
      channelId: body.channelId,
      userIdAuth: userdId,
    });

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.CREATED).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToCreateBroadcast");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
