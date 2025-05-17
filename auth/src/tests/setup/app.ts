import Fastify from 'fastify';
import { authRouters } from '../../routers';

export function buildTestApp() {
  const app = Fastify();
  app.register(authRouters);
  return app;
}
