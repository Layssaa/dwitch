import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: "channel-api",
  traceExporter: new OTLPTraceExporter({
    url: process.env.URL_OTEL_COLLECTOR ?? "http://localhost:4317",
  }),
  instrumentations: [new HttpInstrumentation()],
});

process.on("beforeExit", async () => {
  await sdk.shutdown();
});

export const initalizeTracing = async () => {
  try {
    await sdk.start();
  } catch (err) {
    console.log("Error: Initialize Tracing");
    console.error(err);
    process.exit(1);
  }
};
