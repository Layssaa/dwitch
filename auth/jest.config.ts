export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup/env.ts"],
  globalSetup: "<rootDir>/src/tests/setup/db.ts",
  globalTeardown: "<rootDir>/src/tests/setup/db.ts",
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/*.int.test.ts", "**/*.test.ts"],
};
