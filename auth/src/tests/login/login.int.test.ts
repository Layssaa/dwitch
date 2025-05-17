import { FastifyInstance } from "fastify";
import { buildTestApp } from "../setup/app";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { ErrorCodes } from "../../error/codes";

let app: null | FastifyInstance = null;

beforeAll(async () => {
  app = buildTestApp();
  await app.ready();
});

afterAll(async () => {
  await app?.close();
});

describe("Login Integration", () => {
  test("should login with valid credentials", async () => {
    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "adminteste@gmail.com",
        password: "12345678",
      },
    });

    expect(response?.statusCode).toBe(200);

    const body = response?.body ? JSON.parse(response.body) : {};
    expect(body).toHaveProperty("authToken");
  });

  test("should error login with invalid credentials", async () => {
    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "adminteste@gmail.com",
        password: "123456789",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.BAD_REQUEST);
  });

  test("should error login with invalid email", async () => {
    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "naoexiste@gmail.com",
        password: "123456789",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.NOT_FOUND);
  });

  test("should error when try to login with a deleted account", async () => {
    const response = await app?.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "deletedUser@gmail.com",
        password: "123456789",
      },
    });

    expect(response?.statusCode).toBe(ErrorCodes.NOT_FOUND);
  });
});
