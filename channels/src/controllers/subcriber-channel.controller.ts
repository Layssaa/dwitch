import { FastifyReply, FastifyRequest } from "fastify";
import { subscribeValidator } from "../validators/subcribe.validator";
import { subscriberService } from "../services/subscriber.service";
import { handlerError, SuccessCodes, UnauthorizedError } from "@dwitch/errors";

export async function subscriberController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const userId = req.user?.userId;
    const data = subscribeValidator.parse(req.body);

    if (!userId) {
      throw new UnauthorizedError("Invalid user");
    }

    await subscriberService({
      channelId: data.channelId,
      userIdAuth: userId,
    });

    return rep.status(SuccessCodes.SUCCESS).send({
      message: "Subscribed to the channel!",
    });
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToSubscribeUser");
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
