import { Span } from "@opentelemetry/api";

interface IHandleErrorPayload {
  span?: Span;
  payload: any;
  attributeIdentify?: string;
}
export function handleSendPayload({
  span,
  attributeIdentify = "http.response_payload",
  payload,
}: IHandleErrorPayload) {
  return span?.setAttribute(attributeIdentify, JSON.stringify(payload));
}
