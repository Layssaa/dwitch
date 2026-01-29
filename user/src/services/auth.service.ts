import { UnauthorizedError } from "@dwitch/errors";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync("../proto/auth.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const auth = protoDescriptor.auth;

export const stub = new auth.AuthService(
  process.env.GRPC_AUTH_URL ?? "127.0.0.1:50051",
  grpc.credentials.createInsecure(),
);

export function authService(token: string) {
  let authResponse: any;
  stub.validateAuthToken(
    {
      token,
    },
    (error: any, response: any) => {
      if (error) {
        throw new UnauthorizedError("INVALID_TOKEN");
      } else {
        authResponse = response;
      }
    },
  );
  return authResponse;
}
