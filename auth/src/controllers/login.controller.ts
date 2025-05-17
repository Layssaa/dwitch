import { FastifyReply, FastifyRequest } from "fastify";
import { handlerError } from "../error/handler";
import { SuccessCodes } from "../error/codes";
import { loginUserValidator } from "../validators/login.validator";
import { loginUserService } from "../services/login.service";
import { trace, context } from "@opentelemetry/api";
import { handleSendPayload } from "../lib/telemetry/payload";

export async function loginUserController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const span = trace.getSpan(context.active());

  try {
    const data = loginUserValidator.parse(req.body);

    const { token } = await loginUserService(data);

    const response = {
      message: "User authenticated successfully",
      authToken: token,
    };

    handleSendPayload({ span, payload: response });

    return rep.status(SuccessCodes.SUCCESS).send(response);
  } catch (error) {
    console.error(error);
    const errorHandled = handlerError(error as Error, "ErrorAuthenticateUser");
    handleSendPayload({ span, payload: errorHandled });
    return rep.status(errorHandled.statusCode).send(errorHandled);
  }
}
