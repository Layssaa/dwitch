import { FastifyReply, FastifyRequest } from "fastify";
import { createUserValidator } from "../validators/create.validator";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { createUserService } from "../services/create.service";
import { context, trace } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";

export async function createUserController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const data = createUserValidator.parse(req.body);

    await createUserService(data);

    const response = {
      message: "User created successfully",
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.CREATED).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorToCreateUser");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
