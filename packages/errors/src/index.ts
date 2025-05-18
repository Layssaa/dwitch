import { ErrorCodes } from "./codes";
export * from "./codes";
export * from "./handler";

class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: ErrorCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, ErrorCodes.BAD_REQUEST);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, ErrorCodes.NOT_FOUND);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, ErrorCodes.UNAUTHORIZED);
  }
}

export { handlerError } from "./handler";
export { ErrorCodes, SuccessCodes } from "./codes";
