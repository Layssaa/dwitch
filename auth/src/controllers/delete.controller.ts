import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { deleteUserValidator } from "../validators/delete.validator";
import { deleteUserService } from "../services/delete.service";

/**
 * @deprecated migra pra outra api
 */
export async function deleteUserController(req: FastifyRequest, rep: FastifyReply) {
  try {
    const data = deleteUserValidator.parse(req.body);

    await deleteUserService(data)

    return rep.status(SuccessCodes.CREATED).send({
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToCreateUser")
    return rep.status(errorHandled.statusCode).send(errorHandled)
  }
}
