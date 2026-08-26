FROM node:22.17.0-slim AS dependencies

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY native_agent_sdk/package.json ./native_agent_sdk/package.json
COPY hotel_shoreline/package.json ./hotel_shoreline/package.json

RUN pnpm install --frozen-lockfile

FROM dependencies AS build

COPY tsconfig.base.json ./tsconfig.base.json
COPY native_agent_sdk ./native_agent_sdk
COPY hotel_shoreline ./hotel_shoreline

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:22.17.0-slim AS runtime

WORKDIR /app

ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

RUN groupadd --system --gid 1001 nodejs \
	&& useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/hotel_shoreline/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/hotel_shoreline/.next/static ./hotel_shoreline/.next/static

USER nextjs
EXPOSE 8080

CMD ["node", "hotel_shoreline/server.js"]
