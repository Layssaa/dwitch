import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { UnauthorizedError } from "@dwitch/errors";
import { updateChannelValidator } from "../validators/update.validator";
import { updateChannelService } from "../services/update.service";

export async function updateChannelController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const userdId = req.user?.userId;
    
    if (!userdId) {
      throw new UnauthorizedError("Not allowed");
    }
    const data = updateChannelValidator.parse(req.body);

    await updateChannelService({
      ...data,
      userId: userdId,
    });

    const response = {
      message: "Channel updated successfully",
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.CREATED).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToUpdateChannel");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
