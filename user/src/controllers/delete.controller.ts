import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { deleteUserValidator } from "../validators/delete.validator";
import { deleteUserService } from "../services/delete.service";
import { UnauthorizedError } from "../error";

export async function deleteUserController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const userId = req.user?.userId;
    const data = deleteUserValidator.parse(req.params);

    if (!userId) {
      throw new UnauthorizedError("Invalid user");
    }

    await deleteUserService({
      userId: data.userId,
      userIdAuth: userId,
    });

    return rep.status(SuccessCodes.SUCCESS).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToDeleteUser");
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
