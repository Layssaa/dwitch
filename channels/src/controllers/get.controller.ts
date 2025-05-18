import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { UnauthorizedError } from "../error";
import { getChannelService } from "../services/get.service";
import { getAllChannelsController } from "./get-all.controller";
import { getChannelValidator } from "../validators/get.validator";

export async function getChannelController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const data = getChannelValidator.parse(req.params);

    const channel = await getChannelService({
      channelId: data.channelId,
    });
    
    const response = {
      channel,
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.SUCCESS).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToGetChannel");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
