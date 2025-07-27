import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";
import { getLiveChannelsService } from "../services/get-live-channels.service";
import { UnauthorizedError } from "@dwitch/errors";

export async function getLiveChannelsController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const userId= req.user?.userId;

    if(!userId){
      throw new UnauthorizedError("Not allowed");
    }

    const liveBroadcasts = await getLiveChannelsService({ userId });

    const response = {
      liveBroadcasts: liveBroadcasts,
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.SUCCESS).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToGetAllChannel");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
