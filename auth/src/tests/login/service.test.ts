import Fastify, { FastifyInstance } from "fastify";
import { authRouters } from "../../routers";
import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";
import { loginUserService } from "../../services/login.service";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../error";
import { ErrorCodes } from "../../error/codes";
import * as repositories from "../../repositories";
import { crypto } from "../../lib/crypto";

jest.mock("../../repositories");

let app: null | FastifyInstance = null;

beforeAll(async () => {
  app = Fastify();
  app.register(authRouters);
  await app.ready();
});

afterAll(async () => {
  await app?.close();
});

const mockUser = async () => ({
  id: "1",
  name: "admin",
  email: "adminteste@gmail.com",
  password: await crypto.generateHashPassword({ password: "12345678" }),
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe("Login Service", () => {
  test("SUCCESS", async () => {
    const userData = await mockUser();
    jest.spyOn(repositories, "findUserRepository").mockResolvedValue(userData);

    const response = await loginUserService({
      email: "adminteste@gmail.com",
      password: "12345678",
    });

    expect(response.token).toBeDefined();
  });

  test("INVALID PASSWORD", async () => {
    const userData = await mockUser();
    jest.spyOn(repositories, "findUserRepository").mockResolvedValue(userData);

    expect(
      loginUserService({
        email: "adminteste@gmail.com",
        password: "wrongPassword",
      })
    ).rejects.toThrow("Invalid Data");
  });

  test("NOT FOUND", async () => {
    jest.spyOn(repositories, "findUserRepository").mockResolvedValue(null);

    expect(
      loginUserService({
        email: "",
        password: "",
      })
    ).rejects.toThrow("User Not Found");
  });
});
