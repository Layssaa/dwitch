import Fastify, { FastifyInstance } from "fastify";
import { authRouters } from "../../routers";
import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import * as loginService from "../../services/login.service";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../error";
import { ErrorCodes, SuccessCodes } from "../../error/codes";

jest.mock("../../services/login.service");

let app: null | FastifyInstance = null;

beforeAll(async () => {
  app = Fastify();
  app.register(authRouters);
  await app.ready();
});

afterAll(async () => {
  await app?.close();
});

describe("Login Controller", () => {
  test("SUCCESS", async () => {
    jest.spyOn(loginService, "loginUserService").mockResolvedValue({
      token: "token",
    });

    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "adminteste@gmail.com",
        password: "12345678",
      },
    });

    expect(response?.statusCode).toBe(SuccessCodes.SUCCESS);

    const body = response?.body ? JSON.parse(response.body) : {};
    expect(body).toHaveProperty("authToken");
  });

  test("VALIDATE DATA ERROR", async () => {
    jest.spyOn(loginService, "loginUserService");

    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "admin",
        password: "wrongpassword",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.BAD_REQUEST);
  });

  test("NOT FOUND", async () => {
    jest
      .spyOn(loginService, "loginUserService")
      .mockRejectedValue(new NotFoundError("User Not Found"));

    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "adminwrong@gmail.com",
        password: "12345678",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.NOT_FOUND);
  });

  test("BAD REQUEST", async () => {
    jest
      .spyOn(loginService, "loginUserService")
      .mockRejectedValue(new BadRequestError("Invalid data"));

    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "adminteste@gmail.com",
        password: "wrongpassword",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.BAD_REQUEST);
  });

  test("UNAUTHORIZED", async () => {
    jest
      .spyOn(loginService, "loginUserService")
      .mockRejectedValue(new UnauthorizedError("Invalid data"));

    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "adminteste@gmail.com",
        password: "wrongpassword",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.UNAUTHORIZED);
  });
});
