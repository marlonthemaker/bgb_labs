FROM node:22-slim AS build

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY native_agent_sdk ./native_agent_sdk
COPY hotel_shoreline ./hotel_shoreline

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:22-slim AS runtime

WORKDIR /app
RUN corepack enable

COPY --from=build /app ./

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "pnpm --filter @bomgoodbueno/hotel-shoreline start -- -H 0.0.0.0 -p ${PORT}"]
