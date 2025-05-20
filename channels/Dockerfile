FROM node:20-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY ./auth/dist ./dist
COPY ./auth/package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./
COPY ./packages ./packages  
RUN pnpm install --prod

# COPY channels/dist ./dist
# COPY channels/package.json ./

# COPY pnpm-lock.yaml .
# COPY pnpm-workspace.yaml .

# COPY package.json  .

# RUN corepack enable && corepack prepare pnpm@latest --activate

# RUN pnpm install --prod

# EXPOSE 5002

CMD ["node", "dist/index.js"]
