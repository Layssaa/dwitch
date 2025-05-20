FROM node:20-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY ./auth/dist ./dist
COPY ./auth/package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./
COPY ./packages ./packages  

RUN pnpm install --prod

#RUN npm install --omit=dev
# COPY broadcast/dist ./dist
# COPY broadcast/package.json ./

# COPY pnpm-lock.yaml .
# COPY pnpm-workspace.yaml .

# COPY package.json  .

# # RUN corepack enable && corepack prepare pnpm@latest --activate
# COPY ./packages ./packages

# RUN pnpm install --prod

# EXPOSE 5001

CMD ["node", "dist/index.js"]
