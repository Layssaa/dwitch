# Stage 1: build + gerar Prisma
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY packages/db-lib/package.json ./packages/db-lib/
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Stage 2: produção só com arquivos necessários
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

CMD ["node", "dist/main.js"]
