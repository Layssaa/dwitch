import { ZodError } from "zod";
import { BadRequestError, NotFoundError, UnauthorizedError } from ".";
import { ErrorCodes } from "./codes";
import { JsonWebTokenError } from "jsonwebtoken";

interface IErrorReply {
  statusCode: number;
  message: string;
  status: string;
}

export function handlerError(error: Error, errorPath: string): IErrorReply {
  if (error instanceof ZodError) {
    return {
      message: error.message,
      statusCode: ErrorCodes.BAD_REQUEST,
      status: errorPath,
    };
  }

  if (error instanceof JsonWebTokenError) {
    return {
      message: "Invalid Token",
      statusCode: ErrorCodes.UNAUTHORIZED,
      status: errorPath,
    };
  }

  if (error instanceof BadRequestError) {
    return {
      message: error.message,
      statusCode: ErrorCodes.BAD_REQUEST,
      status: errorPath,
    };
  }
  if (error instanceof NotFoundError) {
    return {
      message: error.message,
      statusCode: ErrorCodes.NOT_FOUND,
      status: errorPath,
    };
  }
  if (error instanceof UnauthorizedError) {
    return {
      message: error.message,
      statusCode: ErrorCodes.UNAUTHORIZED,
      status: errorPath,
    };
  }

  return {
    message: "Interval Server Error",
    statusCode: ErrorCodes.SERVER_ERROR,
    status: errorPath,
  };
}
