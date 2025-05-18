import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import {
  deleteChannelService,
} from "../services/delete.service";
import { UnauthorizedError } from "../error";
import { deleteChannelValidator } from "../validators/delete.validator";

export async function deleteChannelController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const userId = req.user?.userId;
    const data = deleteChannelValidator.parse(req.params);

    if (!userId) {
      throw new UnauthorizedError("Not allowed");
    }

    await deleteChannelService({
      userId: userId,
      channelId: data.channelId,
    });

    return rep.status(SuccessCodes.SUCCESS).send({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToDeleteChannel");
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
