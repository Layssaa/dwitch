FROM node:20-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY ./auth/dist ./dist
COPY ./auth/package.json ./

COPY ./packages ./packages  
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./
RUN cd ./packages/db-lib

RUN pnpm install

#RUN cd ..
RUN cd ./packages/errors
RUN pnpm install

#RUN cd ..
#RUN cd ..

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

ENV PORT=5001
ENV JWT_SECRET_KEY="d4f501c096eef7a3ff708604d8f4405ac1b080af2dd8e94cc41aec4933136221"
ENV NODE_ENV = 'dev'
ENV CLIENT_URL="http://localhost:3000"
ENV API_CHANNEL_URL="http://localhost:5002"
ENV API_USER_URL="http://localhost:5001"
ENV API_BROADCAST_URL="http://localhost:5003"
ENV DATABASE_URL='postgresql://postgres:2010@localhost:5432/dwitch'

EXPOSE 5001


CMD ["node", "dist/index.js"]
