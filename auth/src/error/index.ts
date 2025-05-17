import { ErrorCodes } from "./codes";

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
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
