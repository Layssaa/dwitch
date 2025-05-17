import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Aquece com 10 usuários
    { duration: "30s", target: 100 }, // Sobe para 100
    // { duration: "40s", target: 500 }, // Sobe para 500
    { duration: "1m", target: 200 }, // Sustenta 200 usuários por 1 minuto
    { duration: "10s", target: 0 }, // Resfriamento
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% das requisições devem responder em até 200ms
    // http_req_failed: ["rate<0.01"], // Máximo de 1% de falhas
  },
};

const BASE_URL = __ENV.BASE_URL ?? "http://localhost:3000";

const VALID_TOKEN = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyMzIwQGdtYWlsLmNvbSIsInVzZXJJZCI6IjkyN2M2MDk3LTVhN2ItNDU2Yy1hZWE5LThkMGU2NmY1NTNlNSIsImlhdCI6MTc0NzUwNjc2OSwiZXhwIjoxNzQ3NTkzMTY5fQ.N0X4O5E2XuMuhfqgiIu4a9zh7O64VGKAtFwkaOM3o0w",
  statusCode: 200,
};
const INVALID_TOKEN = {
  token:
    "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyMzIwQGdtYWlsLmNvbSIsInVzZXJJZCI6IjkyN2M2MDk3LTVhN2ItNDU2Yy1hZWE5LThkMGU2NmY1NTNlNSIsImlhdCI6MTc0NzUwNjc2OSwiZXhwIjoxNzQ3NTkzMTY5fQ.N0X4O5E2XuMuhfqgiIu4a9zh7O64VGKAtFwkaOM3o0w",
  statusCode: 401,
};
const NO_TOKEN = {
  token: null,
  statusCode: 401,
};

const TOKENS = [VALID_TOKEN, INVALID_TOKEN, NO_TOKEN];

export default function () {
  const randomToken = TOKENS[Math.floor(Math.random() * TOKENS.length)];
  const headers = randomToken.token
    ? { Authorization: `Bearer ${randomToken.token}` }
    : undefined;

  const res = http.get(`${BASE_URL}/auth/validate-token`, {
    headers,
  });

  check(res, {
    statusResponse: (r) => r.status === randomToken.statusCode,
  });

  sleep(1);
}
