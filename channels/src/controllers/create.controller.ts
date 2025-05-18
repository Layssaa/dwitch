import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { createChannelValidator } from "../validators/create.validator";
import { UnauthorizedError } from "@dwitch/errors";
import { createChannelService } from "../services/create.service";

export async function createChannelController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const userdId = req.user?.userId;
    if (!userdId) {
      throw new UnauthorizedError("Not allowed");
    }
    const data = createChannelValidator.parse(req.body);

    await createChannelService({
      ...data,
      userId: userdId,
    });

    const response = {
      message: "Channel created successfully",
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.CREATED).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToCreateChannel");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
